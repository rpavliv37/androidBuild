import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { serialize, handleError } from './../../api_helper';
import * as SignInTypes from './constants';

import {
  receiveSignIn,
  cancelSignIn,
  logOut
} from './actions';
import { addNotification } from '../NotificationGenerator/actions';
import axiosInstance from '../../axios';
import {decode as atob, encode as btoa} from 'base-64';
import { showMessage, hideMessage } from 'react-native-flash-message';


function signInEpic($action, $state) {
  return $action.ofType(SignInTypes.SIGN_IN)
    .map((action) => action.payload)
    .switchMap(({ navigate }) => {
      const { signIn: { user_cred } } = $state.getState();
      return Observable.fromPromise(axiosInstance.get(`/users/current.json`, {
        headers: {
          'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)
        }
      }))
        .catch(handleError)
        .map((result) => {
          result && result.data && navigate('Main')
          result && result.data ? showMessage({
            message: "You are signed in",
            type: "success",
          }) : showMessage({
            message: "Invalid login or password",
            type: "danger",
          })
          return result && result.data ? receiveSignIn(result.data) : cancelSignIn(result)
        })
    })
}

// function logoutEpic(action$) {
//   return action$.ofType(SignInTypes.USER_LOGOUT).switchMap(() => Observable.of(
//     addNotification({
//       type: 'success',
//       text: i18n.t('youAreOut')
//     })
//   ));
// }

export default combineEpics(
  signInEpic
);
