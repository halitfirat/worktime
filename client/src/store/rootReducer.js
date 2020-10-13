import { combineReducers } from 'redux';

import worktimeReducer from './worktime/worktimeReducer';

export default combineReducers({
  worktime: worktimeReducer
});
