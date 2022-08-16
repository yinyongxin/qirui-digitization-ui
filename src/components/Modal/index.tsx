import Modal from "./Modal";
import { ModalComponentInterFace, ModalItemProp } from "./interface";
import { Root, createRoot } from "react-dom/client";
import ModalItem from "./ModalItem";

let ModalsContentClassName = 'modals-show-content'

const modalsMap = new Map<symbol, ModalItemProp>([])

let root: Root | null = null

const ModalComponent: ModalComponentInterFace = Modal as ModalComponentInterFace;

const defaultShowConfig = {
  icon: null,
  headerCenter: true,
  footerCenter: true,
  footerBorder: false,
}


const modalsRender = () => {
  let designMessages = document.querySelector(`.${ModalsContentClassName}`)
  if (!designMessages) {
    const modalsContent = document.createElement('div');
    modalsContent.setAttribute('class', ModalsContentClassName);
    document.body.appendChild(modalsContent);
    designMessages = document.querySelector(`.${ModalsContentClassName}`);
  }

  const close = (key: symbol) => {
    modalsMap.delete(key)
    modalsRender()
  }

  const modalsComponent = ([...modalsMap.keys()].map((modalKey, index) => {
    const modalValue = modalsMap.get(modalKey)
    return (
      <ModalItem
        key={index}
        {...modalValue}
        onOK={() => {
          modalValue?.onOK && modalValue?.onOK()
          close(modalKey)
        }}
        onCancel={() => {
          modalValue?.onCancel && modalValue?.onCancel()
          close(modalKey)
        }}
      />
    )
  }))

  if (!root) {
    root = createRoot(designMessages!);
  }

  root?.render(modalsComponent);
}

ModalComponent.show = (config) => {
  const newSymbol = Symbol()
  modalsMap.set(newSymbol, {
    ...defaultShowConfig,
    ...config
  })

  modalsRender()

  return {
    close,
    update: (config) => {
      if (modalsMap.get(newSymbol)) {
        modalsMap.set(
          newSymbol,
          {
            ...modalsMap.get(newSymbol),
            ...config
          }
        )
        modalsRender()
      }
    }
  }
}

export default ModalComponent;