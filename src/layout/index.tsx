/* eslint-disable react-refresh/only-export-components */
import { FC, useState, memo } from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import { 
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import Route from '../router/index'

import './style.less'

const tabs = [
  {
    key: '/home',
    title: '首页',
    icon: <AppOutline />,
  },
  {
    key: '/todo',
    title: '分类',
    icon: <UnorderedListOutline />,
  },
  {
    key: '/message',
    title: '消息',
    icon: <MessageOutline />,
  },
  {
    key: '/me',
    title: '我的',
    icon: <UserOutline />,
  },
]



const Bottom: FC<{ setTitleName: (title: string) => void }> = memo(({ setTitleName }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  
  const setRouteActive = (value: string, isFlag = false) => {
    const obj = tabs.find(el => el.key === value)
    console.log(obj);
    
    obj && setTitleName(obj.title)
    isFlag && navigate(value)
  }
  
  // setRouteActive(pathname)
  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value, true)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
})

const NavBarItem = (title: string) => {
  if(!title) return null
  return (<div className="layout-top">
    <NavBar backArrow={false}>{title}</NavBar>
  </div>)
}

const TabBarItem = (title: string, setRouteActive: (value: string) => void) => {
  if(!title) return null
  return (<div className="layout-bottom">
    <Bottom setTitleName={setRouteActive} />
  </div>)
}

export default () => {
  const { pathname } = useLocation()
  const path = pathname === '/' ? '/home' : pathname
  const obj = tabs.find(el => el.key === path) || { title: '' }
  const [title, setTitle] = useState(obj?.title)
  const setRouteActive = (value: string) => {
    setTitle(value)
  }
  return (
    <div className="layout-app">
      { NavBarItem(title) }
      <div className="layout-body">
        <Route />
      </div>
      { TabBarItem(title, setRouteActive) }
    </div>
  )
}
