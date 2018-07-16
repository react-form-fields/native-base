import { NativeBase } from 'native-base';
import * as React from 'react';

import FieldBase, { PropsBase } from './Common/Base';
import { FieldBaseSelection, IPropFieldBaseSelection } from './Common/Selection';

interface IProps extends PropsBase<NativeBase.CheckBox, keyof IPropFieldBaseSelection | 'onPress' | 'checked'>, IPropFieldBaseSelection {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default class FieldCheckbox extends FieldBase<IProps> {
  setFocus = () => { };

  render() {
    return <FieldBaseSelection component='checkbox' {...this.props} />;
  }
}