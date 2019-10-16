import * as format from 'date-fns/format';

import { IConfig } from '../ConfigProvider/context';

const defaultFormats = {
  date: 'yyyy-MM-dd',
  time: 'HH:mm',
  dateTime: 'yyyy-MM-dd HH:mm'
};

export function dateFormat(value: Date, mode: string, config: IConfig, customFormat?: string): string {
  if (!value || !(value instanceof Date)) return '';
  if (isNaN(value.getTime())) return '';

  const dateConfig = getConfigDate(config);
  const formatString = customFormat || dateConfig.formats[mode] || defaultFormats[mode] || mode;
  return (format as any)(value, formatString, dateConfig.dataFnsLocale ? { locale: dateConfig.dataFnsLocale } : null);
}

function getConfigDate(config: IConfig): IConfig['date'] {
  return {
    ...(config.date || {}),
    formats: (config.date || ({} as any)).formats || {}
  } as any;
}
