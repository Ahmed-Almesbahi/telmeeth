import { createSelector } from 'reselect';
import produce from 'immer';
import { initialStateItemType, ItemActionTypes, ItemType } from './types';
import { teacherEducationTree, studentEducationTree } from './utils';
import Size from 'lodash/size';

/*
 *
 * ItemsPage constants
 *
 */
export const LOAD_ITEMS = 'app/ItemsPage/LOAD_ITEMS';
export const LOAD_ITEMS_SUCCESS = 'app/ItemsPage/LOAD_ITEMS_SUCCESS';
export const LOAD_ITEMS_ERROR = 'app/ItemsPage/LOAD_ITEMS_ERROR';
export const LOAD_CHILD_ITEMS = 'app/ItemsPage/LOAD_CHILD_ITEMS';
export const LOAD_CHILD_ITEMS_SUCCESS =
  'app/ItemsPage/LOAD_CHILD_ITEMS_SUCCESS';
export const LOAD_CHILD_ITEMS_ERROR = 'app/ItemsPage/LOAD_CHILD_ITEMS_ERROR';
export const LOAD_PARENT_ITEMS = 'app/ItemsPage/LOAD_PARENT_ITEMS';
export const LOAD_PARENT_ITEMS_SUCCESS =
  'app/ItemsPage/LOAD_PARENT_ITEMS_SUCCESS';
export const LOAD_PARENT_ITEMS_ERROR = 'app/ItemsPage/LOAD_PARENT_ITEMS_ERROR';
export const SAVE_EDUCATION_INFORMATION =
  'app/ItemsPage/SAVE_EDUCATION_INFORMATION';
export const SAVE_EDUCATION_INFORMATION_SUCCESS =
  'app/ItemsPage/SAVE_EDUCATION_INFORMATION_SUCCESS';
export const SAVE_EDUCATION_INFORMATION_ERROR =
  'app/ItemsPage/SAVE_EDUCATION_INFORMATION_ERROR';
export const SAVE_OTHER_EDUCATION_INFORMATION =
  'app/ItemsPage/SAVE_OTHER_EDUCATION_INFORMATION';
export const SAVE_OTHER_EDUCATION_INFORMATION_SUCCESS =
  'app/ItemsPage/SAVE_OTHER_EDUCATION_INFORMATION_SUCCESS';
export const SAVE_OTHER_EDUCATION_INFORMATION_ERROR =
  'app/ItemsPage/SAVE_OTHER_EDUCATION_INFORMATION_ERROR';
export const DELETE_EDUCATION_INFORMATION =
  'app/ItemsPage/DELETE_EDUCATION_INFORMATION';
export const DELETE_EDUCATION_INFORMATION_SUCCESS =
  'app/ItemsPage/DELETE_EDUCATION_INFORMATION_SUCCESS';
export const DELETE_EDUCATION_INFORMATION_ERROR =
  'app/ItemsPage/DELETE_EDUCATION_INFORMATION_ERROR';

/*
 *
 * ItemsPage reducer
 *
 */

