import * as React from 'react';

export interface ISelectContext {
  multiple: boolean;
  value: Set<any>;
  setValue: (value: any, checked: boolean) => void;
}

const SelectContext = React.createContext<ISelectContext>(null);

export default SelectContext;
