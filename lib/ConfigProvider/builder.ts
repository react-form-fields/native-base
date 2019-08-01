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

  public setIconProps(
    iconProps: Partial<NativeBase.Icon>,
    selectIcon?: string,
    selectSearchIcon?: string,
    dateClearIcon?: string
  ) {
    const selectConfig = this.config.select || { icon: '', searchIcon: '' };
    const dateConfig = this.config.date || { clearIcon: '' };

    this.config = {
      ...this.config,
      iconProps,
      select: {
        ...selectConfig,
        icon: selectIcon || selectConfig.icon,
        searchIcon: selectSearchIcon || selectConfig.searchIcon
      } as any,
      date: {
        ...dateConfig,
        clearIcon: dateClearIcon || dateConfig.clearIcon
      } as any
    };
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
