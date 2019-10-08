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
    const {
      onChange,
      _onLabelPress: onLabelPress,
      _onPress: onPress,
      marginBottom,
      helperText,
      onSubmitEditing,
      returnKeyType,
      loading,
      displayValue,
      leftIcon
    } = props;

    const config = useConfigContext();
    const { setDirty, showError, errorMessage, isValid } = useValidation(props);
    const { maskedValue, maskClean } = useMask(props);

    const inputRef = React.useRef<any>();
    const [goNext, hasValidIndex, flowIndex] = useFieldFlow(
      props,
      React.useCallback(() => inputRef.current && inputRef.current._root.focus(), [inputRef])
    );

    const [showPassword, setShowPassword] = React.useState(false);

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

    const toggleShowPassword = React.useCallback(() => {
      setShowPassword(!showPassword);
    }, [showPassword]);

    const [rightIconComponent, rightIconAction] = React.useMemo(() => {
      if (props.rightIcon || !props.secureTextEntry) {
        return [props.rightIcon, props.rightIconAction];
      }

      return [showPassword ? 'eye-off' : 'eye', toggleShowPassword];
    }, [props.rightIcon, props.rightIconAction, props.secureTextEntry, showPassword, toggleShowPassword]);

    const secureTextEntry = React.useMemo(() => {
      if (props.secureTextEntry !== true || showPassword) {
        return false;
      }

      return true;
    }, [props.secureTextEntry, showPassword]);

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
        leftIcon={leftIcon}
        rightIcon={rightIconComponent}
        rightIconAction={rightIconAction}
        loading={loading}
        _onLabelPress={onLabelPress}
        _onPress={onPress}
        _disabled={props._disabled !== undefined ? props._disabled : props.editable === false}
      >
        <Input
          {...otherProps}
          ref={inputRef}
          value={displayValue || (maskedValue || '').toString() || null}
          onChangeText={onChangeHandler}
          returnKeyType={returnKeyType ? returnKeyType : onSubmitEditing ? 'send' : hasValidIndex ? 'next' : 'default'}
          onSubmitEditing={onSubmitHandler}
          secureTextEntry={secureTextEntry}
        />
      </Wrapper>
    );
  })
);

FieldText.displayName = 'FieldText';
export default FieldText;
