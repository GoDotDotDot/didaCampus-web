import { GET_TOPIC_LIST, GET_TOPIC_LIST_SUCCESS } from "../../constants/home/index";


export function getTopicLists(page){
  return {
    type: GET_TOPIC_LIST,
    payload:{
      page
    }
  }
}
export function getTopicListsSuccess(data){
  return {
    type: GET_TOPIC_LIST_SUCCESS,
    payload:{
      data
    }
  }
}
