import React from "react";
import { Input, Dropdown,Icon,Menu } from "antd";
import { Link, NavLink  } from "react-router-dom";
import { NAV__LOGOUT, NAV__LOGIN } from "common/nav";

import "./styles/index.scss";

const Search = Input.Search;
const isParam = (match, location) => {
  if (!match) {
    return false
  }
  // const id= match.params.id
  // return !!id
  return true
}

class Header extends React.Component {
  showLoginModal=()=>{
    const {signInModalVisible} = this.props
    signInModalVisible && signInModalVisible(true)
  }
  render() {
    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
      );
    return (
      <header className="header">
        <div className="header-container">
          <a href="/" className="header-container-logo">
            <img
              height="32px"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt="嘀嗒Flag"
            />
          </a>
          <nav className="header-container__nav">
            <ul className="nav-lists">
              <li className="nav-item">
                <ul className="nav-banner">
                  {/**
                   * 测试登录路由banner区域
                   */
                  NAV__LOGIN.map((ele, index) => {
                    return (ele.hidden ||
                      <li key={index} className="nav-item link-item">
                        <NavLink to={ele.route} activeClassName="actived" isActive={isParam}>
                          {ele.title}
                        </NavLink>
                      </li>
                    );
                  })}
                  {/* 
                                    <li className='nav-item link-item'>
                                        <NavLink to='/' activeClassName="actived" exact>首页</NavLink>
                                    </li>
                                    <li className='nav-item link-item'>
                                        <NavLink to='/hot' activeClassName="actived">热门</NavLink>
                                    </li> 
                                    */}
                </ul>
              </li>
              <li className="nav-item nav-search">
                <Dropdown overlay={menu}  trigger={["click"]}>
                  <a className="ant-dropdown-link" href="#">
                    成都信息工程大学 <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
              <li className="nav-item nav-user" style={{ marginLeft: 20 }}>
                <span className="login" onClick={this.showLoginModal}>登录</span>
                <span className="register">注册</span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
