import React from 'react'
import bgImg from '../../assets/m_bg.jpg'
import './index.less'

class XiaZai extends React.Component{
  render(){
    return(
      <div className='warp'>
      <img src={ bgImg } alt=""/>
      <div className='btnAll'>
      <button className='btn'>IOS下载</button>
      <button className='btn'>安卓下载</button>
      </div>
      </div>
    )
  }
}
export default XiaZai