import FieldValidationConfigContextCore from '@react-form-fields/core/ConfigProvider';
import { NativeBase } from 'native-base';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export { IConfig } from '@react-form-fields/core/ConfigProvider';

declare module '@react-form-fields/core/ConfigProvider/context' {
  interface IConfig {
    validationOn?: 'onChange' | 'onSubmit';
    itemProps?: Partial<NativeBase.Item>;
    labelProps?: Partial<NativeBase.Label>;
    iconProps?: Partial<NativeBase.Icon>;
    errorStyle?: TextStyle;
    helperTextStyle?: TextStyle;
    loadingProps?: NativeBase.Spinner;
    loadingStyle?: StyleProp<ViewStyle>;
    select?: {
      icon?: string;
      searchIcon?: string;
      done: string;
      cancel: string;
      notFound: string;
    };
    date?: {
      dataFnsLocale: any;
      pickerLocale: string;
      clearIcon?: string;
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
