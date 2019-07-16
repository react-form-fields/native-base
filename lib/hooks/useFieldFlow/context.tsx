import * as React from 'react';

export interface IFieldFlowContext {
  registerPosition(position: number, onFocusHandler: Function): void;
  unregisterPosition(position: number): void;
  goNext(currenPosition: number): boolean;
}

const FieldFlowContext = React.createContext<IFieldFlowContext>({
  registerPosition: () => { },
  unregisterPosition: () => { },
  goNext: () => false
});

export default FieldFlowContext;