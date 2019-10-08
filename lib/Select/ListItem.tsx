import * as React from 'react';

import { IFieldSelectOption } from '.';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import SelectContext from './context';

export interface IListItemProps {
  item: IFieldSelectOption;
}

const ListItem = React.memo((props: IListItemProps) => {
  const { item } = props;

  const { value, setValue, multiple } = React.useContext(SelectContext);
  const firstValue = React.useMemo(() => value.values().next().value, [value]);

  const handleChange = React.useCallback(
    (checked?: boolean) => {
      setValue(item.value, multiple ? checked : true);
    },
    [item.value, multiple, setValue]
  );

  if (multiple) {
    return <Checkbox label={item.label} value={value.has(item.value)} extraPadding onChange={handleChange} />;
  }

  return <Radio label={item.label} radioValue={item.value} extraPadding value={firstValue} onChange={handleChange} />;
});

export default ListItem;
