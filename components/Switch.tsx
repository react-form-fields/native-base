import { NativeBase } from 'native-base';
import * as React from 'react';

import FieldBase, { PropsBase } from './Common/Base';
import { FieldBaseSelection, IPropFieldBaseSelection } from './Common/Selection';

interface IProps extends PropsBase<NativeBase.Switch, keyof IPropFieldBaseSelection | 'onValueChange'>, IPropFieldBaseSelection {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default class FieldSwitch extends FieldBase<IProps> {
  static defaultProps: Partial<IPropFieldBaseSelection> = {
    styles: {},
    position: 'right'
  };

  setFocus = () => { };

  render() {
    return <FieldBaseSelection component='switch' {...this.props} />;
  }
}