import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import { Item, Label, NativeBase } from 'native-base';
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
}

const Wrapper = React.memo((props: IWrapperProps & IErrorMessageProps) => {
  const config = useConfigContext();

  return (
    <View style={props.marginBottom ? styles.margin : null}>
      <ThemeProvider>
        <Item
          floatingLabel
          {...(config.itemProps || {})}
          {...(props.ItemProps || {})}
          error={props.showError && !props.isValid}
        >
          {!!props.label && (
            <Label {...(config.labelProps || {})} {...(props.LabelProps || {})}>
              {props.label}
            </Label>
          )}
          {props.children}
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
  }
});

export default Wrapper;
