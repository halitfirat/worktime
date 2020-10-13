import axios from 'axios';
import { toast } from 'react-toastify';

import * as worktimeActionTypes from './worktimeActionTypes';

export const addWorktime = (worktimeData, close) => async (dispatch) => {
  try {
    dispatch({ type: worktimeActionTypes.ADD_WORKTIME_BEGINS });

    const res = await axios.post('/api/worktimes', worktimeData);
    dispatch({
      type: worktimeActionTypes.ADD_WORKTIME_SUCCESS,
      payload: res.data
    });

    close();
    toast.success('Worktime added successfully!');
  } catch (error) {
    console.log(error);

    dispatch({ type: worktimeActionTypes.ADD_WORKTIME_FAILURE });
    toast.error(error.message);
    throw error;
  }
};

export const getWorktimes = () => async (dispatch) => {
  try {
    dispatch({ type: worktimeActionTypes.GET_WORKTIMES_BEGINS });

    const res = await axios.get('/api/worktimes');
    dispatch({
      type: worktimeActionTypes.GET_WORKTIMES_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);

    dispatch({ type: worktimeActionTypes.GET_WORKTIMES_FAILURE });
    toast.error(error.message);
    throw error;
  }
};

export const updateWorktime = (worktimeData, close) => async (dispatch) => {
  try {
    dispatch({ type: worktimeActionTypes.UPDATE_WORKTIME_BEGINS });

    const res = await axios.put('/api/worktimes', worktimeData);
    dispatch({
      type: worktimeActionTypes.UPDATE_WORKTIME_SUCCESS,
      payload: res.data
    });
    close();
    toast.success('Worktime updated successfully!');
  } catch (error) {
    console.log(error);

    dispatch({ type: worktimeActionTypes.UPDATE_WORKTIME_FAILURE });
    toast.error(error.message);
    throw error;
  }
};

export const deleteWorktime = (id, close) => async (dispatch) => {
  try {
    dispatch({ type: worktimeActionTypes.DELETE_WORKTIME_BEGINS });

    const res = await axios.delete(`/api/worktimes/${id}`);
    dispatch({
      type: worktimeActionTypes.DELETE_WORKTIME_SUCCESS,
      payload: res.data
    });
    close();
    toast.success('Worktime successfully deleted!');
  } catch (error) {
    console.log(error);

    dispatch({ type: worktimeActionTypes.DELETE_WORKTIME_FAILURE });
    toast.error(error.message);
    throw error;
  }
};
