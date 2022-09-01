import { ModalPropsType } from "../../Modal//interface"

export type ModalConfigType = Partial<ModalPropsType>

export const ModalConfig: ModalConfigType = {
  visible: false,
  mask: true,
  header: 'default',
  footer: 'default',
  icon: 'default',
  title: null,
  alignCenter: true,
  unmountOnExit: false,
  mianStyle: {},
  cancelButtonProps: {},
  okButtonProps: {},
  cancelText: '我再想想',
  okText: '确定',
  mountOnEnter: false,
  width: 500,
  headerCenter: false,
  footerAlign: 'end',
  footerBorder: true,
  border: true
}