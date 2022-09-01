import Modal from "./Modal";
import { ModalBaseType, ModalComponentInterFace, ModalItemProp } from "./interface";
import { Root, createRoot } from "react-dom/client";
import ModalItem from "./ModalItem";
import { Portal } from "../index";
import { getElement } from "../utils/tools";

let ModalsContentClassName = 'modals-show-content'

const modalsMap = new Map<symbol, ModalItemProp>([])

let root: Root | null = null


const ModalComponent: ModalComponentInterFace = Modal as ModalComponentInterFace;

const defaultShowConfig: ModalBaseType = {
  icon: null,
  headerCenter: true,
  footerAlign: 'center',
  footerBorder: false,
}

const close = (key: symbol) => {
  modalsMap.delete(key)
  modalsRender()
}

const modalsRender = () => {

  const [designModals] = getElement(ModalsContentClassName)

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
    root = createRoot(designModals!);
  }

  root?.render(
    <Portal visible={true} container={designModals!}>
      {modalsComponent}
    </Portal>
  );
}

ModalComponent.show = (config) => {
  const newSymbol = Symbol()

  modalsMap.set(newSymbol, {
    ...defaultShowConfig,
    ...config
  })

  modalsRender()

  return {
    close: () => {
      close(newSymbol)
    },
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