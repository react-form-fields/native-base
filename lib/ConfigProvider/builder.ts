import CoreConfigBuilder from '@react-form-fields/core/ConfigProvider/builder';
import { NativeBase } from 'native-base';

import { IConfig } from './context';

export default class ConfigBuilder extends CoreConfigBuilder {
  public setDateConfig(
    locale: any,
    pickerLocale: string,
    formats: IConfig['date']['formats'],
    labels: IConfig['date']['labels']
  ) {
    this.config = {
      ...this.config,
      date: { dataFnsLocale: locale, pickerLocale, formats, labels }
    };

    return this;
  }

  public setValidationOn(event: IConfig['validationOn']) {
    this.config = { ...this.config, validationOn: event };
    return this;
  }

  public setItemProps(itemProps: NativeBase.Item) {
    this.config = { ...this.config, itemProps };
    return this;
  }

  public setLabelProps(labelProps: NativeBase.Label) {
    this.config = { ...this.config, labelProps };
    return this;
  }

  public clean() {
    this.config = {
      ...super.clean(),
      validationOn: 'onSubmit',
      date: {
        dataFnsLocale: null,
        pickerLocale: 'en-US',
        formats: {
          date: 'yyyy-MM-dd',
          time: 'HH:ss',
          datetime: 'yyyy-MM-dd HH:ss'
        },
        labels: {
          ok: 'Ok',
          cancel: 'Cancel'
        }
      }
    };

    return this;
  }
}
