import { Observable } from 'rxjs';
import _ from 'lodash';
import { combineEpics } from 'redux-observable';
import { handleError } from '../../api_helper';
import * as MainTypes from './constants';
import { saveProjectMembers, getTaskById } from './actions';
import { getAllListOfTasks, getSelectedTask } from '../Main/actions'
import axiosInstance from '../../axios';
import {decode as atob, encode as btoa} from 'base-64';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

function getProjectMembersEpic($action, $state) {
  return $action.ofType(MainTypes.GET_PROJECT_MEMBERS)
    .map((action) => action.payload)
    .switchMap((project_id) => {
      const { signIn: { user_cred } } = $state.getState();
      const objResponse = {
        headers: {
          'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)
        }
      };

      return Observable.fromPromise(axiosInstance.get(`/projects/${project_id.project_id}/memberships.json`, objResponse))
        .catch(handleError)
    })
    .map((result) => {
    return result && result.data ? saveProjectMembers(result.data) : saveProjectMembers(result.data)
    });
}

function EditTaskEpic($action, $state) {
  return $action.ofType(MainTypes.EDIT_TASK)
    .map((action) => action.payload)
    .switchMap((data) => {
      const { signIn: { user_cred } } = $state.getState();
      const { main: { selected_task: { id } } } = $state.getState();
      const objResponse = {
        headers: {
          'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)
        },
        params: {
          issue: {
            ...data.data
          }
        }
      };
      return Observable.fromPromise(axios({ method: 'PUT',
        url: `https://redmine.indeema.com/issues/${id}.json`,
        headers: {'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)},
        data: { issue: {...data.data} } })
        )
        .catch(handleError)
    })
    .map((result) => {
      const { main: { selected_task: { id } } } = $state.getState();
      console.log('id', id);
      result && result.statusText ? showMessage({
        message: 'Task was saved!',
        type: "success"
      }) : showMessage({
        message: "Something went wrong",
        type: "danger"
      })
      return result ? getTaskById(id) : {type : 'a'}
    });
}

function getTaskByIdEpic($action, $state) {
  return $action.ofType(MainTypes.GET_TASK_BY_ID)
    .map((action) => action.payload)
    .switchMap((id) => {
      const { signIn: { user_cred } } = $state.getState();
      const objResponse = {
        headers: {
          'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)
        }
      };

      return Observable.fromPromise(axiosInstance.get(`/issues/${id.id}.json?include=attachments`, objResponse))
        .catch(handleError)
    })
    .map((result) => {
    return result && result.data ? getSelectedTask(result.data.issue) : {type : 'a'}
    });
}

export default combineEpics(
  getProjectMembersEpic,
  EditTaskEpic,
  getTaskByIdEpic
);