import ValidationContextCore, { IProps, IValidationContextRef } from '@react-form-fields/core/ValidationContext';
import * as React from 'react';
import { InteractionManager } from 'react-native';
import * as uuidV4 from 'uuid/v4';

import FieldFlowContext, { IFieldFlowContext } from './hooks/useFieldFlow/context';

export interface IValidationContextProps extends IProps { }

const fieldsMap: { [key: string]: IFieldFlowContext } = {};

const ValidationContext = React.memo(React.forwardRef<IValidationContextRef, IValidationContextProps>(
  ({ children, ...props }: IValidationContextProps, ref) => {
    const [fieldId, setFieldId] = React.useState(null);

    React.useEffect(() => {
      const fieldId = uuidV4();
      setFieldId(fieldId);

      const fields: { position: number, onFocusHandler: Function }[] = [];
      fieldsMap[fieldId] = {
        registerPosition(position: number, onFocusHandler: Function): void {
          fields.push({ position, onFocusHandler });
        },
        unregisterPosition(position: number): void {
          const index = fields.findIndex(f => f.position === position);
          if (index < 0) return;
          fields.splice(index, 1);
        },
        goNext(currenPosition: number): boolean {
          const nextField = fields
            .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1)
            .find(f => f.position > currenPosition);

          if (!nextField) return false;

          InteractionManager.runAfterInteractions()
            .then(() => nextField.onFocusHandler());

          return true;
        },
      };

      return () => delete fieldsMap[fieldId];
    }, []);

    if (!fieldsMap[fieldId]) return null;

    return (
      <FieldFlowContext.Provider value={fieldsMap[fieldId]}>
        <ValidationContextCore {...props} ref={ref}>
          {children}
        </ValidationContextCore>
      </FieldFlowContext.Provider>
    );
  })
);

ValidationContext.displayName = 'ValidationContext';
export default ValidationContext;