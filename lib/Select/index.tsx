import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import { Button, Icon } from 'native-base';
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import useFieldFlow, { IFlowIndexProp } from '../hooks/useFieldFlow';
import ThemeProvider from '../shared/ThemeProvider';
import FieldText, { IFieldTextProps } from '../Text';
import Modal from './Modal';

export interface IFieldSelectProps extends PropsResolver<IFieldTextProps>, IFlowIndexProp {
  label?: string;
  value: number | string | number[] | string[];
  onChange: (value: any) => void;
  options: IFieldSelectOption[];
  formatValueDisplay?: (selectedOptions: IFieldSelectOption[]) => string;
  marginBottom?: boolean;
  multiple?: boolean;
  searchable?: boolean;
}

export interface IFieldSelectOption {
  value: string | number;
  label: string;
}

const nullCallback = () => {};

const FieldSelect = React.memo((props: IFieldSelectProps) => {
  const { label, options, value, onChange, formatValueDisplay, ...otherProps } = props;

  const [visible, setVisibility] = React.useState(false);

  const config = useConfigContext();
  const { setDirty, showError, errorMessage } = useValidation(props);
  useFieldFlow(props, React.useCallback(() => {}, []));

  const displayValue = React.useMemo(() => {
    const arrayValue = Array.isArray(value) ? value : [value];
    const selectedValues = options.filter(o => arrayValue.includes(o.value));
    if (formatValueDisplay) return formatValueDisplay(selectedValues);
    return selectedValues.length > 3 ? `${selectedValues.length} items` : selectedValues.map(o => o.label).join(', ');
  }, [value, options, formatValueDisplay]);

  const handleOpen = React.useCallback(() => {
    setVisibility(true);
  }, [setVisibility]);

  const handleDone = React.useCallback(
    (value: any) => {
      onChange(value);
      config.validationOn === 'onChange' && setDirty(true);
      setVisibility(false);
    },
    [config.validationOn, onChange, setDirty]
  );

  const handleDismiss = React.useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  React.useEffect(() => () => setVisibility(false), []);

  return (
    <ThemeProvider>
      <TouchableOpacity onPress={handleOpen}>
        <View pointerEvents='none'>
          <FieldText
            {...otherProps}
            label={label}
            ref={null}
            value={displayValue}
            validation={null}
            errorMessage={showError ? errorMessage : null}
            onChange={nullCallback}
            flowIndex={null}
            tabIndex={null}
            editable={false}
          />
          <Button
            small
            icon
            transparent
            dark
            style={[styles.icon, (config.selectLabels || { buttonStyle: {} }).buttonStyle]}
          >
            <Icon
              name={Platform.OS === 'ios' ? 'arrow-down' : 'arrow-dropdown'}
              {...((config.selectLabels || { buttonIconProps: {} }).buttonIconProps || {})}
            />
          </Button>
        </View>
      </TouchableOpacity>

      <Modal {...props} ref={null} visible={visible} handleDismiss={handleDismiss} handleDone={handleDone} />
    </ThemeProvider>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingVertical: 5
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
    maxHeight: Dimensions.get('screen').height * 0.9,
    maxWidth: Dimensions.get('screen').width * 0.9
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'black',
    padding: 8,
    width: '100%'
  },
  searchbar: {
    elevation: 0
  },
  notFound: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.8
  },
  icon: {
    position: 'absolute',
    top: 14,
    right: -8,
    opacity: 0.6
  },
  iconOutlined: {
    top: 12
  },
  scrollArea: {
    maxHeight: Dimensions.get('screen').height - 200,
    paddingHorizontal: 0
  },
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

export default FieldSelect;
