import {takeLatest, put} from 'redux-saga/effects'
import request from 'utils/request'
import {ctx} from '../../../common/global'
import {message} from 'antd'
import { getTopicListsSuccess } from '../../actions/home/index';
import { GET_TOPIC_LIST } from '../../constants/home/index';
function parseRepoDataToList (data) {
  // return Array.prototype.map.call(data, (ele) => ele.full_name)
  return data
}

function * getGithubReps (action) {
  try {
    const data = yield request(`https://api.github.com/users/${action.name}/repos?type=all&sort=updated`)
    yield put(githubRepoLoaded(parseRepoDataToList(data)))
  } catch (err) {
    yield put(githubRepoError(err.message))
    message.error(err.message)
  }
}

function * sagaGetTopicLists(action){
  try{
    const data = yield request(`${ctx}/TopicLists?page=${action.payload.page}`)
    yield put(getTopicListsSuccess(data.data))
  }catch(err){
    message.error(err.message)    
  }
}

export default function * homeSaga () {
  yield takeLatest(GET_TOPIC_LIST, sagaGetTopicLists)
}
