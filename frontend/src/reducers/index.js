import {
  NEW_PERSONNEL_ENTRY,
  PERSONNEL_LIST,
  UPDATE_PERSONNEL_ENTRY,
  DELETE_PERSONNEL_ENTRY,
  PERSONNEL_LIST_BY_ID,
  PERSONNEL_SUPERIOR_BY_ID
} from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case NEW_PERSONNEL_ENTRY:
      return { ...state, directory: action.payload };
    case PERSONNEL_LIST:
      return { ...state, directory: action.payload };
    case PERSONNEL_LIST_BY_ID:
      return { ...state, directory: action.payload };
    case UPDATE_PERSONNEL_ENTRY:
      return { ...state, directory: action.payload };
    case DELETE_PERSONNEL_ENTRY:
      return { ...state, directory: action.payload };
    case PERSONNEL_SUPERIOR_BY_ID:
      return { ...state, directory: action.payload };
    default:
      return state;
  }
}