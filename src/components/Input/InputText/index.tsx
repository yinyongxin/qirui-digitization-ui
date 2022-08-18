import { FC, useContext, useState } from "react"
import { GlobalContext } from "../../config/globalContext"
import { ClassNameType, getClassNames, isFunction } from "../../utils/tools";
import { InputTextPropsType } from "./interface"

const InputText: FC<InputTextPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-inputText`

  const {
    borders,
    type = 'text',
    value: valueProps,
    defaultValue = '',
    readOnly = false,
    height = 48,
    width = 'unset',
    prefix,
    suffix,
    addBefore,
    addAfter,
    onChange,
    ...rest
  } = props

  const [value, setValue] = useState(valueProps || defaultValue)

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
    inputTextComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      `${prefixCls}-margin-right`,
      ...classNames,
      // 'flex'
    ]),
    inputText: (classNames: ClassNameType[] = []) => getClassNames([
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
    type: 'text',
    readOnly,
    value,
    className: classNamesObj.inputText(),
    onChange: (e) => {
      onChange && onChange(e.target.value, e)
      setValue(e.target.value)
    },
    ...rest
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
    <div
      style={{
        width
      }}
      className={classNamesObj.inputTextComponent()}
    >
      <div className="flex">
        {getAddBefore()}
        <main
          style={{
            height,
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
export default InputText