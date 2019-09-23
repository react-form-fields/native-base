import TextMaskCore, { ITextMaskProps as ITextMaskCoreProps } from '@react-form-fields/core/TextMask';
import { NativeBase, Text } from 'native-base';
import * as React from 'react';

export interface ITextMaskProps extends NativeBase.Text, ITextMaskCoreProps {}

const TextMask = React.memo<ITextMaskProps>(({ mask, children, ...props }) => {
  return (
    <Text {...props}>
      <TextMaskCore mask={mask}>{children}</TextMaskCore>
    </Text>
  );
});

export default TextMask;
