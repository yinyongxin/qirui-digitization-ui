import React, { useRef, useState } from "react";
import { Button, Tabs, Title, Page } from "../../components";
import { TabsHandle } from "../../components/Tabs/Tabs/interface";

const TabsExemple = () => {

  const TabsRef = useRef<TabsHandle>()
  const [tabList, setTabList] = useState(
    [
      {
        title: '选中标签',
        // content: 'content1',
        current: 'key1',
        num: 10,
      },
      {
        title: '可选标签',
        // content: () => 'content2',
        current: 'key2',
        num: 20
      },
      {
        title: '不可选中标签',
        // content: () => 'content3',
        current: 'key3',
        disabled: true,
        num: 0
      }
    ]
  )

  const handleChange = () => {
    setTabList(state => {
      const newState = [...state]
      newState[1] = {
        ...state[1],
        num: state[1].num - 1
      }
      console.log('newState', newState[1]);
      return [...newState]
    })
  }
  return (
    <Page
      pageHeader={{
        title: '标签页 Tabs',
        descriptions: '将内容组织同一视图中，一次可查看一个视图内容。查看其他内容可切换选项卡查看。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'TabsExemple',
              path: '/tabsExemple'
            }
          ]
        }
      }}
    >
      <div className="exemple-page-content">
        <Title type="tooltip" title="type 为 line" >
          <Tabs
            ref={TabsRef}
            tabList={tabList}
            activeTab="key2"
          />
          <div style={{ height: 20 }}></div>
          <Button onClick={() => {
            handleChange()
          }}>-</Button>
        </Title>
        <Title type="tooltip" title="type 为 miniCard" >
          <Tabs
            tabList={[
              {
                title: '全部',
                current: 'key1'
              },
              {
                title: 'A',
                current: 'key2'
              },
              {
                title: 'B',
                current: 'key3',
                disabled: true
              }
            ]}
            activeTab="key2"
            type="miniCard"
          />
        </Title>
        <Title type="tooltip" title="type 为 text" >
          <Tabs
            tabList={[
              {
                title: '选中标签',
                current: 'key1'
              },
              {
                title: '可选标签',
                current: 'key2'
              },
              {
                title: '不可选中标签',
                current: 'key3',
                disabled: true
              }
            ]}
            activeTab="key2"
            type="text"
          />
        </Title>
        <Title type="tooltip" title="type 为 card" >
          <Tabs
            tabList={[
              {
                title: 'OVERVIEW',
                current: 'key1'
              },
              {
                title: 'METRICS',
                current: 'key2'
              },
              {
                title: 'SCHEMATIC',
                current: 'key3',
              },
              {
                title: 'INSIGHT TO ACTION',
                current: 'key4',
                disabled: true
              }
            ]}
            activeTab="key2"
            type="card"
          />
        </Title>
      </div>
    </Page>
  )
}
export default TabsExemple