import React, { } from 'react'
import ModalExemple from './exemples/ModalExemple'
import DrawerExemple from './exemples/DrawerExemple'
import ButtonExemple from './exemples/ButtonExemple'
import IconExemple from './exemples/IconExemple'
import MessageExemple from './exemples/MessageExemple'
import TabsExemple from './exemples/TabsExemple'
import CardExemple from './exemples/CardExemple'
import SelectExemple from './exemples/SelectExemple'
import './index.less'
import { SideMenu } from '../components'

function App() {
  return (
    <div className='app'>
      <SideMenu
        defaultOpenKeys={['2', '3']}
        defaultActiveKeys={['1']}
        menuTree={[
          {
            title: 'title1',
            activeKey: '1',
            icon: 'bars',
          },
          {
            title: 'title2',
            activeKey: '2',
            icon: 'bars',
            children: [
              {
                title: 'title2-1',
                activeKey: '2-1',
              }
            ]
          },
          {
            title: 'title3',
            activeKey: '3',
            icon: 'bars',
            children: [
              {
                title: 'title3-1',
                activeKey: '3-1',
                children: [
                  {
                    title: 'title3-1-1',
                    activeKey: '3-1-1',
                  }
                ]
              }
            ]
          }
        ]}
      />
      <div>
        <ModalExemple />
        <DrawerExemple />
        <ButtonExemple />
        <IconExemple />
        <MessageExemple />
        <TabsExemple />
        <CardExemple />
        <SelectExemple />
      </div>
    </div>
  )
}

export default App

