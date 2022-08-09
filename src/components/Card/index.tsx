import { FC, useContext } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames } from "../utils/tools";
import { CardPropsType } from "./interface"

const Card: FC<CardPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-card`

  const {
    status,
    children,
    title,
    headerStyle = {},
    bodyStyle = {},
    cardStyle = {},
    width = 377,
    border = [
      'top',
      'right',
      'bottom',
      'left',
    ]
  } = props

  const cardClassName = getClassNames([
    `${prefixCls}`,
    ...border.map(item => `${prefixCls}-border-${item}`)
  ])

  const statusClassName = getClassNames([
    `${prefixCls}-status`,
    `${prefixCls}-status-${status}`
  ])

  const footerRender = () => {
    if (title || status) {
      return (
        <header style={headerStyle} className={`${prefixCls}-header`}>
          <div>{title}</div>
          {status && (
            <div className={statusClassName}></div>
          )}
        </header>
      )
    }
  }

  return (
    <div style={{ width, minWidth: width, ...cardStyle }} className={cardClassName}>
      {footerRender()}
      <main style={bodyStyle} className={`${prefixCls}-body`}>
        {children}
      </main>
    </div>
  )
}
export default Card