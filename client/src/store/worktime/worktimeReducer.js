import * as worktimeActionTypes from './worktimeActionTypes';

const initialState = {
  worktimeList: [],
  addWorktimeLoading: false,
  getWorktimesLoading: false,
  updateWorktimeLoading: false,
  deleteWorktimeLoading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case worktimeActionTypes.ADD_WORKTIME_BEGINS:
      return {
        ...state,
        addWorktimeLoading: true
      };
    case worktimeActionTypes.ADD_WORKTIME_SUCCESS:
      return {
        ...state,
        worktimeList: [...state.worktimeList, payload],
        addWorktimeLoading: false
      };
    case worktimeActionTypes.ADD_WORKTIME_FAILURE:
      return {
        ...state,
        addWorktimeLoading: false
      };
    case worktimeActionTypes.GET_WORKTIMES_BEGINS:
      return {
        ...state,
        getWorktimesLoading: true
      };
    case worktimeActionTypes.GET_WORKTIMES_SUCCESS:
      return {
        ...state,
        worktimeList: [...state.worktimeList, ...payload],
        getWorktimesLoading: false
      };
    case worktimeActionTypes.GET_WORKTIMES_FAILURE:
      return {
        ...state,
        getWorktimesLoading: false
      };
    case worktimeActionTypes.UPDATE_WORKTIME_BEGINS:
      return {
        ...state,
        updateWorktimeLoading: true
      };
    case worktimeActionTypes.UPDATE_WORKTIME_SUCCESS:
      return {
        ...state,
        worktimeList: state.worktimeList.map((w) =>
          w._id === payload._id ? payload : w
        ),
        updateWorktimeLoading: false
      };
    case worktimeActionTypes.UPDATE_WORKTIME_FAILURE:
      return {
        ...state,
        updateWorktimeLoading: false
      };
    case worktimeActionTypes.DELETE_WORKTIME_BEGINS:
      return {
        ...state,
        deleteWorktimeLoading: true
      };
    case worktimeActionTypes.DELETE_WORKTIME_SUCCESS:
      return {
        ...state,
        worktimeList: state.worktimeList.filter((w) => w._id !== payload),
        deleteWorktimeLoading: false
      };
    case worktimeActionTypes.DELETE_WORKTIME_FAILURE:
      return {
        ...state,
        deleteWorktimeLoading: false
      };
    default:
      return state;
  }
};
