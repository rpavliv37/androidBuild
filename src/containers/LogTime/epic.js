import { Observable } from 'rxjs';
import _ from 'lodash';
import moment from 'moment';
import { combineEpics } from 'redux-observable';
import { handleError } from '../../api_helper';
import * as MainTypes from './constants';
import {
  logTime
} from './actions';
import axiosInstance from '../../axios';
import {decode as atob, encode as btoa} from 'base-64';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

function logTimeEpic($action, $state) {
  return $action.ofType(MainTypes.LOG_TIME)
    .map((action) => action.payload)
    .switchMap((data) => {
      const { signIn: { user_cred } } = $state.getState();
      return Observable.fromPromise(axios({ method: 'POST', url: 'https://redmine.indeema.com/time_entries.json',
        headers: {'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)},
        data: { time_entry: {...data.data} }}))
        // time_entry: {...data}}))
        .catch(handleError)
    })
    .map((result) => {
        result && result.statusText ? showMessage({
        message: 'Success',
        type: 'success'
      }) : showMessage({
        message: "Something went wrong",
        type: "danger"
      })
      return result && result.data ? {type : 'a'} : {type : 'a'}
    });
}

export default combineEpics(
  logTimeEpic
);