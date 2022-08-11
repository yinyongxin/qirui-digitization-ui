import './index.less'
import React, { } from 'react'
import { SideMenu } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  let navigate = useNavigate();
  const menuTree = [
    {
      title: 'Button',
      activeKey: 'button',
      icon: 'bars',
    },
    {
      title: 'Icon',
      activeKey: 'icon',
      icon: 'bars',
    },
  ]
  return (
    <div className='app'>
      <SideMenu
        activeMenuItemChange={(menuItems) => {
          console.log('menuItems', menuItems);
          navigate(`/${menuItems?.[0]}`)
        }}
        defaultActiveKeys={['1']}
        menuTree={menuTree}
      />
      <div className='appContent'>
        <Outlet />
      </div>
    </div>
  )
}

export default App

