import React, { Component } from 'react'

import './styles/index.scss'

export default class FeaturePage extends Component {
  render () {
    return (
      <div className='hot-page'>
        <div className='left-container'>
          <div className='hot-tags'>
            <span className='title'>热门标签</span>
            <div className='tags'>
              <span className='tags-item'>推荐</span>
              <span className='tags-item'>音乐</span>
              <span className='tags-item'>编程</span>
              <span className='tags-item'>健身</span>
            </div>
          </div>
          Flag area
        </div>
        <div className='right-container'>
          Aside area
        </div>
      </div>
    )
  }
}
