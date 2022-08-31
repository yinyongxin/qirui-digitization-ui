import React, { useRef } from "react";
import { Button, Page, Drawer, Title } from "../../components";
import { DrawerHandle } from "../../components/Drawer/interface";
let drawer
const DrawerExemple = () => {
  const DrawerRef = useRef<DrawerHandle>()
  const DrawerRef1 = useRef<DrawerHandle>()
  const DrawerRef2 = useRef<DrawerHandle>()
  const DrawerRef3 = useRef<DrawerHandle>()
  return (
    <Page
      pageHeader={{
        title: '抽屉 Drawer',
        descriptions: '触发命令后，从屏幕一侧滑出的抽屉式的面板。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'BreadcrumbExemple',
              path: '/breadcrumbExemple'
            }
          ]
        }
      }}
    >
      <Title type="tooltip" title="默认" >
        <div className="flex gap20">
          <Drawer
            title={'title'}
            ref={DrawerRef1}
            mountOnEnter
          >
            默认
          </Drawer>
          <Button onClick={() => DrawerRef1.current?.open()}>默认</Button>
        </div>
      </Title>
      <Title type="tooltip" title="自定义头部底部" >
        <div className="flex gap20">
          <Drawer
            header={(
              <div>header</div>
            )}
            footer={(
              <div>footer</div>
            )}
            ref={DrawerRef3}
          >
            自定义头部底部
          </Drawer>
          <Button onClick={() => DrawerRef3.current?.open()}>自定义头部底部</Button>
        </div>
      </Title>
      <Title type="tooltip" title="自动关闭" >
        <Drawer
          title="Drawer2"
          ref={DrawerRef2}
          onCancel={() => {
            console.log('onCancel');
          }}
          onOK={() => {
            console.log('onOK');
            setTimeout(() => {
              DrawerRef.current?.close()
            }, 1000)
          }}
        >
          自动关闭
        </Drawer>
        <Button onClick={() => DrawerRef2.current?.open()}>自动关闭</Button>
      </Title>
      <Title type="tooltip" title="Api调用" >
        <div className="flex gap20">
          <Button onClick={() => {
            Drawer.show({
              title: "api",
              children: (
                <div>
                  Api调用
                </div>
              ),
            })
          }}>Api调用</Button>
        </div>
      </Title>
      <Title type="tooltip" title="自动更新" >
        <div className="flex gap20">
          <Button onClick={() => {
            drawer = Drawer.show({
              title: "api",
              children: 'ascass',
            })
            setTimeout(() => {
              drawer.update({
                children: '12311312',
              })
            }, 2000)
          }}>自动更新</Button>
        </div>
      </Title>
    </Page>
  )
}
export default DrawerExemple