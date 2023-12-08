import { setDeviceDetailOption } from '../DeviceDetail/ducks';
import { UserType, initialStateUserType } from '../User/types';
import { LanguageOption } from '../LanguagePage/types';
import { showSnackbar } from '../Snackbar/ducks';

export interface AppProps {
  // setDeviceDetailOption: typeof setDeviceDetailOption;
  type: UserType;
  language: LanguageOption;
  user: initialStateUserType;
  // showSnackbar: typeof showSnackbar;
}
