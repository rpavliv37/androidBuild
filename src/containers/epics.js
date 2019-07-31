import { combineEpics } from 'redux-observable';
import signInEpic from './SignIn/epic';
import mainEpic from './Main/epic';
import createTaskEpic from './CreateNewTask/epic';
import editTask from './EditTask/epic';
import taskDetailsEpic from './TaskDetails/epic';
import logTimeEpic from './LogTime/epic';

export default combineEpics(
  signInEpic,
  mainEpic,
  createTaskEpic,
  editTask,
  taskDetailsEpic,
  logTimeEpic
);
