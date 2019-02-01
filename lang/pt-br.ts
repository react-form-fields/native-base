import { IConfig } from '@react-form-fields/core/config';
import coreLangPTBR from '@react-form-fields/core/lang/pt-br';
import * as locale from 'date-fns/locale/pt-BR';

const langPTBR: IConfig = {
  ...coreLangPTBR,
  date: {
    locale,
    formats: {
      date: 'dd/MM/yyyy',
      time: 'HH:ss',
      dateTime: 'dd/MM/yyyy HH:ss',
    },
    labels: {
      ok: 'Ok',
      cancel: 'Cancelar',
    }
  }
};

export default langPTBR;