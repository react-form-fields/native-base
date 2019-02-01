import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import { Body, Button, Header, Icon, Left, NativeBase, Picker, Right, Title, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import FieldBase, { PropsBase } from './Common/Base';
import Wrapper from './Common/Wrapper';

interface IProps extends PropsBase<NativeBase.Picker, 'onValueChange' | 'selectedValue'> {
  label?: string;
  icon?: string;
  value: any;
  onChange: (value: any) => void;
  options?: { value: any, display: string }[];
}

export default class FieldPicker extends FieldBase<IProps> {
  static defaultProps: Partial<IProps> = {
    styles: {}
  };

  setFocus = () => {
  }

  onChange = (value: any) => {
    this.setState({ showError: true });
    this.props.onChange(value);

    this.goNext();
  }

  get pickerContainerStyle() {
    const { styles } = this.props;

    return [
      innerStyles.pickerContainer, {
        borderWidth: (this.getThemeVariables().borderBottomWidth || 0.5) * 2,
        borderColor: this.getThemeVariables().inputBorderColor,
      },
      styles.pickerContainer,
      ...(this.errorMessage ? [{
        borderColor: this.getThemeVariables().inputErrorBorderColor
      }, styles.errorItem] : [])
    ];
  }

  render() {
    const { label, icon, options, value, styles, ...pickerProps } = this.props;

    return (
      <React.Fragment>
        <ValidationContextRegister field={this} />

        <Wrapper label={label} icon={icon} error={this.errorMessage} styles={styles}>
          <View style={this.pickerContainerStyle}>
            <Picker
              style={StyleSheet.flatten([innerStyles.picker, {
                width: this.getThemeVariables().deviceWidth - 20
              }, styles.picker])}
              iosHeader={label}
              iosIcon={<Icon name='arrow-down' />}
              prompt={label}
              selectedValue={value}
              textStyle={StyleSheet.flatten([innerStyles.pickerTextStyle, styles.pickerTextStyle])}
              itemStyle={StyleSheet.flatten([innerStyles.pickerItemStyle, styles.pickerItemStyle])}
              itemTextStyle={StyleSheet.flatten([innerStyles.pickerItemTextStyle, styles.pickerItemTextStyle])}
              renderHeader={this.renderHeader}
              {...pickerProps}
              onValueChange={this.onChange}
            >
              {options.map(option =>
                <Picker.Item key={option.value} label={option.display} value={option.value} />
              )}
            </Picker>
          </View>
        </Wrapper>
      </React.Fragment>
    );
  }

  renderHeader = (backAction: any) => {
    const { label } = this.props;

    return (
      <Header>
        <Left>
          <Button transparent onPress={backAction}>
            <Icon name='close' />
          </Button>
        </Left>
        <Body>
          <Title>{label}</Title>
        </Body>
        <Right />
      </Header>
    );
  }

}

const innerStyles = StyleSheet.create({
  pickerContainer: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    flex: 1,
    alignItems: 'stretch'
  },
  picker: {
    paddingLeft: 0
  },
  pickerTextStyle: {
    paddingLeft: 0
  },
  pickerItemTextStyle: {
    flex: 1
  },
  pickerItemStyle: {
    marginLeft: 0
  }
});