import { IConfig } from '@react-form-fields/core/config';
import * as format from 'date-fns/format';

import { getConfig } from '../config';

const defaultFormats = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
  dateTime: 'YYYY-MM-DD HH:mm'
};

export function dateFormat(value: Date, mode: 'date' | 'time' | 'datetime'): string {
  if (!value || !(value instanceof Date)) return '';
  if (isNaN(value.getTime())) return '';

  const config = getConfigDate();
  const formatString = config.formats[mode] || defaultFormats[mode];
  return format(value, formatString, config.locale ? { locale: config.locale } : null);
}

function getConfigDate(): IConfig['date'] {
  return {
    ...(getConfig().date || {}),
    formats: ((getConfig().date || {}).formats || {})
  };
}