import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import { Text, View } from 'native-base';
import * as React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';

import { IFieldSelectOption } from '.';
import SelectContext, { ISelectContext } from './context';
import ListItem from './ListItem';
import { IModalProps } from './Modal';

export interface IListProps extends IModalProps {
  internalValue: Set<any>;
  setInternalValue: Function;
  renderOptions: boolean;
}

const List = React.memo((props: IListProps) => {
  const { multiple, options, internalValue, setInternalValue } = props;

  const config = useConfigContext();
  config.select = config.select || ({} as any);

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
      <View style={styles.container}>
        <FlatList
          data={props.renderOptions ? options : []}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          maxToRenderPerBatch={2}
          ListEmptyComponent={
            !!props.renderOptions && <Text style={styles.notFound}>{config.select.notFound || 'Not found'}</Text>
          }
        />
      </View>
    </SelectContext.Provider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notFound: {
    textAlign: 'center',
    fontSize: 16,
    padding: 16,
    fontStyle: 'italic',
    opacity: 0.8
  }
});

export default List;
