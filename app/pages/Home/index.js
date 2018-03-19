import React, { Component } from "react";
import BaseComponent from '../../components/HOCImutable'
import { is } from "immutable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { FormattedMessage } from "react-intl";
import messages from "messages/home";
import { createStructuredSelector } from "reselect";
import { searchUsersGithubRepo, changeUsername } from "@redux/actions/home";
import homeReducer from "@redux/reducers/home";
import saga from "@redux/sagas/home";
import { makeSelectTopicLists, makeSelectError } from "@redux/selectors/home";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import { Input, Button, List, Spin, Icon } from "antd";
import pathToRegexp from 'path-to-regexp'
import "./styles/index.scss";
import { TYPES } from "common/nav";
import { Link, NavLink } from "react-router-dom";

// Components
import TopicListItem from "../../components/TopicListItem";
import { getTopicLists } from "../../@redux/actions/home/index";
import toJS from '../../components/ToJS'
import { makeSelectRoute } from "../../@redux/selectors/home";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const reg = pathToRegexp('/index/:id')

class HomePage extends BaseComponent {

  componentDidUpdate() {
    console.log("home did update");
  }
 
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch(getTopicLists(1));
    }
  }
  componentWillReceiveProps(nextProps) {
    const _pathname = this.props.location.toJS().pathname;
    const pathname = nextProps.location.toJS().pathname;
    const _id = this.getParams(_pathname)
    const id = this.getParams(_pathname)
    if (_id !== id) {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch(getTopicLists(id));
      }
    }
  }
  getParams = (pathname)=>{
    const params = reg.exec(pathname)
    let id
    if(params){
        if(params.length>1){
          id = params[1]
        }else{
          id='all'
        }
    }else{
      id = 'all'
    }
    return id
  }
  render() {
    const { topic_lists, error,location } = toJS(this.props);
    // const { id } = this.props.match.params;
    // console.log(this.props)
    const id = this.getParams(location.pathname)
    return (
      <div className="home-page">
        <div className="types-container">
          <div className="types-list">
            {TYPES.map((ele, index) => (
              <Link
                to={`/index/${ele.id}`}
                key={ele.id}
                className={id === ele.id ? "types-item__actived" : ""}
              >
                <span className="types-item">{ele.title}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="home-container">
          <div className="left-container">
            <div className="order-list">
              <Link className="order-item" to="?order=hot">
                热门
              </Link>
              <Link className="order-item" to="?order=latest">
                最新
              </Link>
            </div>
            <div className="topicList-container">
              {topic_lists.length > 0
                ? topic_lists.map((ele, index) => (
                    <TopicListItem key={index} {...ele} />
                  ))
                : null}
              首页
              {/* {this.props.match.params.id} */}
              <Link className="order-item" to="?page=2">
                分页
              </Link>
              {
                // this.props.match.params.type||'获取不到'
              }
            </div>
          </div>
          <div className="right-container">Aside area</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  topic_lists: makeSelectTopicLists(),
  error: makeSelectError(),
  location:makeSelectRoute()
});

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: "home", reducer: homeReducer });
const withSaga = injectSaga({ key: "home", saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
