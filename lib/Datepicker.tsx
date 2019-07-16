import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import { Button, Icon } from 'native-base';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

import { dateFormat } from './helpers/dateFormat';
import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import FieldText, { IFieldTextProps, IFieldTextRef } from './Text';

export interface IFieldDatepickerProps
  extends PropsResolver<IFieldTextProps, 'mode' | 'theme'>,
    PropsResolver<DateTimePickerProps, 'onConfirm' | 'onCancel' | 'isVisible' | 'date'>,
    IFlowIndexProp {
  value: Date;
  onChange: (value: Date) => void;
}

const nullCallback = () => {};

const FieldDatepicker = React.memo((props: IFieldDatepickerProps) => {
  const { value, onChange, mode, ...otherProps } = props;

  const [showPicker, setShowPicker] = React.useState(false);
  const fieldTextRef = React.useRef<IFieldTextRef>();
  const datePickerProps = useMemoOtherProps(props, 'value', 'onChange');

  const config = useConfigContext();

  const onFocusFlow = React.useCallback(() => {}, []);
  useFieldFlow(props, onFocusFlow);

  const onTouchEndHandler = React.useCallback(() => setShowPicker(true), [setShowPicker]);
  const clearHandler = React.useCallback(() => onChange(null), [onChange]);

  const onConfirmHandler = React.useCallback(
    (value: Date) => {
      config.validationOn === 'onChange' && fieldTextRef.current.setDirty(true);
      onChange(value);
      setShowPicker(false);
    },
    [onChange, setShowPicker, fieldTextRef, config.validationOn]
  );

  const onCancelHandler = React.useCallback(() => setShowPicker(false), [setShowPicker]);

  return (
    <React.Fragment>
      <View>
        <TouchableOpacity onPress={onTouchEndHandler}>
          <View pointerEvents='none'>
            <FieldText
              {...otherProps}
              ref={fieldTextRef}
              value={value ? value.toISOString() : null}
              displayValue={dateFormat(value, mode || 'date', config)}
              tabIndex={null}
              flowIndex={null}
              onChange={nullCallback}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {!!value && (
          <Button
            icon
            onPress={clearHandler}
            transparent
            dark
            style={[styles.icon, (config.date || { clearButtonStyle: {} }).clearButtonStyle]}
          >
            <Icon name='close' {...((config.date || { clearButtonIconProps: {} }).clearButtonIconProps || {})} />
          </Button>
        )}
      </View>

      <DateTimePicker
        titleIOS={props.label}
        confirmTextIOS={config.date.labels.ok}
        cancelTextIOS={config.date.labels.cancel}
        locale={config.date.pickerLocale}
        {...datePickerProps}
        mode={mode}
        date={value || new Date()}
        isVisible={showPicker}
        onConfirm={onConfirmHandler}
        onCancel={onCancelHandler}
      />
    </React.Fragment>
  );
});

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 8,
    right: -8,
    opacity: 0.6
  }
});

FieldDatepicker.displayName = 'FieldDatepicker';
export default FieldDatepicker;
