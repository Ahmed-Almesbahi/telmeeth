import { LanguageOption } from '../../containers/LanguagePage/types';

export interface SelectPickerOptions {
  value: number | string;
  label: string;
  description?: string;
}

export interface SelectPickerProps {
  label: any;
  placeholder: string;
  onSelect: (picked: number | string) => void;
  selected: number | string;
  showFilter?: boolean;
  showAdd?: boolean;
  showAddPress?: () => void;
  options: Array<SelectPickerOptions>;
  showAddContent?: any;
  style?: any;
  mode?: any;
}

export interface ModalPickerProps {
  options: Array<SelectPickerOptions>;
  onSelect: (value: string) => void;
  onCancel: () => void;
  placeholderText?: string;
  placeholderTextColor?: string;
  androidUnderlineColor?: string;
  cancelButtonText?: string;
  title?: string;
  noResultsText?: string;
  visible?: boolean;
  showFilter?: boolean;
  modal?: object;
  selectedOption?: string;
  renderOption?: (rowData: any, t: any) => void;
  // renderCancelButton: () => void,
  renderList?: () => void;
  listViewProps?: object;
  filterTextInputContainerStyle?: any;
  filterTextInputStyle?: any;
  cancelContainerStyle?: any;
  cancelButtonStyle?: any;
  cancelButtonTextStyle?: any;
  titleTextStyle?: any;
  overlayStyle?: any;
  listContainerStyle?: any;
  optionTextStyle?: any;
  selectedOptionTextStyle?: any;
  keyboardShouldPersistTaps?: string;

  showAdd?: boolean;
  showAddPress?: () => void;

  autoFocus: any;
  showAddContent: any;
  children?: React.ReactNode;

  intl: any;
  language: LanguageOption;
}
