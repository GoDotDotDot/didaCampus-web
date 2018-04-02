import React, { Component } from "react";
import BaseComponent from "../../components/HOCImutable";
import { is } from "immutable";

import { Input, Button, List, Spin, Icon, Form } from "antd";
import "./styles/index.scss";
import { TYPES } from "common/nav";
import { Link, NavLink } from "react-router-dom";
import E from "wangeditor";
// Components

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const FormItem = Form.Item;

class PublishPage extends BaseComponent {
  componentDidUpdate() {
    console.log("home did update");
  }
  state = {
    title: "",
    editorContent:''
  };
  componentDidMount() {
    const elem = this.editorDom;
    const editor = this.editor = new E(elem);
    
    editor.customConfig.onchange = html => {
    console.log(this.editor.txt.html())
      
      this.setState({
        editorContent: html
      })
    }
    editor.create();
    console.log(this.editor.txt.html())
    
  }
  titleOnChangeHandle = e => {
    const { value } = e.target;
    if (value.length <= 50) {
      this.setState({
        title: e.target.value
      });
    }
  };
  setSubmitBtn(){
    const { title, editorContent } = this.state;
    if(!this.editor){
      return (title.length + editorContent.length)===0
    }
    return (title.length + editorContent.length === 11)
  }
  render() {
    const { title, editorContent } = this.state;
    return (
      <div className="publish-page">
        <div className="publish-container">
          <div className="left-container">
            <div>
              <div className="form-row">
                <label htmlFor="" className="form-row-title">
                  标题：
                </label>
                <Input
                  placeholder="请输入合理的标题，50字以内"
                  className="form-row-content"
                  value={title}
                  onChange={this.titleOnChangeHandle}
                />
              </div>
              <div className="form-row">
                <label htmlFor="" className="form-row-title">
                  正文：
                </label>
                <div
                  ref={ref => (this.editorDom = ref)}
                  className="form-row-content"
                />
              </div>
              <div className="form-row">
                <Button type="primary" style={{ width: 90, marginTop: 5 }} disabled={this.setSubmitBtn()}>
                  发布
                </Button>
              </div>
            </div>
          </div>
          <div className="right-container">Aside area</div>
        </div>
      </div>
    );
  }
}

export default PublishPage;
