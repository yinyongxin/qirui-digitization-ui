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
    footerStyle = {},
    bodyStyle = {},
    cardStyle = {},
    width,
    header,
    footer,
    shadow = 'base',
    shadowShow = 'never',
    borders = [
      'top',
      'right',
      'bottom',
      'left',
    ]
  } = props

  const classnameObj = {
    comp: getClassNames([
      `${prefixCls}`,
      `${classNamePrefix}-shadow-time-base`,
      {
        [`${classNamePrefix}-shadow-${shadow}`]: shadowShow === 'always',
        [`${classNamePrefix}-shadow-${shadow}-hover`]: shadowShow === 'hover',
      },
      ...borders.map(item => `${prefixCls}-border-${item}`)
    ]),
    status: getClassNames([
      `${prefixCls}-status`,
      `${prefixCls}-status-${status}`
    ])
  }

  const headerRender = () => {
    if (header) {
      return (
        <header className={`${prefixCls}-header`}>
          {header}
        </header>
      )
    }
    if (title || status) {
      return (
        <header style={headerStyle} className={`${prefixCls}-header-default`}>
          <div>{title}</div>
          {status && (
            <div className={classnameObj.status}></div>
          )}
        </header>
      )
    }
  }

  const footerRender = () => {
    if (footer) {
      return (
        <footer style={footerStyle} className={`${prefixCls}-footer`}>
          {footer}
        </footer>
      )
    }
  }

  return (
    <div style={{ ...(width ? { width } : {}), ...cardStyle }} className={classnameObj.comp}>
      {headerRender()}
      <main style={bodyStyle} className={`${prefixCls}-body`}>
        {children}
      </main>
      {footerRender()}
    </div>
  )
}
export default Card