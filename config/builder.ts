import { IConfig } from '@react-form-fields/core/config';
import CoreConfigBuilder from '@react-form-fields/core/config/builder';

export default class ConfigBuilder extends CoreConfigBuilder {
  public setDateConfig(locale: any, formats: IConfig['date']['formats'], labels: IConfig['date']['labels']) {
    this.config = {
      ...this.config,
      date: {
        locale,
        formats,
        labels
      }
    };

    return this;
  }

  public setValidationOn(event: IConfig['validationOn']) {
    this.config = {
      ...this.config,
      validationOn: event
    };
    return this;
  }
}