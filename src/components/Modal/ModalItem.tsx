import { useContext } from "react"
import { GlobalContext } from "../config/globalContext"
import Button from "../Button"
import { ModalPropsType } from "./interface"
import Modal from "./Modal"
const ModalItem = (props: ModalPropsType) => {
  const {
    children,
    ...rest
  } = props
  return (
    <Modal
      {...rest}
      visible
      isComponent
    >
      {children}
    </Modal>
  )
}

export default ModalItem

