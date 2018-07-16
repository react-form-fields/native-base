import { Body, Icon, Left, ListItem, Text, View } from 'native-base';
import * as propTypes from 'prop-types';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { ISelectItem } from '../../interfaces/selectItem';
import { classes, theme } from '../../theme';
import BaseComponent from '../abstract/baseComponent';
import { FieldCheckbox } from './Checkbox';
import FieldDatepicker from './Datetime';
import FieldPicker from './Picker';
import FieldText from './Text';

interface IProps {
  label?: string;
  placeholder?: string;
  next?: () => any;
  icon?: string;
  type: 'text'
  | 'email'
  | 'dropdown'
  | 'dialog'
  | 'date'
  | 'datetime'
  | 'time'
  | 'number'
  | 'password'
  | 'phone'
  | 'zipcode'
  | 'document'
  | 'boolean';
  options?: ISelectItem<any>[];
  value: any;
  onChange: Function;
  error?: string;
  onSubmit?: Function;
  style?: any;

  minuteInterval?: number;
  minimumDate?: Date;
}

export class Field extends BaseComponent<any, IProps> {
  public static propTypes: any = {
    label: propTypes.string,
    next: propTypes.func,
    icon: propTypes.string,
    type: propTypes.oneOf([
      'text',
      'email',
      'dropdown',
      'dialog',
      'date',
      'datetime',
      'time',
      'number',
      'password',
      'phone',
      'zipcode',
      'document',
      'boolean'
    ]),
    options: propTypes.any,
    value: propTypes.any,
    onChange: propTypes.func.isRequired,
    errors: propTypes.object,
    onSubmit: propTypes.func,
    style: propTypes.object,
    minuteInterval: propTypes.number,
    minimumDate: propTypes.instanceOf(Date)
  };

  constructor(props: IProps) {
    super(props);

    const value = this.props.value;
    this.state = { value };
  }

  public componentWillReceiveProps({ value }: IProps): void {
    if (value !== this.state.value) {
      this.setState({ value }, true);
    }
  }

  public onChange(value: any): void {
    this.setState({ value }, true);
    this.props.onChange(value);
  }

  public focus(): void {
    if (!this.refs.field || !(this.refs.field as Field).focus) return;
    (this.refs.field as Field).focus();
  }

  public next(): void {
    if (this.props.onSubmit) {
      this.props.onSubmit();
      return;
    }

    this.props.next && this.props.next().focus();
  }

  public render(): JSX.Element {
    let { label, error, type, icon, style } = this.props;
    const { value } = this.state;

    const hasError = !!error;

    const props = {
      ...this.props,
      value,
      hasError,
      next: this.next.bind(this),
      onChange: this.onChange.bind(this)
    };

    let content = null;

    switch (type) {
      case 'boolean':
        return <FieldCheckbox {...props} />;
        break;
      case 'dropdown':
      case 'dialog':
        return <FieldPicker {...props as any} />;
        break;
      case 'date':
      case 'datetime':
      case 'time':
        return <FieldDatepicker ref='field' {...props as any} />;
        break;
      default:
        return <FieldText ref='field' {...props as any} />;
    }

    return (
      <ListItem style={styles.container}>
        {icon &&
          <Left style={classes.listIconWrapper}>
            {icon !== 'empty' && <Icon name={icon} style={classes.listIcon} />}
          </Left>
        }
        <Body>
          <View style={styles.body}>
            {!!label && type !== 'boolean' &&
              <Text note style={StyleSheet.flatten([(style || {}).label, hasError ? styles.errorLabel : null])}>{label}</Text>
            }
            {content}
            <Text note style={styles.errorMessage}>{error}</Text>
          </View>
        </Body>
      </ListItem >
    );
  }

}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    marginLeft: -10,
    marginRight: -20,
    paddingBottom: 5
  },
  body: {
    marginLeft: 12
  },
  errorLabel: {
    opacity: 0.8,
    color: theme.inputErrorBorderColor
  },
  errorMessage: {
    color: theme.inputErrorBorderColor
  }
});