import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import { NativeBase, Radio } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import ErrorMessage from './shared/ErrorMessage';
import ThemeProvider from './shared/ThemeProvider';
import TouchableEffect from './shared/TouchableEffect';

export interface IFieldRadioProps extends PropsResolver<NativeBase.Radio, 'status' | 'mask'>, IFlowIndexProp {
  label?: React.ReactNode;
  value: string | number;
  radioValue: string | number;
  onChange: (radioValue: any) => void;
  helperText?: string;
  marginBottom?: boolean;
}

const FieldRadio = React.memo((props: IFieldRadioProps) => {
  const { onChange, label, helperText, value, marginBottom, radioValue } = props;

  const config = useConfigContext();
  const { setDirty, showError, errorMessage, isValid } = useValidation(props);
  const otherProps = useMemoOtherProps(props, 'value', 'onChange', 'label', 'styleError', 'marginBottom', 'radioValue');
  useFieldFlow(props, React.useCallback(() => {}, []));

  const onChangeHandler = React.useCallback(() => {
    config.validationOn === 'onChange' && setDirty(true);
    onChange(radioValue);
  }, [onChange, setDirty, radioValue, config.validationOn]);

  return (
    <ThemeProvider>
      <View style={marginBottom ? styles.margin : null}>
        <TouchableEffect onPress={onChangeHandler}>
          <View>
            <View style={styles.row}>
              <View style={styles.radio}>
                <Radio {...otherProps} selected={value === radioValue} onPress={onChangeHandler} />
              </View>
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
  radio: {
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  textContainer: {
    flexGrow: 1,
    paddingLeft: 10
  },
  text: {
    fontSize: 16
  }
});

FieldRadio.displayName = 'FieldRadio';
export default FieldRadio;
