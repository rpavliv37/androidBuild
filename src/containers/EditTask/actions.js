import * as actionTypes from './constants';

export const getProjectMembers = (project_id) => ({
  type: actionTypes.GET_PROJECT_MEMBERS,
  payload: {
    project_id
  }
});

export const saveProjectMembers = (data) => ({
  type: actionTypes.SAVE_PROJECT_MEMBERS,
  payload: {
    data
  }
});

export const editTask = (data) => ({
  type: actionTypes.EDIT_TASK,
  payload: {
    data
  }
});

export const getTaskById = (id) => ({
  type: actionTypes.GET_TASK_BY_ID,
  payload: {
    id
  }
});