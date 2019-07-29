import * as actionTypes from './constants';

export const restorePassword = (data) => ({
  type: actionTypes.RESTORE_PASSWORD,
  payload: {
    data
  }
});