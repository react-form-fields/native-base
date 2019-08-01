import coreLangENUS from '@react-form-fields/core/ConfigProvider/langs/en-us';
import * as locale from 'date-fns/locale/en-US';

import { IConfig } from '../context';

const langENUS: IConfig = {
  ...coreLangENUS,
  select: {
    done: 'Done',
    cancel: 'Cancel',
    notFound: 'Not Found'
  },
  date: {
    dataFnsLocale: locale,
    pickerLocale: 'en-US',
    formats: {
      date: 'MM/dd/yyyy',
      time: 'hh:mm a',
      datetime: 'MM/dd/yyyy hh:mm a'
    },
    labels: {
      ok: 'Ok',
      cancel: 'Cancel'
    }
  }
};

export default langENUS;
