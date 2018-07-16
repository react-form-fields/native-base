import { Icon, Input, Item } from 'native-base';
import * as React from 'react';
import { StyleSheet, TextInput, TextInputProperties } from 'react-native';

import { theme } from '../../theme';
import FieldBase, { PropsBase } from './Base';
import Wrapper from './Wrapper';

interface IProps extends PropsBase<TextInputProperties, 'onChange'> {
  value: string | number;
  onChange: (value: string) => void;
  next: () => any;
}

export default class FieldText extends FieldBase<IProps> {
  private input: { _root: TextInput };
  static defaultProps: Partial<IProps> = {
    styles: {}
  };

  get itemStyle() {
    const { styles } = this.props;

    return [
      styles.bodyInner,
      ...(this.errorMessage ? [innerStyles.errorItem, styles.errorItem] : [])
    ];
  }

  setRef = (input: any) => {
    this.input = input;
  }

  setFocus = () => {
    this.input._root.focus();
  }

  onChange = (value: string) => {
    this.setState({ touched: true });
    this.props.onChange(this.mask.clean(value));
  }

  handleSubmitEditing = () => {
    this.goNext();
  }

  render() {
    const { label, icon, next, value, styles } = this.props;

    return (
      <React.Fragment>
        {super.render()}

        <Wrapper label={label} icon={icon} error={this.errorMessage} styles={styles}>
          <Item style={this.itemStyle} error={!!this.errorMessage}>
            <Input
              ref={this.setRef}
              value={this.mask.apply((value || '').toString())}
              onChangeText={this.onChange}
              style={[innerStyles.input, styles.input]}
              returnKeyType={next ? 'next' : 'default'}
              onSubmitEditing={this.handleSubmitEditing}
            />
            {!!this.errorMessage && <Icon name='close-circle' />}
          </Item>
        </Wrapper>
      </React.Fragment>
    );
  }
}

const innerStyles = StyleSheet.create({
  input: {
    height: 41,
    lineHeight: 20,
    paddingLeft: 0
  },
  errorItem: {
    borderColor: theme.inputErrorBorderColor
  }
});