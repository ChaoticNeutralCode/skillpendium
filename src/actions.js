export const LOAD_DATA = 'RECEIVE_POSTS';
function dataLoaded(data) {
  return {
    type: LOAD_DATA,
    payload: data
  };
}

export function fetchData() {
  return dispatch => {
    return fetch('/data.json')
      .then(response => response.json())
      .then(json => dispatch(dataLoaded(json)));
  };
};

export const TOGGLE_CATEGORY_FILTER = 'TOGGLE_CATEGORY_FILTER';
export function toggleCategoryFilter(categoryId) {
  return {
    type: TOGGLE_CATEGORY_FILTER,
    payload: categoryId
  };
};

export const UPDATE_TEXT_FILTER = 'UPDATE_TEXT_FILTER';
export function updateTextFilter(text) {
  return {
    type: UPDATE_TEXT_FILTER,
    payload: text
  };
};

export const SET_ID_FILTER = 'SET_ID_FILTER';
export function setIdFilter(ids) {
  return {
    type: SET_ID_FILTER,
    payload: ids
  };
};

export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export function clearFilters() {
  return {
    type: CLEAR_FILTERS
  };
};

export const TOGGLE_SKILL_IN_COLLECTION = 'TOGGLE_SKILL_IN_COLLECTION';
export function toggleSkillInUserCollection(collectionId, skillId) {
  return {
    type: TOGGLE_SKILL_IN_COLLECTION,
    payload: {
      collectionId,
      skillId
    }
  };
};