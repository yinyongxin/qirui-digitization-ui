import React from "react";
import { Page, SideMenu, SideMenuItem, Title, SideMenuItemSub } from "../../components";

const SideMenuExemple = () => {
  const menuTree = [
    {
      title: 'MenuItem',
      activeKey: '1',
      icon: 'bars',
    },
    {
      title: 'MenuSub',
      activeKey: '2',
      icon: 'bars',
      children: [
        {
          title: 'MenuItem',
          activeKey: '2-1',
          children: [
            {
              title: 'MenuSub',
              activeKey: '2-2',
              icon: 'bars',
              children: [
                {
                  title: 'MenuItem',
                  activeKey: '2-2-1',
                }
              ]
            },
          ]
        }
      ]
    },
  ]
  return (
    <Page
      pageHeader={{
        title: '侧边菜单 SideMenu',
        descriptions: '收纳、排列并展示一系列选项的列表。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'SideMenuExemple',
              path: '/sideMenuExemple'
            }
          ]
        }
      }}
    >
      <div className="exemple-page-content">
        <Title type="tooltip" title="borders" >
          <SideMenu
            menuTree={menuTree}
          />
        </Title>
        <Title type="tooltip" title="基本使用" >
          <SideMenu
            menuTree={menuTree}
            borders={["right", 'top', 'bottom']}
          />
          <SideMenuItemSub title={'SideMenuItemSub'} activeKey={'SideMenuItemSub'} index={0}>
            <SideMenuItem title={'SideMenuItem'} activeKey="SideMenuItem" key={"activeKey1"} index={1} />
            <SideMenuItem title={'SideMenuItem'} activeKey="SideMenuItem" key={"activeKey2"} index={1} />
          </SideMenuItemSub>
        </Title>
      </div>
    </Page>
  )
}
export default SideMenuExemple