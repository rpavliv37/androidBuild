import * as actionTypes from './constants';

export const logTime = (data) => ({
  type: actionTypes.LOG_TIME,
  payload: {
    data
  }
});