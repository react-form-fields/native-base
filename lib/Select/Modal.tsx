import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import { Body, Button, Header, Icon, Input, Item, Text, Title } from 'native-base';
import * as React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal as ReactNativeModal,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';

import { IFieldSelectProps } from '.';
import List from './List';

export interface IModalProps extends IFieldSelectProps {
  visible: boolean;
  handleDone: (value: Array<string | number> | string | number) => void;
  handleDismiss: () => void;
}

const Modal = React.memo((props: IModalProps) => {
  const {
    value,
    visible,
    label,
    searchable,
    options,
    multiple,
    handleDone: handleDoneProp,
    handleDismiss: handleDismissProp
  } = props;

  const config = useConfigContext();

  const [query, setQuery] = React.useState('');
  const [scrollAreaStyle, setScrollAreaStyle] = React.useState<ViewStyle>(styles.scrollArea);
  const [internalValue, setInternalValue] = React.useState<Set<string | number>>(new Set());
  const firstValue = React.useMemo(() => internalValue.values().next().value, [internalValue]);

  React.useEffect(() => {
    if (!visible) return;

    if (multiple && !Array.isArray(value || [])) {
      throw new Error('@react-form-fields/native-base: value of a multiple select must be an array');
    }

    if (!multiple && Array.isArray(value)) {
      throw new Error('@react-form-fields/native-base: value of a non multiple select must be not an array');
    }

    setInternalValue(new Set(multiple ? (value as any) || [] : [value]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const filteredOptions = React.useMemo(() => {
    return !query ? options || [] : (options || []).filter(o => o.label.includes(query));
  }, [options, query]);

  const modalActionStyles = React.useMemo<ViewStyle>(
    () => ({
      ...styles.modalActions
    }),
    []
  );

  React.useEffect(() => {
    const eventShow = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', e => {
      setScrollAreaStyle({
        ...scrollAreaStyle,
        maxHeight: Dimensions.get('screen').height - e.endCoordinates.height - 200
      });
    });

    const eventHide = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
      setScrollAreaStyle({ ...scrollAreaStyle, maxHeight: Dimensions.get('screen').height - 300 });
    });

    return () => {
      eventShow.remove();
      eventHide.remove();
    };
  }, [scrollAreaStyle, setScrollAreaStyle]);

  const handleDone = React.useCallback(() => {
    setQuery('');
    handleDoneProp(multiple ? Array.from(internalValue) : firstValue);
  }, [firstValue, handleDoneProp, internalValue, multiple]);

  const handleDismiss = React.useCallback(() => {
    setQuery('');
    handleDismissProp();
  }, [handleDismissProp]);

  return (
    <ReactNativeModal visible={visible} onRequestClose={handleDismiss} transparent={true}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.keyboardView}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            {searchable ? (
              <Header searchBar rounded style={styles.headerSearch}>
                <Item>
                  <Icon name='ios-search' />
                  <Input placeholder={label} value={query} onChangeText={setQuery} />
                </Item>
              </Header>
            ) : (
              <Header style={styles.headerSearch}>
                <Body style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <Title style={styles.headerSearchTitle}>{label}</Title>
                </Body>
              </Header>
            )}
            <View style={scrollAreaStyle}>
              <ScrollView>
                <View style={styles.scrollView}>
                  <List
                    {...props}
                    ref={null}
                    options={filteredOptions}
                    internalValue={internalValue}
                    setInternalValue={setInternalValue}
                  />
                  {!filteredOptions.length && (
                    <Text style={styles.notFound}>{(config.selectLabels || { notFound: 'Not found' }).notFound}</Text>
                  )}
                </View>
              </ScrollView>
            </View>
            <View style={modalActionStyles}>
              <Button transparent dark onPress={handleDismiss}>
                <Text>{(config.selectLabels || { cancel: 'Cancel' }).cancel}</Text>
              </Button>
              <Button onPress={handleDone}>
                <Text>{(config.selectLabels || { done: 'Done' }).done}</Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  );
});

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1
  },
  headerSearch: {
    paddingTop: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    borderBottomWidth: 0
  },
  header: {
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    borderBottomWidth: 0
  },
  headerSearchTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16
  },
  modalBackdrop: {
    backgroundColor: '#0000009c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 4,
    shadowColor: 'black',
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.24,
    shadowRadius: 5,
    minWidth: Dimensions.get('screen').width * 0.7,
    maxHeight: Dimensions.get('screen').height * 0.8,
    maxWidth: Dimensions.get('screen').width * 0.9
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 8,
    width: '100%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  notFound: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.8
  },
  scrollArea: {
    maxHeight: Dimensions.get('screen').height - 300,
    paddingHorizontal: 0
  },
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

export default Modal;
