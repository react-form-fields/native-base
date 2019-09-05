import variables from 'native-base/src/theme/variables/platform';
import * as React from 'react';

export const ThemeContext = React.createContext<typeof variables>(variables);
