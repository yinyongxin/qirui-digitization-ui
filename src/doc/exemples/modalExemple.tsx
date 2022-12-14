import React, { useRef, useState } from "react";
import { Button, Page, Modal, Title } from "../../components";
import { ModalHandle } from "../../components/Modal/interface";
import ScrollIntoView from "../components/ScrollIntoView";

let modal: { update: any; close?: () => void; }
const ModalExemple = () => {
  const ModalRef = useRef<ModalHandle>()
  const ModalRef1 = useRef<ModalHandle>()
  const ModalRef2 = useRef<ModalHandle>()
  const ModalRef3 = useRef<ModalHandle>()
  const [title, setTitle] = useState('默认')
  const [num, setNum] = useState(0)
  return (
    <Page
      pageHeader={{
        title: '对话框 Modal',
        descriptions: '在当前页面打开一个浮层，承载相关操作。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'ModalExemple',
              path: '/modalExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="默认" >
          <div className="flex gap20">
            <Modal
              title={title}
              ref={ModalRef1}
              mountOnEnter
            >
              {num}
              <Button onClick={() => {
                setNum(Math.random())
              }}>SetTitle</Button>
            </Modal>
            <Button onClick={() => {
              setTitle('setTimeout')
              ModalRef1.current?.open()
              // setTimeout(() => {

              //   console.log('setTimeout');

              // }, 1000)
            }}>默认</Button>
          </div>
        </Title>
        <Title type="tooltip" title="自定义头部底部" >
          <div className="flex gap20">
            <Modal
              header={(
                <div>header</div>
              )}
              footer={(
                <div>footer</div>
              )}
              ref={ModalRef3}
            >
              自定义头部底部
            </Modal>
            <Button onClick={() => ModalRef3.current?.open()}>自定义头部底部</Button>
          </div>
        </Title>
        <Title type="tooltip" title="自动关闭" >
          <Modal
            title="Modal2"
            ref={ModalRef2}
            onCancel={() => {
              console.log('onCancel');
            }}
            onOK={() => {
              console.log('onOK');
              setTimeout(() => {
                ModalRef2.current?.close()
              }, 1000)
            }}
            unmountOnExit
          >
            自动关闭
          </Modal>
          <Button onClick={() => ModalRef2.current?.open()}>自动关闭</Button>
        </Title>
        <Title type="tooltip" title="Api调用" >
          <div className="flex gap20">
            <Button onClick={() => {
              Modal.show({
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
              modal = Modal.show({
                title: "api",
                children: 'ascass',
              })
              setTimeout(() => {
                modal.update({
                  children: '12311312',
                })
                // modal.close()
              }, 2000)
            }}>自动更新</Button>
          </div>
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default ModalExemple