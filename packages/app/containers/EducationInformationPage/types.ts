import {
  LOAD_ITEMS,
  LOAD_ITEMS_SUCCESS,
  LOAD_ITEMS_ERROR,
  LOAD_CHILD_ITEMS,
  LOAD_CHILD_ITEMS_SUCCESS,
  LOAD_CHILD_ITEMS_ERROR,
  SAVE_EDUCATION_INFORMATION,
  SAVE_EDUCATION_INFORMATION_SUCCESS,
  SAVE_EDUCATION_INFORMATION_ERROR,
  LOAD_PARENT_ITEMS,
  LOAD_PARENT_ITEMS_SUCCESS,
  LOAD_PARENT_ITEMS_ERROR,
  DELETE_EDUCATION_INFORMATION_ERROR,
  DELETE_EDUCATION_INFORMATION_SUCCESS,
  DELETE_EDUCATION_INFORMATION,
  SAVE_OTHER_EDUCATION_INFORMATION,
  SAVE_OTHER_EDUCATION_INFORMATION_SUCCESS,
  SAVE_OTHER_EDUCATION_INFORMATION_ERROR,
  loadItems,
  loadParentItems,
  deleteEducationInformation,
  saveEducationInformation,
  saveOtherEducationInformation,
  loadChildItems
} from './ducks';
import { match } from 'react-router';
import { UserType } from '../User/types';
import { teacherEducationTree, studentEducationTree } from './utils';
import { LanguageOption } from '../LanguagePage/types';
import { NavigationStackProp } from 'react-navigation-stack';

interface EducationInformationParams {
  id: string;
}

export interface EducationInformationPageProps {
  items: initialStateItemType;
  loadItems: typeof loadItems;
  loadParentItems: typeof loadParentItems;
  deleteEducationInformation: typeof deleteEducationInformation;
  saveEducationInformation: typeof saveEducationInformation;
  saveOtherEducationInformation: typeof saveOtherEducationInformation;
  loadChildItems: typeof loadChildItems;
  navigation: NavigationStackProp;
  intl: any;
  match: match<EducationInformationParams>;
  userType: UserType;
  language: LanguageOption;
}

export interface ItemsListProps {
  items: initialStateItemType;
  level: number;
  loadChildItems: typeof loadChildItems;
  showAddPress?: () => void;
  onSubmit?: typeof saveOtherEducationInformation;
  userType: UserType;
  intl: any;
  language: LanguageOption;
}

export interface ItemType {
  id: number;
  name: string;
  name_ar: string;
  root: number;
  lvl: number;
  // extra data
  lft: number;
  rgt: number;
  icon: string;
  icon_type: number;
  active: number;
  selected: number;
  disabled: number;
  readonly: number;
  visible: number;
  collapsed: number;
  movable_u: number;
  movable_d: number;
  movable_l: number;
  movable_r: number;
  removable: number;
  removable_all: number;
  child_allowed: number;
}
export interface initialStateItemType {
  data: Array<ItemType>;
  lvl1: Array<ItemType>;
  lvl2: Array<ItemType>;
  lvl3: Array<ItemType>;
  lvl4: Array<ItemType>;
  selectedRoot: number;
  selectedLvl1: number;
  selectedLvl2: number;
  selectedLvl3: number;
  selectedLvl4: number;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  isSubmitting: boolean;
  readyToSubmit: boolean;
  error: string;
}

export interface loadItemsAction {
  type: typeof LOAD_ITEMS;
}

export interface itemsLoadedAction {
  type: typeof LOAD_ITEMS_SUCCESS;
  data: Array<ItemType>;
}

export interface itemLoadingErrorAction {
  type: typeof LOAD_ITEMS_ERROR;
  error: string;
}

export interface loadChildItemsAction {
  type: typeof LOAD_CHILD_ITEMS;
  parent_id: number;
}

export interface childItemsLoadedAction {
  type: typeof LOAD_CHILD_ITEMS_SUCCESS;
  parent_id: number;
  data: Array<ItemType>;
  tree: typeof teacherEducationTree | typeof studentEducationTree;
}

export interface childItemLoadingErrorAction {
  type: typeof LOAD_CHILD_ITEMS_ERROR;
  error: string;
}

export interface loadParentItemsAction {
  type: typeof LOAD_PARENT_ITEMS;
  education_information_id: string;
}

export interface parentItemsLoadedAction {
  type: typeof LOAD_PARENT_ITEMS_SUCCESS;
  data: Array<ItemType>;
}

export interface parentItemLoadingErrorAction {
  type: typeof LOAD_PARENT_ITEMS_ERROR;
  error: string;
}

export interface saveEducationInformationAction {
  type: typeof SAVE_EDUCATION_INFORMATION;
  education_information_id: number | null;
  item_id: number;
}

export interface saveEducationInformationSuccessAction {
  type: typeof SAVE_EDUCATION_INFORMATION_SUCCESS;
  data: any;
}

export interface saveEducationInformationErrorAction {
  type: typeof SAVE_EDUCATION_INFORMATION_ERROR;
  error: string;
}

export interface saveOtherEducationInformationAction {
  type: typeof SAVE_OTHER_EDUCATION_INFORMATION;
  parent_id: number;
  item_name: string;
  action: any;
}

export interface saveOtherEducationInformationSuccessAction {
  type: typeof SAVE_OTHER_EDUCATION_INFORMATION_SUCCESS;
  data: any;
}

export interface saveOtherEducationInformationErrorAction {
  type: typeof SAVE_OTHER_EDUCATION_INFORMATION_ERROR;
  error: string;
}

export interface deleteEducationInformationAction {
  type: typeof DELETE_EDUCATION_INFORMATION;
  education_information_id: number | null;
}

export interface deleteEducationInformationSuccessAction {
  type: typeof DELETE_EDUCATION_INFORMATION_SUCCESS;
  data: any;
}

export interface deleteEducationInformationErrorAction {
  type: typeof DELETE_EDUCATION_INFORMATION_ERROR;
  error: string;
}
// export interface routerActionsAction {
//   type: typeof LOCATION_CHANGE;
// }

export type ItemActionTypes =
  | loadItemsAction
  | itemsLoadedAction
  | itemLoadingErrorAction
  | loadChildItemsAction
  | childItemsLoadedAction
  | childItemLoadingErrorAction
  | loadParentItemsAction
  | parentItemsLoadedAction
  | parentItemLoadingErrorAction
  | saveEducationInformationAction
  | saveEducationInformationSuccessAction
  | saveEducationInformationErrorAction
  | saveOtherEducationInformationAction
  | saveOtherEducationInformationSuccessAction
  | saveOtherEducationInformationErrorAction
  | deleteEducationInformationAction
  | deleteEducationInformationSuccessAction
  | deleteEducationInformationErrorAction;
// | routerActionsAction
