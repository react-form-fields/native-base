import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import { NativeBase, Switch } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import ErrorMessage from './shared/ErrorMessage';
import ThemeProvider from './shared/ThemeProvider';

export interface IFieldSwitchProps extends PropsResolver<NativeBase.Switch, 'mask'>, IFlowIndexProp {
  label?: React.ReactNode;
  value?: boolean;
  onChange: (checked: boolean) => void;
  helperText?: string;
  marginBottom?: boolean;
}

const FieldSwitch = React.memo((props: IFieldSwitchProps) => {
  const { onChange, helperText, label, marginBottom, value } = props;

  const config = useConfigContext();
  const { setDirty, showError, errorMessage, isValid } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'checked', 'onChange', 'label', 'styleError', 'marginBottom');
  useFieldFlow(props, React.useCallback(() => {}, []));

  const onChangeHandler = React.useCallback(
    (value: boolean) => {
      config.validationOn === 'onChange' && setDirty(true);
      onChange(value);
    },
    [onChange, setDirty, config.validationOn]
  );

  return (
    <ThemeProvider>
      <View style={marginBottom ? styles.margin : null}>
        <View style={styles.row}>
          <View>{typeof label === 'string' ? <Text style={styles.text}>{label}</Text> : label}</View>
          <Switch {...otherProps} value={value} onValueChange={onChangeHandler} />
        </View>
        <ErrorMessage isValid={isValid} showError={showError} helperText={helperText} errorMessage={errorMessage} />
      </View>
    </ThemeProvider>
  );
});

const styles = StyleSheet.create({
  margin: {
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  text: {
    fontSize: 16
  },
  textContainer: {
    flex: 1
  }
});

FieldSwitch.displayName = 'FieldSwitch';
export default FieldSwitch;
