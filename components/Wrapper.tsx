import { Body, Icon, Left, ListItem, Text, View } from 'native-base';
import * as React from 'react';
import { GestureResponderEvent, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { theme } from '../../theme';

export interface IWrapperProps {
  label?: string;
  styles?: {
    container?: ViewStyle;
    iconWrapper?: ViewStyle;
    icon?: TextStyle
    body?: ViewStyle;
    label?: TextStyle;
    errorLabel?: TextStyle;
    errorMessage?: TextStyle;
    errorIcon?: TextStyle;
    errorItem?: ViewStyle;
    picker?: TextStyle;
    pickerContainer?: ViewStyle;
    pickerTextStyle?: TextStyle;
    pickerItemStyle?: ViewStyle;
    pickerItemTextStyle?: TextStyle;
  };
  icon?: string;
}

export default class Wrapper extends React.PureComponent<IWrapperProps & {
  error?: string,
  onPress?: (event: GestureResponderEvent) => void
}> {
  static defaultProps: Partial<IWrapperProps> = {
    styles: {}
  };

  get labelStyle() {
    const { styles, error } = this.props;

    return [
      styles.label,
      ...(error ? [innerStyles.errorLabel, styles.errorLabel] : [])
    ];
  }

  get iconStyle() {
    const { styles, error } = this.props;

    return [
      innerStyles.icon,
      styles.icon,
      ...(error ? [innerStyles.errorIcon, styles.errorIcon] : [])
    ];
  }

  render() {
    const { label, error, icon, styles, onPress, children } = this.props;

    return (
      <ListItem style={[innerStyles.container, styles.container]} button={!!onPress} onPress={onPress}>
        {!!icon &&
          <Left style={[innerStyles.iconWrapper, styles.iconWrapper]}>
            {icon !== 'empty' && <Icon name={icon} style={this.iconStyle} />}
          </Left>
        }
        <Body>
          <View style={[innerStyles.body, styles.body]}>
            {!!label &&
              <Text note style={this.labelStyle}>{label}</Text>
            }
            {children}
            <Text note style={[innerStyles.errorMessage, styles.errorMessage]}>{error}</Text>
          </View>
        </Body>
      </ListItem >
    );
  }
}

const innerStyles = StyleSheet.create({
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
    color: theme.inputErrorBorderColor
  },
  errorMessage: {
    color: theme.inputErrorBorderColor
  },
  errorIcon: {
    color: theme.inputErrorBorderColor
  },
  iconWrapper: {
    maxWidth: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    fontSize: 30,
    marginLeft: 10,
    textAlign: 'center'
  }
});