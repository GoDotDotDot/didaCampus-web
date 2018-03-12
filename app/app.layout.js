import React from "react";
import { render } from "react-dom";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import { changeLocale } from '@redux/containers/LanguageProvider/actions';

import { Layout, Menu, Icon,Select } from "antd";
import {NAV__LOGOUT,NAV__LOGIN} from "./common/nav";
import createBrowserHistory from "history/createBrowserHistory";
// 建议使用BrowserRouter，这里为了配合使用history而采用Router
// BrowserRouter first,here is for history via Router component.
import { Router, Route, Link, NavLink,Switch } from "react-router-dom";
import history from './common/history'

import Header from 'components/Header'
import NoMatch from 'components/NoMatch'
import './common/global.scss'

const Option = Select.Option;

// import Promise from "es6-promise";
// Promise.polyfill();

const { Sider, Footer, Content } = Layout;

const getDefaultSelectedKeys =(path)=>{
  const flatPath = path.split('/').filter(_=>_)
  return [flatPath.length > 0 ? path : '/']
}
class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.hashChangeHandle = this.hashChangeHandle.bind(this)
  }
  state = {
    collapsed: false
  };
  hashChangeHandle(){
    window.scrollTo(0, 0);    
  }
  componentWillMount() {
    // if use HashRouter, the follow code will be uesfull for auto scrolling page to the top of page.
    // window.addEventListener(
    //   "hashchange",
    //   this.hashChangeHandle,
    //   false
    // );
    if(history){
      const unlisten = history.listen((location, action) => {
        console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
        console.log(`The last navigation action was ${action}`)
      })
      // unlisten()
    }
  }
  componentWillUnmount(){
    // window.removeEventListener('hashchange',this.hashChangeHandle)
  }
  getRoute = nav => {
    return nav.map(ele => {
      if (ele.child) {
        return this.getRoute(ele.child);
      }
      if (ele.component) {
        return (
          <Route
            key={ele.route}
            exact={ele.exact}
            // strict={true}
            path={ele.route}
            component={ele.component}
          />
        );
      }
    });
  };
  getMenuItem = nav => {
    return nav.map(ele => {
      if (ele.child) {
        return <Menu.SubMenu className='sub-menu' key={ele.route} title={ele.title}>{this.getMenuItem(ele.child)}</Menu.SubMenu>;
      }
      return (
        <Menu.Item key={ele.route}>
          <Link to={ele.route}>{ele.title}</Link>
        </Menu.Item>
      );
    });
  };
  languageChangeHandle=(value)=>{
    console.log(`selected ${value}`);
    const {dispatch} = this.props
    dispatch && dispatch(changeLocale(value))
  }
  render() {
    const {pathname,hash} = history.location
    const noPrefixHash = hash.replace(/\#/,'')
    return (
      <Router history={history}>
        <Layout>
            <Header>
            <Select value={this.props.locale} onChange={this.languageChangeHandle} style={{float:'right',transform:'translate(-20px,50%)'}}>
              <Option value="en">English</Option>
              <Option value="zh-cn">简体中文</Option>
            </Select>
            </Header>
            <Content className='main-container'>
            <Switch>
              {this.getRoute(NAV__LOGIN)}
              <Route component={NoMatch} />
            </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
               ©2018 滴答(嘀嗒)校园
            </Footer>
          </Layout>
      </Router>
    );
  }
}
// AppLayout.contextTypes = {
//   history: PropTypes.any,
//   store:PropTypes.any
// };

const mapStateToProps = (state)=>{
  const locale = state.get('language').get('locale')
  return {locale}
}
// changeLocale
export default withRouter(connect(mapStateToProps)(AppLayout)) ;
