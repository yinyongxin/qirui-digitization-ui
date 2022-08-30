import './index.less'
import React, { } from 'react'
import { SideMenu } from '../components'
import { Outlet, useNavigate, useLocation, useResolvedPath } from 'react-router-dom'
import { MenuTreeItemType, SidePropsType } from '../components/SideMenu/interface';
import { exemplesNameList } from './routes';

function App() {
  let navigate = useNavigate();

  const menuTree: MenuTreeItemType<SidePropsType>[] = exemplesNameList.map((exemplesName) => {
    const title = exemplesName?.replace(/Exemple/, '')
    return {
      title: title,
      activeKey: exemplesName,
      icon: 'bars',
    }
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
          height: '100vh'
        }}
        defaultActiveKeys={[location.pathname.split('/')[1]]}
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

