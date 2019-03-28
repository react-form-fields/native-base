import { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import { getConfig } from '@react-form-fields/core/config';
import { Icon, Input, Item } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

import { dateFormat } from '../helpers/dateFormat';
import FieldBase, { PropsBase } from './Common/Base';
import Wrapper from './Common/Wrapper';

interface IState extends IStateFieldBase {
  currentValue?: Date;
  formattedValue?: string;
  showDatePicker: boolean;
}

interface IProps extends PropsBase<DateTimePickerProps, 'date' | 'isVisible' | 'onConfirm' | 'onCancel'> {
  value: Date;
  onChange: (value: Date) => void;
  format?: string;
}

export default class FieldDatepicker extends FieldBase<IProps, IState> {
  static defaultProps: Partial<IProps> = {
    styles: {}
  };

  static getDerivedStateFromProps(nextProps: IProps, currentState: IState): IState {
    let currentValue = currentState.currentValue;
    let formattedValue = currentState.formattedValue;

    if (currentValue !== nextProps.value) {
      currentValue = nextProps.value;
      formattedValue = dateFormat(nextProps.value, nextProps.format || nextProps.mode || 'date');
    }

    return {
      ...currentState,
      ...super.getDerivedStateFromProps(nextProps, currentState),
      currentValue,
      formattedValue
    };

  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    if (this.state.showDatePicker && nextState.showDatePicker) {
      return false;
    }

    if (!super.shouldComponentUpdate) return true;
    return super.shouldComponentUpdate(nextProps, nextState, nextContext);
  }

  get itemStyle() {
    const { styles } = this.props;

    return [
      styles.bodyInner,
      ...(this.errorMessage ? [{
        borderColor: this.getThemeVariables().inputErrorBorderColor
      }, styles.errorItem] : [])
    ];
  }

  setFocus = () => {
    this.showPicker();
  }

  onChange = (value: Date) => {
    this.setState({ showError: true, showDatePicker: false });
    this.props.onChange(value);
  }

  handleSubmitEditing = () => {
    this.goNext();
  }

  showPicker = () => {
    this.setState({ showDatePicker: true });
  }

  hidePicker = () => {
    this.setState({ showDatePicker: false });
  }

  render() {
    const { showDatePicker, formattedValue } = this.state;
    const { label, icon, value, styles, format, onChange, ...datepickerProps } = this.props;

    return (
      <React.Fragment>
        <ValidationContextRegister field={this} />

        <Wrapper label={label} icon={icon} error={this.errorMessage} styles={styles}>
          <View onTouchStart={this.showPicker}>
            <Item style={this.itemStyle} error={!!this.errorMessage}>
              <Input
                disabled
                value={formattedValue}
                style={[innerStyles.input, styles.input]}
              />
              {!!this.errorMessage && <Icon name='close-circle' />}
            </Item>
          </View>
        </Wrapper>

        <DateTimePicker
          titleIOS={label}
          confirmTextIOS={getConfig().date.labels.ok}
          cancelTextIOS={getConfig().date.labels.cancel}
          {...datepickerProps}
          date={value || new Date()}
          isVisible={showDatePicker}
          onConfirm={this.onChange}
          onCancel={this.hidePicker}
        />
      </React.Fragment>
    );
  }
}

const innerStyles = StyleSheet.create({
  input: {
    height: 41,
    lineHeight: 20,
    paddingLeft: 0
  }
});