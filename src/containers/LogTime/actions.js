import * as actionTypes from './constants';

export const logTime = (data, taskID) => ({
  type: actionTypes.LOG_TIME,
  payload: {
    data,
    taskID
  }
});