import React from "react";
import { Icon, SideMenu, Title } from "../../components";

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
    <div>
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
      </Title>
    </div>
  )
}
export default SideMenuExemple