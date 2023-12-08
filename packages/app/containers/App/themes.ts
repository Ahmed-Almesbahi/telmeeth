import { DefaultTheme, configureFonts } from 'react-native-paper';
import { FONT } from '../../utils/constants';

const fontConfig: any = {
  medium: { fontFamily: FONT, fontWeight: '300' as '300' },
  regular: { fontFamily: FONT, fontWeight: '300' as '300' },
  light: { fontFamily: FONT, fontWeight: '300' as '300' },
  thin: { fontFamily: FONT, fontWeight: '100' as '100' }
};

const themeTeacher = {
  ...DefaultTheme,
  dark: false,
  roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6fda44',
    accent: '#6fda44',
    placeholder: 'gray'
  },
  fonts: fontConfig
};
const themeStudent = {
  ...DefaultTheme,
  roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff3366',
    accent: '#ff3366',
    placeholder: 'gray'
  },
  fonts: fontConfig
};

export { themeStudent, themeTeacher };
