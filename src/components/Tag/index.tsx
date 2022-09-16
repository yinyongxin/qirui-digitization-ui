import { FC, useContext, useEffect, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon";
import { getClassNames, getStyles } from "../utils/tools";
import { TagPropsType } from "./interface"
const Tag: FC<TagPropsType> = (props, ref) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const prefixCls = `${classNamePrefix}-tag`
  const {
    size = 'default',
    children,
    color,
    visible,
    closable,
    onClose,
    checkable,
    checked,
    defaultChecked,
    onCheck,
    className,
    style
  } = props
  const [visibleTag, setVisibleTag] = useState<boolean>(true);
  const [checkTag, setCheckTag] = useState<boolean>(false);
  const checkColor = () => {
    if (checkTag) {
      if ('color' in props) {
        return color
      }
      else {
        return "#2b2b2b"
      }
    }
    else {
      return "transparent"
    }
  }
  const classNamesObj = {
    comp: getClassNames([
      `${prefixCls}`,
      `${prefixCls}-size-${size}`,
      className
    ])
  }
  const stylesObj = {
    tag: getStyles([
      style,
      {
        backgroundColor: "checkable" in props ? checkColor() : color,

        border: `1px solid ${color}`
      },
    ])
  }

  const onHandel = () => {
    onClose && onClose(!visibleTag)
  }
  useEffect(() => {
    if ("closable" in props) {
      if (visible) {
        setVisibleTag(true)
      }
      else {
        setVisibleTag(false)
      }
    }
  }, [visible])
  useEffect(() => {
    if ("checkable" in props) {
      if (checked || "defaultChecked" in props) {
        setCheckTag(true)
      }
      else {
        setCheckTag(false)
      }
    }
  }, [checked])

  return (
    <>
      {visibleTag && <div className={classNamesObj.comp} style={stylesObj.tag} onClick={() => {
        if ('checked' in props) {
          onCheck && onCheck(!checkTag)
        }
        else {
          setCheckTag(!checkTag)
        }
      }}>
        {children}
        {"closable" in props && <Icon icon="xmark" style={{ fontSize: '12px' }} onClick={onHandel} />}
      </div>}
    </>

  )
}
export default Tag