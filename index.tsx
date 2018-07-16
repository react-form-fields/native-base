import CustomMessageComponent from '@react-form-fields/core/components/CustomMessage';
import ValidationContextComponent from '@react-form-fields/core/components/ValidationContext';

import FieldCheckboxComponent from './components/Checkbox';
import FieldDatepickerComponent from './components/Datepicker';
import FieldPickerComponent from './components/Picker';
import FieldRadioComponent from './components/Radio';
import FieldSwitchComponent from './components/Switch';
import FieldTextComponent from './components/Text';

export * from './config';

export const FieldPicker = FieldPickerComponent;
export const FieldText = FieldTextComponent;
export const FieldRadio = FieldRadioComponent;
export const FieldCheckbox = FieldCheckboxComponent;
export const FieldSwitch = FieldSwitchComponent;
export const FieldDatepicker = FieldDatepickerComponent;

export const CustomMessage = CustomMessageComponent;
export const ValidationContext = ValidationContextComponent;