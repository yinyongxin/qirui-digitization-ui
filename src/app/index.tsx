import './index.less'
import React, { } from 'react'
import { SideMenu } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  let navigate = useNavigate();
  const menuTree = [
    {
      title: 'Button',
      activeKey: 'buttonExemple',
      icon: 'bars',
    },
    {
      title: 'Icon',
      activeKey: 'iconExemple',
      icon: 'bars',
    },
    {
      title: 'Title',
      activeKey: 'titleExemple',
      icon: 'bars',
    },
  ]
  return (
    <div className='app'>
      <SideMenu
        activeMenuItemChange={(menuItems) => {
          console.log('menuItems', menuItems);
          navigate(`/${menuItems?.[0]}`);
        }}
        defaultActiveKeys={['1']}
        menuTree={menuTree}
        borders={['right']}
      />
      <div className='appContent'>
        <Outlet />
      </div>
    </div>
  )
}

export default App

