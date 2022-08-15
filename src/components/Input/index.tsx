import { FC, useContext } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames } from "../utils/tools";
import { InputPropsType } from "./interface"

const Input: FC<InputPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-input`

  const {
    borders,
    type
  } = props

  const defaultBorders = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    thead: true,
    tbody: true,
    vertical: false,
    ...borders
  }

  const classNamesObj = {
    input: (classNames?: ClassNameType[]) => getClassNames([
      `${prefixCls}`,
      {
        [`${prefixCls}-border-top`]: defaultBorders.top,
        [`${prefixCls}-border-right`]: defaultBorders.right,
        [`${prefixCls}-border-bottom`]: defaultBorders.bottom,
        [`${prefixCls}-border-left`]: defaultBorders.left,
      },
    ])
  }

  return (
    <div className={classNamesObj.input()}>
      <label htmlFor="">input</label>
      <input title="input" type={type} />
    </div>
  )
}
export default Input