import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { IFieldSelectOption } from '.';
import SelectContext, { ISelectContext } from './context';
import ListItem from './ListItem';
import { IModalProps } from './Modal';

export interface IListProps extends IModalProps {
  internalValue: Set<any>;
  setInternalValue: Function;
}

const List = React.memo((props: IListProps) => {
  const { multiple, options, internalValue, setInternalValue } = props;

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<IFieldSelectOption>) => <ListItem item={item} />,
    []
  );

  const keyExtractor = React.useCallback((item: IFieldSelectOption) => `${item.label}-${item.value}`, []);

  const contextValue = React.useMemo<ISelectContext>(
    () => ({
      multiple,
      value: internalValue,
      setValue: (value: any, checked: boolean) => {
        if (!multiple) {
          setInternalValue(new Set([value]));
          return;
        }

        checked ? internalValue.add(value) : internalValue.delete(value);
        setInternalValue(new Set(internalValue));
      }
    }),
    [internalValue, multiple, setInternalValue]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <FlatList data={options} keyExtractor={keyExtractor} renderItem={renderItem} />
    </SelectContext.Provider>
  );
});

export default List;
