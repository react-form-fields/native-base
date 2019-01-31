import FieldCoreBase, { IPropsFieldBase, IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import variables from 'native-base/src/theme/variables/platform';
import * as PropTypes from 'prop-types';
import { TextStyle, ViewStyle } from 'react-native';

import { IWrapperProps } from './Wrapper';

interface IPropsBase extends IPropsFieldBase {
  onSubmit?: Function;
  next?: () => FieldBase;
  theme?: any;
}

type PropsResolver<T, E> = {
  [K in Exclude<keyof T, keyof IPropsFieldBase | E>]?: T[K]
};

export type PropsBase<T = {}, E = null> = IPropsFieldBase & IWrapperProps & PropsResolver<T, E> & {
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

  context: any;

  static contextTypes = {
    theme: PropTypes.object,
    foregroundColor: PropTypes.string,
  };

  static propTypes = {
    theme: PropTypes.object,
    foregroundColor: PropTypes.string,
  };

  static childContextTypes = {
    theme: PropTypes.object,
    foregroundColor: PropTypes.string,
  };

  getChildContext() {
    return {
      theme: this.props.theme ? this.props.theme : this.context.theme,
    };
  }

  getContextForegroundColor() {
    return this.context.foregroundColor;
  }

  getThemeVariables(): typeof variables {
    return this.context.theme
      ? this.context.theme['@@shoutem.theme/themeStyle'].variables
      : {};
  }

  abstract setFocus: () => void;

  public goNext(): void {
    if (this.props.onSubmit) {
      this.props.onSubmit();
      return;
    }

    this.props.next && this.props.next().setFocus();
  }
}