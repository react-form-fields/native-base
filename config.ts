import '@react-form-fields/core/config';

import { NativeBase } from 'native-base';

export * from '@react-form-fields/core/config';

declare module '@react-form-fields/core/config' {
  interface IConfig {
    iconType?: NativeBase.Icon['type'];
    date?: {
      locale?: any;
      formats?: {
        date?: string;
        time?: string;
        dateTime?: string;
      }
    }
  }
}