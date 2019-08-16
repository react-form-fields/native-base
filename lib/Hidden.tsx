import useValidation from '@react-form-fields/core/hooks/useValidation';
import { IPropsFieldBase } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';

import ErrorMessage from './shared/ErrorMessage';

export interface IFieldHiddenProps extends IPropsFieldBase {}

const FieldHidden = React.memo((props: IFieldHiddenProps) => {
  const { isValid, showError, errorMessage } = useValidation(props);
  return <ErrorMessage isValid={isValid} showError={showError} errorMessage={errorMessage} />;
});

FieldHidden.displayName = 'FieldHidden';
export default FieldHidden;
