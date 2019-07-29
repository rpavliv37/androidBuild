import { Observable } from 'rxjs';
import _ from 'lodash';
import { combineEpics } from 'redux-observable';
import { handleError } from '../../api_helper';
import * as MainTypes from './constants';
import {decode as atob, encode as btoa} from 'base-64';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

function restorePasswordEpic($action, $state) {
  return $action.ofType(MainTypes.RESTORE_PASSWORD)
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
      return Observable.fromPromise(axios({ method: 'POST',
        url: 'https://redmine.indeema.com/account/lost_password.json',
        headers: {'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)},
        data: { ...data } })
        )
        .catch(handleError)
    })
    .map((result) => {
      result && result.statusText ? showMessage({
        message: 'An email with instructions to choose a new password has been sent to you.',
        type: "success"
      }) : showMessage({
        message: "Something went wrong",
        type: "danger"
      })
      return result && result.data ? {type : 'a'} : {type : 'a'}
    });
}

export default combineEpics(
  restorePasswordEpic
);