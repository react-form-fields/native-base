import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import { CheckBox, Col, Grid, Radio, Row, Switch, Text } from 'native-base';
import * as React from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';

import FieldBase, { PropsBase } from './Base';
import Wrapper from './Wrapper';

type allowedComponent = 'radio' | 'switch' | 'checkbox';

export interface IPropFieldBaseSelection extends PropsBase {
  label?: string;
  position?: 'left' | 'right';
  value: boolean;
  onChange: (value: boolean) => void;
}

export class FieldBaseSelection extends FieldBase<IPropFieldBaseSelection & { component: allowedComponent }> {
  static defaultProps: Partial<IPropFieldBaseSelection> = {
    styles: {},
    position: 'left'
  };

  get wrapperStyle() {
    return {
      ...this.props.styles,
      container: StyleSheet.flatten([
        this.props.styles.container,
        innerStyles.container
      ]),
      errorMessage: StyleSheet.flatten([
        this.props.styles.errorMessage,
        this.props.position === 'right' ?
          innerStyles.errorMessageRight :
          innerStyles.errorMessageLeft
      ])
    };
  }

  setFocus = () => { };

  onChange = (e: React.SyntheticEvent | boolean) => {
    if (typeof e !== 'boolean') {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
    }

    this.setState({ showError: true });
    this.props.onChange(!this.props.value);
  }

  render() {
    const { label, icon, children, position, styles, component, ...extraProps } = this.props;

    return (
      <Wrapper error={this.errorMessage} styles={this.wrapperStyle} icon={icon} onPress={this.onChange}>
        <ValidationContextRegister field={this} />

        <Grid>
          {position !== 'right' &&
            <Col style={innerStyles.col}>
              <Row style={innerStyles.row}>
                <RenderComponent component={component} onPress={this.onChange} {...extraProps} />
              </Row>
            </Col>
          }
          <Col style={position === 'right' ? innerStyles.labelRight : null}>
            <Row>
              {!!label && <Text>{label}</Text>}
              {children}
            </Row>
          </Col>
          {position === 'right' &&
            <Col style={innerStyles.col}>
              <Row style={innerStyles.row}>
                <RenderComponent component={component} onPress={this.onChange} {...extraProps} />
              </Row>
            </Col>
          }
        </Grid>
      </Wrapper>
    );
  }
}

interface IRenderProps {
  component: allowedComponent;
  value: boolean;
  onPress(e: GestureResponderEvent | boolean): void;
}

function RenderComponent({ component, value, onPress, ...extraProps }: IRenderProps) {
  if (component === 'radio') {
    return <Radio {...extraProps} selected={value} onPress={onPress} />;
  }

  if (component === 'checkbox') {
    return <CheckBox {...extraProps} checked={value} onPress={onPress} />;
  }

  return <Switch {...extraProps} value={value} onValueChange={onPress} />;
}

const innerStyles = StyleSheet.create({
  container: {
    marginLeft: -30
  },
  labelRight: {
    paddingLeft: 20
  },
  row: {
    justifyContent: 'center'
  },
  col: {
    maxWidth: 65
  },
  errorMessageLeft: {
    paddingLeft: 65
  },
  errorMessageRight: {
    paddingLeft: 20
  }
});