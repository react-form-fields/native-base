import FieldCoreBase, { IPropsFieldBase, IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import { TextStyle, ViewStyle } from 'react-native';

import { IWrapperProps } from './Wrapper';

interface IPropsBase extends IPropsFieldBase {
  onSubmit?: Function;
  next?: () => FieldBase;
}

type PropsResolver<T, E> = {
  [K in Exclude<keyof T, keyof IPropsFieldBase | E>]?: T[K]
};

export type PropsBase<T = {}, E = null> = IPropsFieldBase & IWrapperProps & PropsResolver<T, E> & {
  value: any;
  next?: () => any;
  onSubmit?: () => any;
  styles?: IWrapperProps['styles'] & {
    bodyInner?: ViewStyle;
    input?: TextStyle;
  };
};

export default abstract class FieldBase<
  P extends IPropsBase = IPropsBase,
  S extends IStateFieldBase = IStateFieldBase
  > extends FieldCoreBase<P, S> {
  protected field: FieldBase;

  abstract setFocus: () => void;

  public goNext(): void {
    if (this.props.onSubmit) {
      this.props.onSubmit();
      return;
    }

    this.props.next && this.props.next().setFocus();
  }
}