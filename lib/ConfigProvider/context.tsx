import FieldValidationConfigContextCore from '@react-form-fields/core/ConfigProvider';
import { NativeBase } from 'native-base';
import { TextStyle, ViewStyle } from 'react-native';

export { IConfig } from '@react-form-fields/core/ConfigProvider';

declare module '@react-form-fields/core/ConfigProvider/context' {
  interface IConfig {
    validationOn?: 'onChange' | 'onSubmit';
    itemProps?: NativeBase.Item;
    labelProps?: NativeBase.Label;
    errorStyle?: TextStyle;
    helperTextStyle?: TextStyle;
    selectLabels?: {
      buttonStyle?: ViewStyle;
      buttonIconProps?: NativeBase.Icon;
      done: string;
      cancel: string;
      notFound: string;
    };
    date?: {
      dataFnsLocale: any;
      pickerLocale: string;
      clearButtonStyle?: ViewStyle;
      clearButtonIconProps?: NativeBase.Icon;
      formats: {
        date: string;
        time: string;
        datetime: string;
      };
      labels: {
        ok: string;
        cancel: string;
      };
    };
  }
}

const FieldValidationConfigContext = FieldValidationConfigContextCore;
export default FieldValidationConfigContext;
