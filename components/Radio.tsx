import { NativeBase } from 'native-base';
import * as React from 'react';

import FieldBase, { PropsBase } from './Common/Base';
import { FieldBaseSelection, IPropFieldBaseSelection } from './Common/Selection';

interface IProps extends PropsBase<NativeBase.Radio, keyof IPropFieldBaseSelection | 'onPress' | 'selected'>, IPropFieldBaseSelection {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default class FieldRadio extends FieldBase<IProps> {
  setFocus = () => { };

  render() {
    return <FieldBaseSelection component='radio' {...this.props} />;
  }
}