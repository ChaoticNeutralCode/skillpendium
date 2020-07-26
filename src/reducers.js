import { LOAD_DATA, TOGGLE_CATEGORY_FILTER, UPDATE_TEXT_FILTER, SET_ID_FILTER, CLEAR_FILTERS, TOGGLE_SKILL_IN_COLLECTION } from "./actions";

function loadUserCollections() {
  let userCollections = JSON.parse(localStorage.getItem('collections'));

  if(!userCollections) {
    return [{
      name: 'My Skills',
      ids: new Set()
    }];
  }

  userCollections = userCollections.map(c => ({
    ...c,
    ids: new Set(c.ids)
  }));

  return userCollections;
}

function saveUserCollections(userCollections) {
  localStorage.setItem('collections', JSON.stringify(userCollections.map(c => ({
    ...c,
    ids: [...c.ids]
  }))));
}

const initialState = {
  data: {
    categories: [],
    skills: []
  },
  skills: [],
  clearTextSearch: false,
  filters: {
    categories: new Set(),
    text: '',
    ids: []
  },
  userCollections: loadUserCollections()
};

export default (state = initialState, action) => {
  let newState = {
    ...state,
    skills: [],
    clearTextSearch: false
  };

  let filters = { 
    categories: new Set(state.filters.categories),
    text: state.filters.text,
    ids: [...state.filters.ids]
  };

  switch(action.type) {
    case LOAD_DATA:
      newState.data = action.payload;
      break;
    case TOGGLE_CATEGORY_FILTER:
      const categoryId = action.payload;

      if(filters.categories.has(categoryId)) {
        filters.categories.delete(categoryId);
      } else {
        filters.categories.add(categoryId);
      }
      break;
    case UPDATE_TEXT_FILTER:
      filters.text = action.payload;
      break;
    case SET_ID_FILTER:
      newState.clearTextSearch = true;
      filters = {
        categories: new Set(),
        text: '',
        ids: action.payload
      }

      break;
    case CLEAR_FILTERS:
      newState.clearTextSearch = true;
      filters = {
        categories: new Set(),
        text: '',
        ids: []
      };

      break;
    case TOGGLE_SKILL_IN_COLLECTION:
      let collection = newState.userCollections[action.payload.collectionId];

      if(collection) {
        const skillId = action.payload.skillId;

        if(collection.ids.has(skillId)) {
          collection.ids.delete(skillId);
        } else {
          collection.ids.add(skillId);
        }
        
        saveUserCollections(newState.userCollections);
      }

      break;
    default:
      break;
  }

  if(filters.ids.length || filters.categories.size || filters.text) {

    let skills = [...newState.data.skills];

    if(filters.ids.length) {
      skills = skills.filter(s => filters.ids.includes(s.id));
    }

    if(filters.categories.size) {
      skills = skills.filter(s => {
        return !!s.categories
          .filter(c => {
            return filters.categories.has(c)
          }).length;
      });
    }

    if(filters.text) {
      const textFilter = filters.text;

      skills = skills.filter(s => {
        return s.name.toLowerCase().includes(textFilter) 
          || s.description.toLowerCase().includes(textFilter);
      });
    }

    newState.skills = skills;
  }

  newState.filters = filters;

  return newState;
};