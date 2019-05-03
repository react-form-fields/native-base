import * as coreConfig from '@react-form-fields/core/config';
import { NativeBase } from 'native-base';

declare module '@react-form-fields/core/config' {
  interface IConfig {
    iconType?: NativeBase.Icon['type'];
    validationOn?: 'onChange' | 'onBlur' | 'onSubmit';
    date?: {
      locale?: any;
      formats?: {
        date?: string;
        time?: string;
        dateTime?: string;
      },
      labels?: {
        ok: string;
        cancel: string;
      }
    };
  }
}

const defaultConfig: coreConfig.IConfig = {
  validationOn: 'onSubmit',
  date: {
    formats: {
      date: 'yyyy-MM-dd',
      time: 'HH:ss',
      dateTime: 'yyyy-MM-dd HH:ss',
    },
    labels: {
      ok: 'Ok',
      cancel: 'Cancel',
    }
  }
};

export function getConfig(): coreConfig.IConfig {
  const config = coreConfig.getConfig() || {};
  return {
    ...defaultConfig,
    ...config,
    date: {
      ...defaultConfig.date,
      ...(config.date || {}),
      formats: {
        ...defaultConfig.date.formats,
        ...((config.date || {}).formats || {})
      },
      labels: {
        ...defaultConfig.date.labels,
        ...((config.date || {}).formats || {})
      }
    }

  };
}

export function setConfig(config: coreConfig.IConfig) {
  coreConfig.setConfig(config);
}