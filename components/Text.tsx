import FieldCoreBase, { IPropsFieldBase, IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import { Icon, Input, Item } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IState extends IStateFieldBase {
  styles: { item: any, input: any };
}

interface IProps extends IPropsFieldBase {
  value: any;
  onChange: (value: any) => void;
  type: string;
  next: () => any;
  styles?: { item?: any, input?: any };
}

const keyboardTypes: any = {
  text: 'default',
  email: 'email-address',
  number: 'numeric',
  phone: 'phone-pad',
  zipcode: 'numeric',
  document: 'default'
};

export default class FieldText extends FieldCoreBase<IProps, IState> {
  private input: Input;

  static getDerivedStateFromProps(nextProps: IProps, currentState: IState): IState {
    return {
      ...currentState,
      ...FieldCoreBase.getDerivedStateFromProps(nextProps, currentState),
      styles: {
        item: (nextProps.styles || {}).item || {},
        input: (nextProps.styles || {}).input || {}
      }
    }
  }

  get itemStyle() {
    return StyleSheet.flatten([
      this.state.styles.item,
      this.errorMessage ? { borderColor: 'red' } : null
    ]);
  }

  onChange = (event: any) => {
    const value = this.mask.clean(event.target ? event.target.value : event);

    this.setState({ touched: true });
    this.props.onChange(value);
  }

  public setFocus = (): void => {
    if (!this.input) return;
    (this.input as any)._root.focus();
  }

  render() {
    const { styles } = this.state;
    const { type, next, value, } = this.props;

    return (
      <React.Fragment>
        {super.render()}

        <Item style={this.itemStyle} error={!!this.errorMessage}>
          <Input
            ref={i => this.input = i}
            value={(value || '').toString()}
            onChangeText={this.onChange}
            keyboardType={keyboardTypes[type] || keyboardTypes.text}
            secureTextEntry={type === 'password' ? true : false}
            style={styles.input}
            returnKeyType={next ? 'next' : 'default'}
            onSubmitEditing={() => next()}
          />
          {!!this.errorMessage && <Icon name='close-circle' />}
        </Item>
      </React.Fragment>
    );
  }
}
