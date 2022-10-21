import { all } from 'redux-saga/effects';
import Auth from './Auth';
import UsersData from './UsersData';

export default function* rootSaga(getState) {
  yield all([
    Auth(),
    UsersData(),
  ]);
}
