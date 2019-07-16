import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

const TouchableEffect = React.memo(
  (props: TouchableOpacityProps & TouchableNativeFeedbackProps & { children?: any }) => {
    if (Platform.OS === 'ios') {
      return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
    }

    return <TouchableNativeFeedback {...props}>{props.children}</TouchableNativeFeedback>;
  }
);

TouchableEffect.displayName = 'TouchableEffect';
export default TouchableEffect;
