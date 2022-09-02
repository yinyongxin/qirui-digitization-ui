import './index.less'
import React, { useEffect, useState } from 'react'
import { SideMenu } from '../components'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { exemplesNameList } from './routes';
import { useData } from '../components/utils/hooks';

function App() {

  let navigate = useNavigate();
  const data = useData({
    menuTree: exemplesNameList.map((exemplesName) => {
      const title = exemplesName?.replace(/Exemple/, '').split('').map((item, index) => {
        if (index === 0) {
          return item.toUpperCase()
        } else {
          return item
        }
      }).join('')

      return {
        title: title,
        activeKey: exemplesName,
        icon: 'bars',
      }
    })
  })

  const location = useLocation()

  return (
    <div className='app'>
      <SideMenu
        activeMenuItemChange={(menuItems) => {
          console.log('menuItems', menuItems);

          navigate(`/${menuItems?.[0]}`);
        }}
        style={{
          overflow: 'auto',
          maxHeight: '100vh'
        }}
        defaultActiveKeys={[location.pathname.split('/')[1]]}
        menuTree={data.menuTree}
        borders={['right']}
      />
      <div className='appContent'>
        <Outlet />
      </div>
    </div>
  )
}

export default App

