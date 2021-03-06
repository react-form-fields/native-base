import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';

import useFieldFlow, { IFlowIndexProp } from '../hooks/useFieldFlow';
import ThemeProvider from '../shared/ThemeProvider';
import FieldText, { IFieldTextProps } from '../Text';
import Modal from './Modal';

export interface IFieldSelectProps extends PropsResolver<IFieldTextProps, 'style'>, IFlowIndexProp {
  label?: string;
  value: number | string | number[] | string[];
  onChange: (value: any) => void;
  options: IFieldSelectOption[];
  formatValueDisplay?: (selectedOptions: IFieldSelectOption[]) => string;
  marginBottom?: boolean;
  multiple?: boolean;
  fullscreen?: boolean;
  searchable?: boolean;
}

export interface IFieldSelectOption {
  value: string | number;
  label: string;
}

const nullCallback = () => {};

const FieldSelect = React.memo((props: IFieldSelectProps) => {
  const { label, options, value, onChange, formatValueDisplay, ...otherProps } = props;

  const [visible, setVisibility] = React.useState(false);

  const config = useConfigContext();
  config.select = config.select || ({} as any);

  const { setDirty, showError, errorMessage } = useValidation(props);
  useFieldFlow(props, React.useCallback(() => {}, []));

  const displayValue = React.useMemo(() => {
    const arrayValue = Array.isArray(value) ? value : [value];
    const selectedValues = options.filter(o => arrayValue.includes(o.value));
    if (formatValueDisplay) return formatValueDisplay(selectedValues);
    return selectedValues.length > 3 ? `${selectedValues.length} items` : selectedValues.map(o => o.label).join(', ');
  }, [value, options, formatValueDisplay]);

  const handlePress = React.useCallback(() => {
    setVisibility(true);
  }, []);

  const handleDone = React.useCallback(
    (value: any) => {
      onChange(value);
      config.validationOn === 'onChange' && setDirty(true);
      setVisibility(false);
    },
    [config.validationOn, onChange, setDirty]
  );

  const handleDismiss = React.useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  React.useEffect(() => () => setVisibility(false), []);

  const rightIcon = React.useMemo(() => props.rightIcon || config.select.icon || 'ios-arrow-down', [
    config.select.icon,
    props.rightIcon
  ]);

  const rightIconAction = React.useMemo(() => (props.rightIcon ? props.rightIconAction : null) || handlePress, [
    handlePress,
    props.rightIcon,
    props.rightIconAction
  ]);

  return (
    <ThemeProvider>
      <FieldText
        {...otherProps}
        label={label}
        ref={null}
        value={displayValue}
        validation={null}
        errorMessage={showError ? errorMessage : null}
        onChange={nullCallback}
        flowIndex={null}
        tabIndex={null}
        editable={false}
        rightIcon={rightIcon}
        rightIconAction={rightIconAction}
        _onPress={handlePress}
        _onLabelPress={handlePress}
        _disabled={props.editable === false}
      />

      <Modal {...props} ref={null} visible={visible} handleDismiss={handleDismiss} handleDone={handleDone} />
    </ThemeProvider>
  );
});

export default FieldSelect;