export const initialState: initialStateItemType = {
  data: [],
  lvl1: [],
  lvl2: [],
  lvl3: [],
  lvl4: [],
  selectedRoot: 0,
  selectedLvl1: 0,
  selectedLvl2: 0,
  selectedLvl3: 0,
  selectedLvl4: 0,
  // lvl3: [],
  loading: true,
  error: '',
  loaded: false,
  isSubmitting: false,
  readyToSubmit: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialState,
  action: ItemActionTypes
): initialStateItemType =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ITEMS:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_ITEMS_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_ITEMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOAD_CHILD_ITEMS:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_CHILD_ITEMS_SUCCESS:
        if (action.data.length > 0) {
          switch (action.data[0].lvl) {
            case 1:
              draft.lvl1 = action.data;
              draft.selectedRoot = action.data[0].root;

              //reset
              draft.selectedLvl1 = initialState.selectedLvl1;
              draft.selectedLvl2 = initialState.selectedLvl2;
              draft.selectedLvl3 = initialState.selectedLvl3;
              draft.selectedLvl4 = initialState.selectedLvl4;
              draft.lvl2 = initialState.lvl2;
              draft.lvl3 = initialState.lvl3;
              draft.lvl4 = initialState.lvl4;
              break;
            case 2:
              draft.lvl2 = action.data;
              draft.selectedRoot = action.data[0].root;
              draft.selectedLvl1 = action.parent_id;

              //reset
              draft.selectedLvl2 = initialState.selectedLvl2;
              draft.selectedLvl3 = initialState.selectedLvl3;
              draft.selectedLvl4 = initialState.selectedLvl4;
              draft.lvl3 = initialState.lvl3;
              draft.lvl4 = initialState.lvl4;

              // @ts-ignore
              if (1 === Size(action.tree[action.data[0].root])) {
                draft.readyToSubmit = true;
              }
              break;

            case 3:
              draft.lvl3 = action.data;
              draft.selectedRoot = action.data[0].root;
              draft.selectedLvl2 = action.parent_id;

              //reset
              draft.selectedLvl3 = initialState.selectedLvl3;
              draft.selectedLvl4 = initialState.selectedLvl4;
              draft.lvl4 = initialState.lvl4;

              // @ts-ignore
              if (2 === Size(action.tree[action.data[0].root])) {
                draft.readyToSubmit = true;
              }
              break;

            case 4:
              draft.lvl4 = action.data;
              draft.selectedRoot = action.data[0].root;
              draft.selectedLvl3 = action.parent_id;

              //reset
              draft.selectedLvl4 = initialState.selectedLvl4;

              // @ts-ignore
              if (3 === Size(action.tree[action.data[0].root])) {
                draft.readyToSubmit = true;
              }
              break;
          }
        } else {
          if (state.selectedLvl2 === 0) {
            draft.selectedLvl2 = action.parent_id;
            draft.readyToSubmit = true;
          } else if (state.selectedLvl3 === 0) {
            draft.selectedLvl3 = action.parent_id;
            draft.readyToSubmit = true;
          } else if (state.selectedLvl4 === 0) {
            draft.selectedLvl4 = action.parent_id;
            draft.readyToSubmit = true;
          }
        }
        //
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_CHILD_ITEMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_PARENT_ITEMS:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_PARENT_ITEMS_SUCCESS:
        if (action.data.length > 0) {
          action.data.map(d => {
            switch (d.lvl) {
              case 1:
                draft.lvl1.push(d);
                draft.selectedRoot = d.root;
                draft.selectedLvl1 = d.id; // special

                break;
              case 2:
                draft.lvl2.push(d);
                draft.selectedRoot = d.root;
                draft.selectedLvl2 = d.id; // special

                break;

              case 3:
                draft.lvl3.push(d);
                draft.selectedRoot = d.root;
                draft.selectedLvl3 = d.id; // special

                break;

              case 4:
                draft.lvl4.push(d);
                draft.selectedRoot = d.root;
                draft.selectedLvl4 = d.id; // special

                break;
            }
          });
        }
        draft.readyToSubmit = true;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_PARENT_ITEMS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SAVE_EDUCATION_INFORMATION:
        draft.loading = true;
        draft.isSubmitting = true;
        draft.readyToSubmit = false;
        draft.error = '';
        break;

      case SAVE_EDUCATION_INFORMATION_SUCCESS:
        // draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        draft.isSubmitting = false;
        draft.readyToSubmit = true;
        break;

      case SAVE_EDUCATION_INFORMATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.isSubmitting = false;
        draft.readyToSubmit = true;
        break;

      case SAVE_OTHER_EDUCATION_INFORMATION:
        draft.loading = true;
        draft.isSubmitting = true;
        // draft.readyToSubmit = false;
        draft.error = '';
        break;

      case SAVE_OTHER_EDUCATION_INFORMATION_SUCCESS:
        switch (action.data.lvl) {
          case 1:
            draft.lvl1.push(action.data);
            draft.selectedLvl1 = action.data.id;
            break;

          case 2:
            draft.lvl2.push(action.data);
            draft.selectedLvl2 = action.data.id;
            break;

          case 3:
            draft.lvl3.push(action.data);
            draft.selectedLvl3 = action.data.id;
            break;

          case 4:
            draft.lvl4.push(action.data);
            draft.selectedLvl4 = action.data.id;
            break;
        }
        draft.loading = false;
        draft.loaded = true;
        draft.isSubmitting = false;
        // draft.readyToSubmit = true;
        break;

      case SAVE_OTHER_EDUCATION_INFORMATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.isSubmitting = false;
        draft.readyToSubmit = true;
        break;

      case DELETE_EDUCATION_INFORMATION:
        draft.loading = true;
        draft.isSubmitting = true;
        draft.readyToSubmit = false;
        draft.error = '';
        break;

      case DELETE_EDUCATION_INFORMATION_SUCCESS:
        // draft.data.splice(
        //   draft.data.findIndex(
        //     notification =>
        //       notification.notification_id === action.notification_id
        //   ),
        //   1
        // );
        draft.loading = false;
        draft.loaded = true;
        draft.isSubmitting = false;
        draft.readyToSubmit = true;
        break;

      case DELETE_EDUCATION_INFORMATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.isSubmitting = false;
        draft.readyToSubmit = true;
        break;

      // TODO: need to check this
      // case LOCATION_CHANGE:
      //   return initialState;
      //   break;
    }
  });

