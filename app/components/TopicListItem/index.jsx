import React from "react";
import { Tag, Icon } from "antd";

import './styles/index.scss'
const Item = ({ title, avatar, author, type,review_avatar, last_review_author, last_review_date,like_num, review_num, visit_num }) => {
  return (
    <div className='topicItem-container'>
      <AuthorInfo avatar={avatar} author={author} type={type}/>
      <div className='clearfix topicTitle-container'>
        <a className='topicItem-title'>{title}</a>
        <ReviwInfo review_avatar={review_avatar} last_review_author={last_review_author} last_review_date={last_review_date}/>
      </div>
        <FooterInfo like_num={like_num} review_num={review_num} visit_num={visit_num}/>
    </div>
  );
};

const AuthorInfo = ({ avatar, author, type }) => {
  return (
    <div className='authorInfo-container'>
      <img src={avatar} alt="author" className='authorInfo-avatar'/>
      <span className='authorInfo-author'>{author}</span>
      <span className='authorInfo-type'>{type}</span>
    </div>
  );
};
const ReviwInfo = ({ review_avatar, last_review_author, last_review_date }) => (
  <div className='review-container'>
    <a href="">
      <img className='review-avatar' src={review_avatar} alt="" />
      <span className='review-author'>{last_review_author}</span>
    </a>
    <span className='review-date'>{last_review_date}</span>
  </div>
);
const FooterInfo = ({ like_num, review_num, visit_num }) => (
  <div className='topicFooter-container'>
    <Icon className='topicFooter-icon' type="heart" />
    <span>{like_num}</span>
    <Icon className='topicFooter-icon' type="message" />
    <span>{review_num}</span>
    <Icon className='topicFooter-icon' type="eye" />
    <span>{visit_num}</span>
  </div>
);
export default Item