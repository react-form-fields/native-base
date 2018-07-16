import { NativeBase } from 'native-base';
import * as React from 'react';

import FieldBase, { PropsBase } from './Base';
import { FieldBaseSelection, IPropFieldBaseSelection } from './BaseSelection';

interface IProps extends PropsBase<NativeBase.Switch, keyof IPropFieldBaseSelection | 'onValueChange'>, IPropFieldBaseSelection {
  value: boolean;
  onChange: (value: boolean) => void;
}

export class FieldSwitch extends FieldBase<IProps> {
  static defaultProps: Partial<IPropFieldBaseSelection> = {
    styles: {},
    position: 'right'
  };

  setFocus = () => { };

  render() {
    return <FieldBaseSelection component='switch' {...this.props} />;
  }
}