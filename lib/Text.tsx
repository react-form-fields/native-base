import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMask from '@react-form-fields/core/hooks/useMask';
import useMemoOtherProps from '@react-form-fields/core/hooks/useMemoOtherProps';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { PropsResolver } from '@react-form-fields/core/interfaces/props';
import { Input, NativeBase } from 'native-base';
import * as React from 'react';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

import useFieldFlow, { IFlowIndexProp } from './hooks/useFieldFlow';
import Wrapper, { IWrapperProps } from './shared/Wrapper';

export interface IFieldTextRef {
  focus: () => void;
  blur: () => void;
  setDirty: (dirty: boolean) => void;
}

export interface IFieldTextProps extends PropsResolver<NativeBase.Input>, IFlowIndexProp, IWrapperProps {
  value: string | number;
  displayValue?: string;
  onChange: (value: any) => void;
}

const FieldText = React.memo(
  React.forwardRef<IFieldTextRef, IFieldTextProps>((props, ref) => {
    const { onChange, marginBottom, helperText, onSubmitEditing, returnKeyType, displayValue } = props;

    const config = useConfigContext();
    const { setDirty, showError, errorMessage, isValid } = useValidation(props);
    const { maskedValue, maskClean } = useMask(props);

    const inputRef = React.useRef<any>();
    const [goNext, hasValidIndex, flowIndex] = useFieldFlow(
      props,
      React.useCallback(() => inputRef.current && inputRef.current._root.focus(), [inputRef])
    );

    const otherProps = useMemoOtherProps(
      props,
      'value',
      'onChange',
      'label',
      'marginBottom',
      'helperText',
      'LabelProps',
      'ItemProps'
    );

    const onChangeHandler = React.useCallback(
      (text: string) => {
        config.validationOn === 'onChange' && setDirty(true);
        onChange(maskClean(text));
      },
      [onChange, setDirty, maskClean, config.validationOn]
    );

    const onSubmitHandler = React.useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (onSubmitEditing) {
          setTimeout(() => onSubmitEditing(e), config.validationDelay || 500);
          return;
        }

        goNext(flowIndex);
      },
      [onSubmitEditing, goNext, flowIndex, config.validationDelay]
    );

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current._root.focus(),
        blur: () => inputRef.current._root.blur(),
        setDirty: (dirty: boolean) => setDirty(dirty)
      }),
      [inputRef, setDirty]
    );

    return (
      <Wrapper
        label={props.label}
        LabelProps={props.LabelProps}
        ItemProps={props.ItemProps}
        showError={showError}
        errorMessage={errorMessage}
        helperText={helperText}
        marginBottom={marginBottom}
        isValid={isValid}
      >
        <Input
          {...otherProps}
          ref={inputRef}
          value={displayValue || (maskedValue || '').toString() || null}
          onChangeText={onChangeHandler}
          returnKeyType={returnKeyType ? returnKeyType : onSubmitEditing ? 'send' : hasValidIndex ? 'next' : 'default'}
          onSubmitEditing={onSubmitHandler}
        />
      </Wrapper>
    );
  })
);

FieldText.displayName = 'FieldText';
export default FieldText;
