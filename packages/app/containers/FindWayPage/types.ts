import {
  ON_MY_WAY_SUCCESS,
  ON_MY_WAY,
  updateOnMyWay,
  UPDATE_USER_LOCATION,
  UPDATE_USER_LOCATION_SUCCESS,
  UPDATE_USER_LOCATION_ERROR
} from './ducks';
import { HomeTeacherLessonsType } from '../HomeTeacherPage/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface FindWayPageProps {
  lesson: HomeTeacherLessonsType;
  intl: any;
  navigation: NavigationStackProp;
  updateOnMyWay: typeof updateOnMyWay;
}

export interface initialStateFindWayPageType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface updateOnMyWayAction {
  type: typeof ON_MY_WAY;
  recipient_id: number;
  lesson_id: number;
}
export interface updateOnMyWaySuccessAction {
  type: typeof ON_MY_WAY_SUCCESS;
  data: any;
}

export interface updateUserLocationAction {
  type: typeof UPDATE_USER_LOCATION;
  current_latitude: number;
  current_longitude: number;
}
export interface updateUserLocationSuccessAction {
  type: typeof UPDATE_USER_LOCATION_SUCCESS;
  current_latitude: number;
  current_longitude: number;
}
export interface updateUserLocationErrorAction {
  type: typeof UPDATE_USER_LOCATION_ERROR;
  message: string;
}
// export interface updateOnMyWayErrorAction {
//   type: typeof ON_MY_WAY_ERROR;
//   error: string;
// }

export type FindWayPageActionTypes =
  | updateOnMyWayAction
  | updateOnMyWaySuccessAction
  | updateUserLocationAction
  | updateUserLocationSuccessAction
  | updateUserLocationErrorAction;
