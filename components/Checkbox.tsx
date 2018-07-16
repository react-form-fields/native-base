import { NativeBase } from 'native-base';
import * as React from 'react';

import FieldBase, { PropsBase } from './Base';
import { FieldBaseSelection, IPropFieldBaseSelection } from './BaseSelection';

interface IProps extends PropsBase<NativeBase.CheckBox, keyof IPropFieldBaseSelection | 'onPress' | 'checked'>, IPropFieldBaseSelection {
  value: boolean;
  onChange: (value: boolean) => void;
}

export class FieldCheckbox extends FieldBase<IProps> {
  setFocus = () => { };

  render() {
    return <FieldBaseSelection component='checkbox' {...this.props} />;
  }
}