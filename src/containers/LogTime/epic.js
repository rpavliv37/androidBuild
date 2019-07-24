import { Observable } from 'rxjs';
import _ from 'lodash';
import moment from 'moment';
import { combineEpics } from 'redux-observable';
import { handleError } from '../../api_helper';
import * as MainTypes from './constants';
import {
  logTime
} from './actions';
import { addNotification } from '../NotificationGenerator/actions';
import axiosInstance from '../../axios';
import {decode as atob, encode as btoa} from 'base-64';
import axios from 'axios';

function logTimeEpic($action, $state) {
  return $action.ofType(MainTypes.LOG_TIME)
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
    .map((result) => (
      result && result.data ? console.log(result) : console.log(result)
    ));
}

export default combineEpics(
  getProjectMembersEpic,
  createNewTaskEpic
);