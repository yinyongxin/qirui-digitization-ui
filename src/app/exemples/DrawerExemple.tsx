import React, { useRef } from "react";
import { Button, Icon, Drawer } from "../../components";
import { DrawerHandle } from "../../components/Drawer/interface";

let drawer
const DrawerExemple = () => {

  const DrawerRef = useRef<DrawerHandle>()
  const DrawerRef2 = useRef<DrawerHandle>()
  const DrawerRef3 = useRef<DrawerHandle>()
  return (
    <div className="exemple">
      <div>
        <Drawer
          placement="left"
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
      <div>
        <Drawer
          title="Drawer2"
          ref={DrawerRef2}
          onCancel={() => {
            console.log('onCancel');
          }}
          onOK={() => {
            console.log('onOK');
            setTimeout(() => {
              DrawerRef2.current?.close()
            }, 1000)
          }}
        >
          <div style={{ height: 3000 }}>
            手动Api关闭
          </div>
        </Drawer>
        <Button onClick={() => DrawerRef2.current?.open()}>手动Api关闭</Button>
      </div>
      <div>
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
      }}>Api调用&自动更新</Button>
    </div>
  )
}
export default DrawerExemple