/**
 * Direct selector to the ItemPage state domain
 */

const selectItemsPageDomain = (state: any) => state.items || initialState;

/**
 * Default selector used by ItemsPage
 */

export const makeSelectItems = () =>
  createSelector(
    selectItemsPageDomain,
    substate => substate
  );

/**
 * Load the items, this action starts the request saga
 * @return {object} An action object with a type of LOAD_ITEMS
 */
export function loadItems(): ItemActionTypes {
  return {
    type: LOAD_ITEMS
  };
}

/**
 * Dispatched when the items are loaded by the request saga
 *
 * @param  {array} repos The item data
 *
 * @return {object}      An action object with a type of LOAD_ITEMS_SUCCESS passing the repos
 */
export function itemsLoaded(data: Array<ItemType>): ItemActionTypes {
  return {
    type: LOAD_ITEMS_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the item fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ITEMS_ERROR passing the error
 */
export function itemLoadingError(error: string): ItemActionTypes {
  return {
    type: LOAD_ITEMS_ERROR,
    error
  };
}

/**
 * Load Child items, this action starts the request saga
 * @param  {number} parent_id The parent item id
 * @return {object} An action object with a type of LOAD_CHILD_ITEMS
 */
export function loadChildItems(parent_id: number): ItemActionTypes {
  return {
    type: LOAD_CHILD_ITEMS,
    parent_id
  };
}

/**
 * Dispatched when child items are loaded by the request saga
 *
 * @param  {number} parent_id The item data
 * @param  {array} data The item data
 * @param  {object} tree The item data
 *
 * @return {object}      An action object with a type of LOAD_ITEMS_SUCCESS passing the repos
 */
export function childItemsLoaded(
  parent_id: number,
  data: Array<ItemType>,
  tree: typeof teacherEducationTree | typeof studentEducationTree
): ItemActionTypes {
  return {
    type: LOAD_CHILD_ITEMS_SUCCESS,
    parent_id,
    data,
    tree
  };
}

/**
 * Dispatched when loading child items fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_CHILD_ITEMS_ERROR passing the error
 */
export function childItemLoadingError(error: string): ItemActionTypes {
  return {
    type: LOAD_CHILD_ITEMS_ERROR,
    error
  };
}

/**
 * Load Parent items, this action starts the request saga
 * @param  {string} education_information_id The current education_information_id
 * @return {object} An action object with a type of LOAD_PARENT_ITEMS
 */
export function loadParentItems(
  education_information_id: string
): ItemActionTypes {
  return {
    type: LOAD_PARENT_ITEMS,
    education_information_id
  };
}

/**
 * Dispatched when parent items are loaded by the request saga
 *
 * @param  {array} data The item data
 *
 * @return {object}      An action object with a type of LOAD_PARENT_ITEMS_SUCCESS passing the repos
 */
export function parentItemsLoaded(data: Array<ItemType>): ItemActionTypes {
  return {
    type: LOAD_PARENT_ITEMS_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading parent items fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_PARENT_ITEMS_ERROR passing the error
 */
export function parentItemLoadingError(error: string): ItemActionTypes {
  return {
    type: LOAD_PARENT_ITEMS_ERROR,
    error
  };
}

/**
 * Save education information, this action starts the request saga
 * @param  {number} education_information_id the data to save
 * @param  {number} item_id the data to save
 * @return {object} An action object with a type of SAVE_EDUCATION_INFORMATION
 */
export function saveEducationInformation(
  education_information_id: number,
  item_id: number
): ItemActionTypes {
  return {
    type: SAVE_EDUCATION_INFORMATION,
    education_information_id,
    item_id
  };
}

/**
 * Dispatched when saving education done by the request saga
 *
 * @param  {array} data The item data
 *
 * @return {object}      An action object with a type of SAVE_EDUCATION_INFORMATION_SUCCESS passing the repos
 */
export function saveEducationInformationSuccess(data: any): ItemActionTypes {
  return {
    type: SAVE_EDUCATION_INFORMATION_SUCCESS,
    data
  };
}

/**
 * Dispatched when saving education information fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of SAVE_EDUCATION_INFORMATION_ERROR passing the error
 */
export function saveEducationInformationError(error: string): ItemActionTypes {
  return {
    type: SAVE_EDUCATION_INFORMATION_ERROR,
    error
  };
}

/**
 * Save other education information, this action starts the request saga
 * @param  {number} parent_id the data to save
 * @param  {string} item_name the data to save
 * @return {object} An action object with a type of SAVE_OTHER_EDUCATION_INFORMATION
 */
export function saveOtherEducationInformation(
  parent_id: number,
  item_name: string,
  action: any
): ItemActionTypes {
  return {
    type: SAVE_OTHER_EDUCATION_INFORMATION,
    parent_id,
    item_name,
    action
  };
}

/**
 * Dispatched when saving education done by the request saga
 *
 * @param  {array} data The item data
 *
 * @return {object}      An action object with a type of SAVE_OTHER_EDUCATION_INFORMATION_SUCCESS passing the repos
 */
export function saveOtherEducationInformationSuccess(
  data: any
): ItemActionTypes {
  return {
    type: SAVE_OTHER_EDUCATION_INFORMATION_SUCCESS,
    data
  };
}

/**
 * Dispatched when saving education information fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of SAVE_OTHER_EDUCATION_INFORMATION_ERROR passing the error
 */
export function saveOtherEducationInformationError(
  error: string
): ItemActionTypes {
  return {
    type: SAVE_OTHER_EDUCATION_INFORMATION_ERROR,
    error
  };
}

/**
 * Delete education information, this action starts the request saga
 * @param  {number} education_information_id the data to save
 * @return {object} An action object with a type of DELETE_EDUCATION_INFORMATION
 */
export function deleteEducationInformation(
  education_information_id: number
): ItemActionTypes {
  return {
    type: DELETE_EDUCATION_INFORMATION,
    education_information_id
  };
}

/**
 * Dispatched when seleting education done by the request saga
 *
 * @param  {array} data The item data
 *
 * @return {object}      An action object with a type of DELETE_EDUCATION_INFORMATION_SUCCESS passing the repos
 */
export function deleteEducationInformationSuccess(data: any): ItemActionTypes {
  return {
    type: DELETE_EDUCATION_INFORMATION_SUCCESS,
    data
  };
}

/**
 * Dispatched when seleting education information fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of DELETE_EDUCATION_INFORMATION_ERROR passing the error
 */
export function deleteEducationInformationError(
  error: string
): ItemActionTypes {
  return {
    type: DELETE_EDUCATION_INFORMATION_ERROR,
    error
  };
}
