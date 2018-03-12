import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { FormattedMessage } from "react-intl";
import messages from "messages/home";
import { createStructuredSelector } from "reselect";
import { searchUsersGithubRepo, changeUsername } from "@redux/actions/home";
import homeReducer from "@redux/reducers/home";
import saga from "@redux/sagas/home";
import {
  makeSelectUsername,
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError
} from "@redux/selectors/home";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import { Input, Button, List, Spin, Icon } from "antd";

import "./styles/index.scss";
import { TYPES } from "common/nav";
import { Link, NavLink } from "react-router-dom";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class HomePage extends Component {
  onSearchClickHandle = () => {
    const { dispatch, name } = this.props;
    dispatch && dispatch(searchUsersGithubRepo(name));
  };
  onInputChangeHandle = e => {
    const { value } = e.target;
    const { dispatch } = this.props;
    dispatch && dispatch(changeUsername(value));
  };
  render() {
    const { name, repoData, loading, error } = this.props;
    const { id } = this.props.match.params;
    console.log(this.props.match);
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
              <span className="order-item">热门</span>
              <span className="order-item">最新</span>
            </div>
            首页{this.props.match.params.id}
            {
              // this.props.match.params.type||'获取不到'
            }
          </div>
          <div className="right-container">Aside area</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  name: makeSelectUsername(),
  repoData: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: "home", reducer: homeReducer });
const withSaga = injectSaga({ key: "home", saga });

export default compose(withRouter, withReducer, withSaga, withConnect)(
  HomePage
);
