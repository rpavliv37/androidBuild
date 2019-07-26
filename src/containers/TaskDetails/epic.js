import { Observable } from 'rxjs';
import _ from 'lodash';
import moment from 'moment';
import { combineEpics } from 'redux-observable';
import { handleError } from '../../api_helper';
import * as MainTypes from './constants';
import {
  saveListOfTasks, saveTodaySpentTime, saveMyProjects, saveAllListOfTasks
} from './actions';
import axiosInstance from '../../axios';
import axios from 'axios';
import {decode as atob, encode as btoa} from 'base-64'
import { showMessage } from 'react-native-flash-message';

function watchTaskEpic($action, $state) {
  return $action.ofType(MainTypes.WATCH_TASK)
    .map((action) => action.payload)
    .switchMap(() => {
      const { signIn: { user_cred, data: { user: { id: userId } } }, main: { selected_task: { id } } } = $state.getState();
      return Observable.fromPromise(axios({ method: 'POST', url: `https://redmine.indeema.com/issues/${id}/watchers.json`, headers: {'Authorization': 'Basic ' + btoa(user_cred.username + ':' + user_cred.password)},
        user_id: userId
  })
        )
        .catch(handleError)
    })
    .map((result) => {
      result && console.log('result', result);
      result && result.statusText ? showMessage({
        message: 'You was added as watcher to this task',
        type: 'success'
      }) : showMessage({
        message: "Something went wrong",
        type: "danger"
      })
      return result && result.data ? {type : 'a'} : {type : 'a'}
    });
}

export default combineEpics(
  watchTaskEpic
);