import { Body, Button, Header, Icon, Left, NativeBase, Picker, Right, Title, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { theme } from '../../theme';
import FieldBase, { PropsBase } from './Base';
import Wrapper from './Wrapper';

interface IProps extends PropsBase<NativeBase.Picker, 'onValueChange' | 'selectedValue'> {
  label?: string;
  icon?: string;
  value: any;
  onChange: (value: any) => void;
  options?: { value: string, display: string }[];
}

export default class FieldPicker extends FieldBase<IProps> {
  static defaultProps: Partial<IProps> = {
    styles: {}
  };

  setFocus = () => { };

  onChange = (value: any) => {
    this.setState({ touched: true });
    this.props.onChange(value);
  }

  get pickerContainerStyle() {
    const { styles } = this.props;

    return [
      innerStyles.pickerContainer,
      styles.pickerContainer,
      ...(this.errorMessage ? [innerStyles.errorItem, styles.errorItem] : [])
    ];
  }

  render() {
    const { label, icon, options, value, styles, ...pickerProps } = this.props;

    return (
      <React.Fragment>
        {super.render()}

        <Wrapper label={label} icon={icon} error={this.errorMessage} styles={styles}>
          <View style={this.pickerContainerStyle}>
            <Picker
              style={StyleSheet.flatten([innerStyles.picker, styles.picker])}
              iosHeader={label}
              prompt={label}
              selectedValue={value}
              textStyle={StyleSheet.flatten([innerStyles.pickerTextStyle, styles.pickerTextStyle])}
              itemStyle={StyleSheet.flatten([innerStyles.pickerItemStyle, styles.pickerItemStyle])}
              itemTextStyle={StyleSheet.flatten([innerStyles.pickerItemTextStyle, styles.pickerItemTextStyle])}
              renderHeader={(backAction: any) =>
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
              }
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
}

const innerStyles = StyleSheet.create({
  pickerContainer: {
    borderWidth: theme.borderWidth * 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: theme.inputBorderColor,
    flex: 1,
    alignItems: 'stretch'
  },
  picker: {
    width: theme.deviceWidth - 20,
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
  },
  errorItem: {
    borderColor: theme.inputErrorBorderColor
  }
});