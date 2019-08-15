import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import { CheckBox, NativeBase, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import ErrorMessage from './shared/ErrorMessage';
import ThemeProvider from './shared/ThemeProvider';
import TouchableEffect from './shared/TouchableEffect';

export interface IFieldCheckboxProps extends PropsResolver<NativeBase.CheckBox, 'status' | 'mask'>, IFlowIndexProp {
  label?: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
  marginBottom?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const FieldCheckbox = React.memo((props: IFieldCheckboxProps) => {
  const { onChange, label, helperText, value, marginBottom } = props;

  const config = useConfigContext();
  const { setDirty, showError, errorMessage, isValid } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'label', 'styleError', 'marginBottom');
  useFieldFlow(props, React.useCallback(() => {}, []));

  const onChangeHandler = React.useCallback(() => {
    config.validationOn === 'onChange' && setDirty(true);
    onChange(!value);
  }, [value, onChange, setDirty, config.validationOn]);

  return (
    <ThemeProvider>
      <View style={marginBottom ? styles.margin : null}>
        <TouchableEffect onPress={onChangeHandler} disabled={props.disabled}>
          <View>
            <View style={styles.row}>
              <CheckBox {...otherProps} checked={value} style={styles.checkbox} onPress={onChangeHandler} />
              <View style={styles.textContainer}>
                {typeof label === 'string' ? <Text style={styles.text}>{label}</Text> : label}
              </View>
            </View>
            <ErrorMessage isValid={isValid} showError={showError} helperText={helperText} errorMessage={errorMessage} />
          </View>
        </TouchableEffect>
      </View>
    </ThemeProvider>
  );
});

const styles = StyleSheet.create({
  margin: {
    marginBottom: 20
  },
  checkbox: {
    left: 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8
  },
  textContainer: {
    paddingLeft: 10
  },
  text: {
    fontSize: 16
  }
});

FieldCheckbox.displayName = 'FieldCheckbox';
export default FieldCheckbox;
