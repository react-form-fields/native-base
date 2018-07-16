import { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import { Icon, Input, Item } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

import { dateFormatter } from '../../formatters/date';
import { theme } from '../../theme';
import FieldBase, { PropsBase } from './Base';
import Wrapper from './Wrapper';

interface IState extends IStateFieldBase {
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
      ...(this.errorMessage ? [innerStyles.errorItem, styles.errorItem] : [])
    ];
  }

  get defaultFormat() {
    switch (this.props.mode) {
      case 'date':
        return 'L';
      case 'time':
        return 'LT';
      default:
        return 'L LT';
    }
  }

  setFocus = () => {
    this.showPicker();
  }

  onChange = (value: Date) => {
    this.setState({ touched: true, showDatePicker: false });
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
    const { showDatePicker } = this.state;
    const { label, icon, value, styles, format, mode, ...datepickerProps } = this.props;

    return (
      <React.Fragment>
        {super.render()}

        <Wrapper label={label} icon={icon} error={this.errorMessage} styles={styles}>
          <View onTouchStart={this.showPicker}>
            <Item style={this.itemStyle} error={!!this.errorMessage}>
              <Input
                disabled
                value={value ? dateFormatter.format(value, format || this.defaultFormat) : null}
                style={[innerStyles.input, styles.input]}
              />
              {!!this.errorMessage && <Icon name='close-circle' />}
            </Item>
          </View>
        </Wrapper>

        <DateTimePicker
          titleIOS={`Selecione a ${mode === 'time' ? 'hora' : 'data'}`}
          confirmTextIOS='Confirmar'
          cancelTextIOS='Cancelar'
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
  },
  errorItem: {
    borderColor: theme.inputErrorBorderColor
  }
});