import { takeEvery, call, put, all } from 'redux-saga/effects';
import { loginService, getUserService } from '../../services/authService';
import { userLoggedIn } from '../action/authAction';

function* login({ payload }: any): any {
  try {
    const response = yield call(loginService, payload);
    localStorage.setItem('token', response.data.access_token);
  } catch (error) {
    console.log('err ', error);
  }
}

function* getUser(): any {
  try {
    const response: any = yield call(getUserService);
    const { data } = response;
    yield put(userLoggedIn(data))
  } catch (error) {
    console.log('err ', error)
  }
}

function* watchLogin() {
  yield takeEvery('LOGIN', login);
}

function* watchGetUser() {
  yield takeEvery('GET_USER', getUser);
}

export function* authSaga() {
  yield all([watchLogin(), watchGetUser()]);
}
