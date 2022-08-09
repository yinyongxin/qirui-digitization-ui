import { DrawerPropsType } from "./interface"
import Drawer from "./Drawer"
const DrawerItem = (props: DrawerPropsType) => {
  const {
    children,
    ...rest
  } = props
  return (
    <Drawer
      {...rest}
      visible
      isComponent
    >
      {children}
    </Drawer>
  )
}

export default DrawerItem

