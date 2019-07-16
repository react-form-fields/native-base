import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import { Text } from 'native-base';
import * as React from 'react';
import { TextStyle } from 'react-native';

import { ThemeContext } from './ThemeProvider/context';

export interface IErrorMessageProps {
  isValid: boolean;
  showError: boolean;
  helperText: string;
  errorMessage: string;
}

const ErrorMessage = React.memo(({ showError, errorMessage, helperText }: IErrorMessageProps) => {
  const context = React.useContext(ThemeContext);
  const { errorStyle, helperTextStyle } = useConfigContext();

  const style = React.useMemo<TextStyle>(
    () => ({
      marginTop: 5,
      color: context ? context.inputErrorBorderColor : null,
      ...(errorStyle || {})
    }),
    [context, errorStyle]
  );

  const helperStyle = React.useMemo<TextStyle>(
    () => ({
      marginTop: 5,
      ...(helperTextStyle || {})
    }),
    [helperTextStyle]
  );

  if (showError && !!errorMessage) {
    return (
      <Text note style={style}>
        {errorMessage}
      </Text>
    );
  }

  if (helperText) {
    return (
      <Text note style={helperStyle}>
        {helperText}
      </Text>
    );
  }

  return null;
});

ErrorMessage.displayName = 'ErrorMessage';
export default ErrorMessage;
