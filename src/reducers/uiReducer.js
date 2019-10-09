import { TOGGLE_SIDEBAR, SHOW_SIDEBAR, CLOSE_SIDEBAR } from '../actions/types';

const initialState = {
  isSidebarOpened: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: !state.isSidebarOpened
      };
    case SHOW_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: true
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: false
      };
    default:
      return state;
  }
}
