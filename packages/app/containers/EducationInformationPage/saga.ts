import { fork, take, call, put, select } from 'redux-saga/effects';
import {
  LOAD_ITEMS,
  itemsLoaded,
  itemLoadingError,
  LOAD_CHILD_ITEMS,
  childItemsLoaded,
  childItemLoadingError,
  SAVE_EDUCATION_INFORMATION,
  saveEducationInformationSuccess,
  saveEducationInformationError,
  LOAD_PARENT_ITEMS,
  parentItemsLoaded,
  parentItemLoadingError,
  deleteEducationInformationError,
  deleteEducationInformationSuccess,
  DELETE_EDUCATION_INFORMATION,
  SAVE_OTHER_EDUCATION_INFORMATION,
  saveOtherEducationInformationSuccess,
  saveOtherEducationInformationError,
  makeSelectItems
} from './ducks';
import API from '../../utils/api';
import {
  ROUTE_TEACHING_INFORMATION,
  ROUTE_EDUCATION_INFORMATION
} from '../../Router';
import { makeSelectUserType } from '../User/ducks';
import { TEACHER_TYPE } from '../../utils/constants';
import { teacherEducationTree, studentEducationTree } from './utils';
import * as NavigationService from '../../NavigationService';
import { showSnackbar } from '../Snackbar/ducks';
import { validateSettings } from '../DrawerPage/ducks';
import { loadTeachingInformations } from '../TeachingInformationPage/ducks';

/**
 * Load items saga
 */
export function* loadItemsSaga() {
  while (true) {
    yield take(LOAD_ITEMS);
    try {
      const response = yield call(API.getRootItems);
      if (response && response.status === true) {
        yield put(itemsLoaded(response.data));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(itemLoadingError(error.message));
    }
  }
}

/**
 * Load Child items saga
 */
export function* loadChildItemsSaga() {
  while (true) {
    const { parent_id } = yield take(LOAD_CHILD_ITEMS);
    try {
      const response = yield call(API.getChildItems, parent_id);
      if (response && response.status === true) {
        // We need to pass the tree to action then to reducer
        // We did this cause we want to know the number of each tree to help us enable submit button when all are selected
        const userType = yield select(makeSelectUserType());
        const tree =
          userType === TEACHER_TYPE
            ? teacherEducationTree
            : studentEducationTree;
        yield put(childItemsLoaded(parent_id, response.data, tree));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(childItemLoadingError(error.message));
    }
  }
}

/**
 * Load Parent items with current saga
 */
export function* loadParentItemsSaga() {
  while (true) {
    const { education_information_id } = yield take(LOAD_PARENT_ITEMS);
    try {
      const response = yield call(
        API.getNewEducationInfo,
        education_information_id
      );
      if (response && response.status === true) {
        yield put(parentItemsLoaded(response.data));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(parentItemLoadingError(error.message));
    }
  }
}

/**
 * Save education information saga
 */
export function* saveEducationInformationSage() {
  while (true) {
    const { education_information_id, item_id } = yield take(
      SAVE_EDUCATION_INFORMATION
    );
    try {
      const userType = yield select(makeSelectUserType());
      const response =
        userType === TEACHER_TYPE
          ? yield call(
              API.setNewEducationInfo,
              education_information_id,
              item_id
            )
          : yield call(API.setStudentPersonalInfo, {
              force_save: true,
              education_information_id,
              item_id
            });

      //
      if (response && response.status === true) {
        yield put(saveEducationInformationSuccess(response.data));
        yield put(validateSettings());
        yield put(loadTeachingInformations(0));
        NavigationService.navigate('TeachingInformation');
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(saveEducationInformationError(error.message));
    }
  }
}

/**
 * Save other new education information saga
 */
export function* saveOtherNewEducationInformationSage() {
  while (true) {
    const { parent_id, item_name, action } = yield take(
      SAVE_OTHER_EDUCATION_INFORMATION
    );
    try {
      const response = yield call(
        API.setOtherNewEducation,
        parent_id,
        item_name
      );
      if (response && response.status === true) {
        yield put(saveOtherEducationInformationSuccess(response.data));

        yield call(action.setSubmitting, false);
      }
    } catch (error) {
      yield call(action.setErrors, { item_name: error.message });
      yield call(action.setSubmitting, false);
      yield put(saveOtherEducationInformationError(error.message));
      yield put(showSnackbar(error.message));
    }
  }
}

/**
 * Delete education information saga
 */
export function* deleteEducationInformationSage() {
  while (true) {
    const { education_information_id } = yield take(
      DELETE_EDUCATION_INFORMATION
    );
    try {
      const response = yield call(
        API.deleteEducationInfo,
        education_information_id
      );
      if (response && response.status === true) {
        yield put(deleteEducationInformationSuccess(response.data));
        NavigationService.navigate('TeachingInformation');
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(deleteEducationInformationError(error.message));
    }
  }
}

export default function* itemSaga() {
  yield fork(loadItemsSaga);
  yield fork(loadChildItemsSaga);
  yield fork(loadParentItemsSaga);
  yield fork(saveEducationInformationSage);
  yield fork(saveOtherNewEducationInformationSage);
  yield fork(deleteEducationInformationSage);
}
