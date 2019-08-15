import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import { Icon, Item, Label, NativeBase, Spinner } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import ErrorMessage, { IErrorMessageProps } from './ErrorMessage';
import ThemeProvider from './ThemeProvider';

export interface IWrapperProps extends React.Props<{}> {
  label?: string;
  marginBottom?: boolean;
  helperText?: string;
  LabelProps?: NativeBase.Label;
  ItemProps?: NativeBase.Item;
  loading?: boolean;
  leftIcon?: string;
  leftIconAction?: (e?: any) => void;
  rightIcon?: string;
  rightIconAction?: (e?: any) => void;
  _onLabelPress?: (e?: any) => void;
  _disabled?: boolean;
}

const Wrapper = React.memo((props: IWrapperProps & IErrorMessageProps & { readonly?: boolean }) => {
  const config = useConfigContext();

  return (
    <View style={props.marginBottom ? styles.margin : null}>
      <ThemeProvider>
        <Item
          disabled={props._disabled}
          {...(config.itemProps || {})}
          {...(props.ItemProps || {})}
          error={props.showError && !props.isValid}
        >
          {!!props.leftIcon && (
            <Icon {...(config.iconProps || {})} name={props.leftIcon} onPress={props.leftIconAction} />
          )}

          {!!props.label && (
            <Label {...(config.labelProps || {})} {...(props.LabelProps || {})} onPress={props._onLabelPress}>
              {props.label}
            </Label>
          )}

          {props.children}

          {!!props.rightIcon && !props.loading && (
            <Icon {...(config.iconProps || {})} name={props.rightIcon} onPress={props.rightIconAction} />
          )}

          {!!props.loading && <Spinner size={'small'} style={styles.spinner} />}
        </Item>
        <ErrorMessage
          isValid={props.isValid}
          showError={props.showError}
          helperText={props.helperText}
          errorMessage={props.errorMessage}
        />
      </ThemeProvider>
    </View>
  );
});

const styles = StyleSheet.create({
  margin: {
    marginBottom: 20
  },
  spinner: {
    height: 23,
    width: 23
  }
});

export default Wrapper;
