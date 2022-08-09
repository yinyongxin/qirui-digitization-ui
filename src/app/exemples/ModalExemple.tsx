import React, { useRef } from "react";
import { Button, Icon, Modal } from "../../components";
import { ModalHandle } from "../../components/Modal/interface";

let modal
const ModalExemple = () => {

  const ModalRef = useRef<ModalHandle>()
  const ModalRef2 = useRef<ModalHandle>()
  const ModalRef3 = useRef<ModalHandle>()
  return (
    <div className="exemple">
      <div>
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
      <div>
        <Modal
          title="Modal2"
          ref={ModalRef2}
          onCancel={() => {
            console.log('onCancel');
          }}
          onOK={() => {
            console.log('onOK');
            setTimeout(() => {
              ModalRef.current?.close()
            }, 1000)
          }}
        >
          自动关闭
        </Modal>
        <Button onClick={() => ModalRef2.current?.open()}>自动关闭</Button>
      </div>
      <div>
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
      <Button onClick={() => {
        modal = Modal.show({
          title: "api",
          children: 'ascass',
        })
        setTimeout(() => {
          modal.update({
            children: '12311312',
          })
        }, 2000)
      }}>Api调用&自动更新</Button>
    </div>
  )
}
export default ModalExemple