import { Observable } from 'rxjs';
import _ from 'lodash';
import moment from 'moment';
import { combineEpics } from 'redux-observable';
import { handleError } from '../../api_helper';
import * as MainTypes from './constants';
import {
  saveProjectMembers
} from './actions';
import axiosInstance from '../../axios';
import {decode as atob, encode as btoa} from 'base-64';
import axios from 'axios';
import { showMessage, hideMessage } from 'react-native-flash-message';

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
      console.log('objResponse!!!', objResponse);

      return Observable.fromPromise(axiosInstance.get(`/projects/${project_id.project_id}/memberships.json`, objResponse))
        .catch(handleError)
    })
    .map((result) => {
    return result && result.data ? saveProjectMembers(result.data) : saveProjectMembers(result.data)
    });
}

function createNewTaskEpic($action, $state) {
  return $action.ofType(MainTypes.CREATE_NEW_TASK)
    .map((action) => action.payload)
    .switchMap((data) => {
      const { signIn: { user_cred } } = $state.getState();
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
      console.log('objResponse', objResponse);
      return Observable.fromPromise(axios({ method: 'POST', url: 'https://redmine.indeema.com/issues.json', headers: {'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)},
      data: { issue: {
        ...data.data
      } } })
        )
        .catch(handleError)
    })
    .map((result) => {
      result && console.log('result', result);
      result && result.statusText ? showMessage({
        message: result.statusText,
        type: "success"
      }) : showMessage({
        message: "Something went wrong",
        type: "danger"
      })
      return result && result.data ? {type : 'a'} : {type : 'a'}
    });
}

export default combineEpics(
  getProjectMembersEpic,
  createNewTaskEpic
);