import * as React from 'react';

import FieldFlowContext, { IFieldFlowContext } from './context';

export interface IFlowIndexProp {
  flowIndex?: number;
  tabIndex?: number;
}

const goNextEmpty = [() => false, false, null] as [IFieldFlowContext['goNext'], boolean, number];

const useFieldFlow = ({ flowIndex, tabIndex }: IFlowIndexProp, onFocusHandler: Function) => {
  const index = React.useMemo(() => flowIndex === undefined ? tabIndex : flowIndex, [flowIndex, tabIndex]);
  const { registerPosition, unregisterPosition, goNext } = React.useContext(FieldFlowContext);

  React.useEffect(() => {
    if (index === undefined || index === null) {
      return () => { };
    }

    registerPosition(index, onFocusHandler);
    return () => unregisterPosition(index);
  }, [index, onFocusHandler, registerPosition, unregisterPosition]);

  return React.useMemo(() => {
    if (index === undefined || index === null) return goNextEmpty;

    return [goNext, true, index] as [IFieldFlowContext['goNext'], boolean, number];
  }, [index, goNext]);
};

export default useFieldFlow;