import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import {
  Body,
  Button,
  connectStyle,
  Container,
  Content,
  Footer,
  Header,
  Icon,
  Input,
  Item,
  Text,
  Title
} from 'native-base';
import * as React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal as ReactNativeModal,
  Platform,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';

import { IFieldSelectProps } from '.';
import { ThemeContext } from '../shared/ThemeProvider/context';
import List from './List';

export interface IModalProps extends IFieldSelectProps {
  visible: boolean;
  fullscreen?: boolean;
  handleDone: (value: Array<string | number> | string | number) => void;
  handleDismiss: () => void;
}

const Modal = React.memo(
  React.forwardRef((props: IModalProps, ref: any) => {
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

    const themeContext = React.useContext(ThemeContext);
    const config = useConfigContext();
    config.select = config.select || ({} as any);
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

    const modalActionStyles = React.useMemo(() => ({ ...styles.modalActions }), []);
    const modalHeaderStyles = React.useMemo(() => [props.fullscreen ? null : styles.header], [props.fullscreen]);
    const modalContainerStyles = React.useMemo(
      () => [styles.modalContainer, props.fullscreen ? null : styles.modalContainerContained],
      [props.fullscreen]
    );

    React.useEffect(() => {
      const eventShow = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', e => {
        setScrollAreaStyle({
          ...scrollAreaStyle,
          maxHeight: Dimensions.get('screen').height - e.endCoordinates.height
        });
      });

      const eventHide = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
        setScrollAreaStyle({ ...scrollAreaStyle, maxHeight: Dimensions.get('screen').height - 100 });
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
      <ReactNativeModal
        visible={visible}
        onRequestClose={handleDismiss}
        transparent={true}
        animated={true}
        animationType={props.fullscreen ? 'slide' : 'fade'}
        ref={ref}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.keyboardView}>
          <View style={styles.modalBackdrop}>
            <Container style={modalContainerStyles}>
              <Header
                iosBarStyle={themeContext.iosStatusbar as any}
                searchBar={searchable}
                rounded={searchable}
                style={modalHeaderStyles}
              >
                {searchable ? (
                  <Item>
                    <Icon {...(config.iconProps || {})} name={config.select.searchIcon || 'search'} />
                    <Input placeholder={label} value={query} onChangeText={setQuery} />
                  </Item>
                ) : (
                  <Body style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Title style={styles.headerSearchTitle}>{label}</Title>
                  </Body>
                )}
              </Header>
              <Content style={scrollAreaStyle} padder>
                <List
                  {...props}
                  ref={null}
                  options={filteredOptions}
                  internalValue={internalValue}
                  setInternalValue={setInternalValue}
                />
                {!filteredOptions.length && (
                  <Text style={styles.notFound}>{(config.select || { notFound: 'Not found' }).notFound}</Text>
                )}
              </Content>
              <Footer style={modalActionStyles}>
                <Button transparent dark onPress={handleDismiss}>
                  <Text>{(config.select || { cancel: 'Cancel' }).cancel}</Text>
                </Button>
                <Button transparent onPress={handleDone}>
                  <Text>{(config.select || { done: 'Done' }).done}</Text>
                </Button>
              </Footer>
            </Container>
          </View>
        </KeyboardAvoidingView>
      </ReactNativeModal>
    );
  })
);

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1
  },
  header: {
    paddingTop: 0
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
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
  },
  modalContainerContained: {
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: 'black',
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
    padding: 8
  },
  notFound: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.8
  },
  scrollArea: {
    maxHeight: Dimensions.get('screen').height - 100,
    paddingHorizontal: 0
  },
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

export default connectStyle('ReactFormFields.SelectModal', {})(Modal);
