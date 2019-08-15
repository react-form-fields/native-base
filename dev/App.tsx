import { Ionicons } from '@expo/vector-icons';
import { IValidationContextRef } from '@react-form-fields/core/ValidationContext';
import FieldCheckbox from '@react-form-fields/native-base/Checkbox';
import ConfigProvider, { ConfigBuilder } from '@react-form-fields/native-base/ConfigProvider';
import langConfig from '@react-form-fields/native-base/ConfigProvider/langs/en-us';
import FieldDatepicker from '@react-form-fields/native-base/Datepicker';
import FieldRadio from '@react-form-fields/native-base/Radio';
import FieldSelect from '@react-form-fields/native-base/Select';
import FieldSwitch from '@react-form-fields/native-base/Switch';
import FieldText from '@react-form-fields/native-base/Text';
import ValidationContext from '@react-form-fields/native-base/ValidationContext';
import * as Font from 'expo-font';
import { Body, Button, Container, Content, Header, Root, Subtitle, Text, Title, Toast, View } from 'native-base';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const configInitial = new ConfigBuilder()
  .fromLang(langConfig)
  .build();

const App = memo(() => {
  const validationRef = useRef<IValidationContextRef>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }).then(() => setLoaded(true));
  }, []);

  const [config, setConfig] = useState(configInitial);
  const [value, setValue] = useState('');
  const [valueSelect, setValueSelect] = useState(0);
  const [valueSelectMultiple, setValueSelectMultiple] = useState([]);
  const [valueDark, setValueDark] = useState(false);
  const [valueRadio, setValueRadio] = useState('');
  const [valueMoney, setValueMoney] = useState(0);
  const [valueDate, setValueDate] = useState(new Date);
  const selectOptions = useMemo(() => new Array(40).fill('a').map((v, i) => ({ value: i + 1, label: `Options ${(i + 1)}` })), []);

  const handleSave = useCallback(async () => {
    const text = await validationRef.current.isValid() ? 'Valid' : 'Invalid';

    Toast.show({
      text,
      position: 'top',
      buttonText: 'OK',
      duration: 3000,
    });
  }, [validationRef]);

  const setValidationOn = useCallback((checked: boolean) => {
    setConfig({ ...config, validationOn: checked ? 'onChange' : 'onSubmit' })
  }, [config, setConfig]);

  if (!loaded) return null;

  return (
    <Container>
      <Root>
        <Header>
          <Body>
            <Title>React Form Fields</Title>
            <Subtitle>NativeBase</Subtitle>
          </Body>
        </Header>

        <Content>
          <View style={{ padding: 20 }}>
            <ConfigProvider value={config}>
              <ValidationContext ref={validationRef}>
                <FieldSwitch
                  label={`Validation On: ${config.validationOn}`}
                  value={config.validationOn === 'onChange'}
                  onChange={setValidationOn}
                  marginBottom
                />

                <FieldCheckbox
                  label='Checkbox'
                  value={valueDark}
                  onChange={setValueDark}
                  marginBottom
                />

                <FieldRadio
                  label='Radio button 1'
                  value={valueRadio}
                  radioValue='radio 1'
                  onChange={setValueRadio}
                  marginBottom
                />

                <FieldRadio
                  label='Radio button 2'
                  value={valueRadio}
                  radioValue='radio 2'
                  onChange={setValueRadio}
                  marginBottom
                />

                <FieldText
                  label='Text'
                  helperText='just a helper text'
                  value={value}
                  onChange={setValue}
                  flowIndex={2}
                  validation='required|string|min:3|max:10'
                  marginBottom
                />

                <FieldText
                  label='Password'
                  value={value}
                  onChange={setValue}
                  flowIndex={3}
                  validation='required|string|min:3|max:10'
                  leftIcon='lock'
                  secureTextEntry={true}
                  marginBottom
                />

                <FieldText
                  label='Money'
                  mask='money'
                  keyboardType='number-pad'
                  flowIndex={4}
                  value={valueMoney}
                  validation='numeric|min:3|max:10'
                  leftIcon='cash'
                  onChange={setValueMoney}
                  marginBottom
                />

                <FieldText
                  label='Text Loading'
                  value={value}
                  onChange={setValue}
                  flowIndex={5}
                  marginBottom
                  loading={true}
                />

                <FieldDatepicker
                  label='Date'
                  flowIndex={6}
                  value={valueDate}
                  onChange={setValueDate}
                  validation='required|date'
                  marginBottom
                />

                <FieldDatepicker
                  label='DateTime'
                  mode='datetime'
                  flowIndex={7}
                  value={valueDate}
                  onChange={setValueDate}
                  validation='required|date'
                  marginBottom
                />

                <FieldDatepicker
                  label='Time'
                  mode='time'
                  flowIndex={8}
                  value={valueDate}
                  onChange={setValueDate}
                  validation='required|date'
                  marginBottom
                />

                <FieldSelect
                  label='Select FullScreen Searchable'
                  flowIndex={9}
                  value={valueSelect}
                  options={selectOptions}
                  onChange={setValueSelect}
                  validation='required|date'
                  fullscreen
                  marginBottom
                  searchable
                />

                <FieldSelect
                  label='Select Multiple'
                  flowIndex={10}
                  value={valueSelectMultiple}
                  options={selectOptions}
                  onChange={setValueSelectMultiple}
                  validation='required|date'
                  marginBottom
                  editable={false}
                  multiple
                />

                <FieldSelect
                  label='Select Custom Display'
                  flowIndex={11}
                  value={valueSelect}
                  options={selectOptions}
                  onChange={setValueSelect}
                  validation='required|date'
                  formatValueDisplay={(items) => `${items.length} items`}
                  multiple
                  marginBottom
                  searchable
                />

                <Button block onPress={handleSave}>
                  <Text>Save</Text>
                </Button>
              </ValidationContext>
            </ConfigProvider>
          </View>
        </Content>
      </Root>
    </Container>
  );
});

export default App;