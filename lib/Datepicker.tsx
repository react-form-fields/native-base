import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

import { dateFormat } from './helpers/dateFormat';
import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import FieldText, { IFieldTextProps, IFieldTextRef } from './Text';

export interface IFieldDatepickerProps
  extends PropsResolver<IFieldTextProps, 'mode' | 'theme'>,
    PropsResolver<DateTimePickerProps, 'onConfirm' | 'onCancel' | 'isVisible' | 'date'>,
    IFlowIndexProp {
  value: Date;
  format?: string;
  onChange: (value: Date) => void;
  notClearable?: boolean;
}

const nullCallback = () => {};

const FieldDatepicker = React.memo((props: IFieldDatepickerProps) => {
  const { value, onChange, mode, format, ...otherProps } = props;

  const [showPicker, setShowPicker] = React.useState(false);

  const fieldTextRef = React.useRef<IFieldTextRef>();
  const datePickerProps = useMemoOtherProps(props, 'value', 'onChange');

  const config = useConfigContext();
  config.date = config.date || ({} as any);

  const onFocusFlow = React.useCallback(() => {}, []);
  useFieldFlow(props, onFocusFlow);

  const handlePress = React.useCallback(() => {
    if (props.editable === false) {
      return;
    }

    setShowPicker(true);
  }, [props.editable]);

  const handleClear = React.useCallback(() => onChange(null), [onChange]);

  const handleConfirm = React.useCallback(
    (value: Date) => {
      config.validationOn === 'onChange' && fieldTextRef.current.setDirty(true);
      onChange(value);
      setShowPicker(false);
    },
    [onChange, setShowPicker, fieldTextRef, config.validationOn]
  );

  const onCancelHandler = React.useCallback(() => setShowPicker(false), [setShowPicker]);
  const rightIcon = React.useMemo(() => {
    if (props.rightIcon) {
      return props.rightIcon;
    }

    if (props.notClearable) {
      return null;
    }

    return config.date.clearIcon || 'md-close';
  }, [config.date.clearIcon, props.notClearable, props.rightIcon]);

  return (
    <React.Fragment>
      <FieldText
        {...otherProps}
        ref={fieldTextRef}
        value={value ? value.toISOString() : null}
        displayValue={dateFormat(value, mode || 'date', config, format)}
        tabIndex={null}
        flowIndex={null}
        onChange={nullCallback}
        editable={false}
        rightIcon={value ? rightIcon : null}
        rightIconAction={props.rightIconAction || handleClear}
        _onLabelPress={handlePress}
        _onPress={handlePress}
        _disabled={props.editable === false}
      />

      <DateTimePicker
        titleIOS={props.label}
        confirmTextIOS={config.date.labels.ok}
        cancelTextIOS={config.date.labels.cancel}
        locale={config.date.pickerLocale}
        {...datePickerProps}
        mode={mode}
        date={value || new Date()}
        isVisible={showPicker}
        onConfirm={handleConfirm}
        onCancel={onCancelHandler}
      />
    </React.Fragment>
  );
});

FieldDatepicker.displayName = 'FieldDatepicker';
export default FieldDatepicker;
