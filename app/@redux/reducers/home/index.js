import { fromJS,List } from 'immutable';
import { GET_TOPIC_LIST, GET_TOPIC_LIST_SUCCESS } from '../../constants/home/index';

const initialState = fromJS({
  topic_lists:[],
  loading: false,
  error: false
})
function homeReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TOPIC_LIST:
      return state
    case GET_TOPIC_LIST_SUCCESS:
      return state.set('topic_lists',fromJS(action.payload.data))
    default:
      return state
  }
}
export default homeReducer
