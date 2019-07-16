import variables from 'native-base/src/theme/variables/platform';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ThemeContext } from './context';

const ThemeProvider = React.memo((props: { children: any }, context: any) => {
  const contextValue = React.useMemo(() => {
    return context.theme ? context.theme['@@shoutem.theme/themeStyle'].variables : variables;
  }, [context.theme]);

  return <ThemeContext.Provider value={contextValue}>{props.children}</ThemeContext.Provider>;
});

(ThemeProvider as any).contextTypes = {
  theme: PropTypes.object
};

(ThemeProvider as any).childContextTypes = {
  theme: PropTypes.object
};

export default ThemeProvider as any;
