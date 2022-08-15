import { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, isFunction } from "../utils/tools";
import { InputPropsType } from "./interface"

const Input: FC<InputPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-input`

  const {
    borders,
    type = 'text',
    label,
    value: valueProps = '',
    defaultValue = '',
    readOnly = false,
    height = 48,
    width = '100%',
    placeholder = '',
    prefix,
    suffix,
    addBefore,
    addAfter,
  } = props

  const key = `input-${type}-${label}`

  const [value, setValue] = useState(defaultValue)

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
    inputComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      `${prefixCls}-margin-right`,
      ...classNames,
      // 'flex'
    ]),
    input: (classNames: ClassNameType[] = []) => getClassNames([
      {
        [`${prefixCls}-margin-left`]: !!prefix,
        [`${prefixCls}-margin-right`]: !!suffix
      },
      ...classNames,
    ]),
    main: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-main`,
      `${prefixCls}-border-color`,
      {
        [`${prefixCls}-border-top`]: defaultBorders.top,
        [`${prefixCls}-border-right`]: defaultBorders.right && !addAfter,
        [`${prefixCls}-border-bottom`]: defaultBorders.bottom,
        [`${prefixCls}-border-left`]: defaultBorders.left && !addBefore,
      },
      ...classNames
    ]),
    label: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-label`,
      ...classNames,
    ]),
    addBorderBefore: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-border-color`,
      {
        [`${prefixCls}-border-top`]: defaultBorders.top,
        [`${prefixCls}-border-left`]: defaultBorders.left,
        [`${prefixCls}-border-right`]: defaultBorders.right,
        [`${prefixCls}-border-bottom`]: defaultBorders.bottom,
      },
      ...classNames,
    ]),
    addBorderAfter: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-border-color`,
      {
        [`${prefixCls}-border-top`]: defaultBorders.top,
        [`${prefixCls}-border-left`]: defaultBorders.left,
        [`${prefixCls}-border-right`]: defaultBorders.right,
        [`${prefixCls}-border-bottom`]: defaultBorders.bottom,
      },
      ...classNames,
    ])
  }

  const inputProps: JSX.IntrinsicElements['input'] = {
    id: key,
    title: key,
    type,
    readOnly,
    value,
    placeholder,
    className: classNamesObj.input(),
    onChange: (e) => {
      console.log('e', e.target.value);
      setValue(e.target.value)
    }
  }

  const getPrefix = () => {
    if (!prefix) {
      return
    }
    if (isFunction(prefix)) {
      return prefix(value)
    } else {
      return prefix
    }
  }

  const getSuffix = () => {
    if (!suffix) {
      return
    }
    if (isFunction(suffix)) {
      return suffix(value)
    } else {
      return suffix
    }
  }
  const getAddAfter = () => {
    if (!addAfter) {
      return
    }
    let getAddAfterRes = null
    if (isFunction(addAfter)) {
      getAddAfterRes = addAfter(value)
    } else {
      getAddAfterRes = addAfter
    }
    return (
      <div className={classNamesObj.addBorderAfter()}>
        {getAddAfterRes}
      </div>
    )
  }

  const getAddBefore = () => {
    if (!addBefore) {
      return
    }
    let getAddBeforeRes = null
    if (isFunction(addBefore)) {
      getAddBeforeRes = addBefore(value)
    } else {
      getAddBeforeRes = addBefore
    }
    return (
      <div className={classNamesObj.addBorderBefore()}>
        {getAddBeforeRes}
      </div>
    )
  }

  return (
    <div className={classNamesObj.inputComponent()}>
      {label && (
        <label className={classNamesObj.label()} htmlFor={key}>{label}</label>
      )}
      <div className="flex">
        {getAddBefore()}
        <main
          style={{
            height,
            width
          }}
          className={classNamesObj.main()}>
          {getPrefix()}
          <input {...inputProps} />
          {getSuffix()}
        </main>
        {getAddAfter()}
      </div>
    </div>
  )
}
export default Input