import Drawer from "./Drawer";
import { DrawerComponentInterFace, DrawerItemProp } from "./interface";
import { Root, createRoot } from "react-dom/client";
import DrawerItem from "./DrawerItem";
import { getElement } from "../utils/tools";

let DrawersContentClassName = 'drawers-show-content'

const drawersMao = new Map<symbol, DrawerItemProp>([])

let root: Root | null = null

const DrawerComponent: DrawerComponentInterFace = Drawer as DrawerComponentInterFace;

const defaultShowConfig = {
  icon: null,
  headerCenter: true,
  footerCenter: true,
  footerBorder: false,
}


const drawersRender = () => {

  const [designDrawers] = getElement(DrawersContentClassName)

  const close = (key: symbol) => {
    drawersMao.delete(key)
    drawersRender()
  }

  const drawersComponent = ([...drawersMao.keys()].map((drawerKey, index) => {
    const drawerValue = drawersMao.get(drawerKey)
    return (
      <DrawerItem
        key={index}
        {...drawerValue}
        onOK={() => {
          drawerValue?.onOK && drawerValue?.onOK()
          close(drawerKey)
        }}
        onCancel={() => {
          drawerValue?.onCancel && drawerValue?.onCancel()
          close(drawerKey)
        }}
      />
    )
  }))

  if (!root) {
    root = createRoot(designDrawers!);
  }

  root?.render(drawersComponent);
}

DrawerComponent.show = (config) => {
  const newSymbol = Symbol()
  drawersMao.set(newSymbol, {
    ...defaultShowConfig,
    ...config
  })

  drawersRender()

  return {
    close: () => {
      drawersMao.delete(newSymbol)
      drawersRender()
    },
    update: (config) => {
      if (drawersMao.get(newSymbol)) {
        drawersMao.set(
          newSymbol,
          {
            ...drawersMao.get(newSymbol),
            ...config
          }
        )
        drawersRender()
      }
    }
  }
}

export default DrawerComponent;