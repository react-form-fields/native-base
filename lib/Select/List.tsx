import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { IFieldSelectOption } from '.';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import { IModalProps } from './Modal';

export interface IListProps extends IModalProps {
  internalValue: Set<any>;
  setInternalValue: Function;
}

const List = React.memo((props: IListProps) => {
  const { multiple, options, internalValue, setInternalValue } = props;
  const firstValue = React.useMemo(() => internalValue.values().next().value, [internalValue]);

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<IFieldSelectOption>) => {
      if (multiple) {
        return (
          <Checkbox
            label={item.label}
            value={internalValue.has(item.value)}
            marginBottom
            onChange={checked => {
              checked ? internalValue.add(item.value) : internalValue.delete(item.value);
              setInternalValue(new Set(internalValue));
            }}
          />
        );
      }

      return (
        <Radio
          label={item.label}
          radioValue={item.value}
          value={firstValue}
          onChange={value => setInternalValue(new Set([value]))}
          marginBottom
        />
      );
    },
    [firstValue, internalValue, multiple, setInternalValue]
  );

  const keyExtractor = React.useCallback((item: IFieldSelectOption) => `${item.label}-${item.value}`, []);

  return <FlatList extraData={internalValue} data={options} keyExtractor={keyExtractor} renderItem={renderItem} />;
});

export default List;
