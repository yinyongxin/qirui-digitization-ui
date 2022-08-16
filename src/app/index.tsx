import './index.less'
import React, { } from 'react'
import { SideMenu } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { MenuTreeItemType, SidePropsType } from '../components/SideMenu/interface';

function App() {
  let navigate = useNavigate();
  const menuTree: MenuTreeItemType<SidePropsType>[] = [
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
    {
      title: 'Card',
      activeKey: 'cardExemple',
      icon: 'bars',
    },
    {
      title: 'Tabs',
      activeKey: 'tabsExemple',
      icon: 'bars'
    },
    {
      title: 'Message',
      activeKey: 'messageExemple',
      icon: 'bars'
    },
    {
      title: 'Modal',
      activeKey: 'modalExemple',
      icon: 'bars'
    },
    {
      title: 'Drawer',
      activeKey: 'drawerExemple',
      icon: 'bars'
    },
    {
      title: 'Select',
      activeKey: 'selectExemple',
      icon: 'bars'
    },
    {
      title: 'SideMenu',
      activeKey: 'sideMenuExemple',
      icon: 'bars'
    },
    {
      title: 'Table',
      activeKey: 'tableExemple',
      icon: 'bars'
    },
    {
      title: 'Input',
      activeKey: 'inputExemple',
      icon: 'bars'
    },
    {
      title: 'Image',
      activeKey: 'ImageExemple',
      icon: 'bars'
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

