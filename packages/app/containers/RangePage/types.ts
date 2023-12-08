import {
  LOAD_RANGE_ERROR,
  LOAD_RANGE_SUCCESS,
  LOAD_RANGE,
  loadRange,
  UPDATE_RANGE,
  UPDATE_RANGE_SUCCESS,
  UPDATE_RANGE_ERROR,
  updateRange,
  UPDATE_RANGE_OPTION
} from './ducks';
import { LanguageOption } from '../LanguagePage/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface RangePageProps {
  language: LanguageOption;
  range: initialStateRangePageType;
  loadRange: typeof loadRange;
  updateRange: typeof updateRange;
  navigation: NavigationStackProp;
}

export interface RangeDataType {
  user_location_id?: number;
  user_id?: number;
  address: string;
  country_name: string;
  city: string;
  postal_code: number;
  latitude: number;
  longitude: number;
  user_km_range: number;
  gender?: string;
}

export interface initialStateRangePageType {
  data: RangeDataType;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadRangeAction {
  type: typeof LOAD_RANGE;
}
export interface loadRangeSuccessAction {
  type: typeof LOAD_RANGE_SUCCESS;
  data: RangeDataType;
}
export interface loadRangeErrorAction {
  type: typeof LOAD_RANGE_ERROR;
  error: string;
}

export interface updateRangeAction {
  type: typeof UPDATE_RANGE;
  user_km_range: number;
}
export interface updateRangeSuccessAction {
  type: typeof UPDATE_RANGE_SUCCESS;
}
export interface updateRangeErrorAction {
  type: typeof UPDATE_RANGE_ERROR;
  error: string;
}

export type RangePageActionTypes =
  | loadRangeAction
  | loadRangeSuccessAction
  | loadRangeErrorAction
  | updateRangeAction
  | updateRangeSuccessAction
  | updateRangeErrorAction;
