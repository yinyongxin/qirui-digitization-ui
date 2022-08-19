import { FC, useContext, useState } from "react"
import { FormContext } from "../../Form/FormContext";
import { FormItemContext } from "../../Form/FormItemContext";
import { GlobalContext } from "../../config/globalContext"
import { ClassNameType, getClassNames, isFunction, getValueIfQualified, isUndefined, omit } from "../../utils/tools";
import { InputTextPropsType } from "./interface"

const InputText: FC<InputTextPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const formItemContent = useContext(FormItemContext);
  const formContent = useContext(FormContext);
  console.log('formItemContent', formItemContent);

  const prefixCls = `${classNamePrefix}-inputText`

  const {
    borders,
    type = 'text',
    value: valueProps,
    defaultValue,
    readOnly = false,
    height = 48,
    width = '100%',
    prefix,
    suffix,
    addBefore,
    addAfter,
    onChange,
    style,
    className,
    inputAttributes
  } = {
    ...formItemContent,
    ...props
  }

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
      className,
      `${classNamePrefix}-border-color-default`,
      `${classNamePrefix}-border-sm`,
      {
        [`${classNamePrefix}-border-top`]: defaultBorders.top,
        [`${classNamePrefix}-border-right`]: defaultBorders.right,
        [`${classNamePrefix}-border-bottom`]: defaultBorders.bottom,
        [`${classNamePrefix}-border-left`]: defaultBorders.left,
      },
      ...classNames,
    ]),
    inputText: (classNames: ClassNameType[] = []) => getClassNames([
      inputAttributes?.className,
      {
        [`${prefixCls}-margin-left`]: !!prefix,
        [`${prefixCls}-margin-right`]: !!suffix
      },
      ...classNames,
    ]),
    addBorderBefore: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-h100`,
      `${classNamePrefix}-border-sm`,
      `${classNamePrefix}-border-color-default`,
      `${classNamePrefix}-border-right`,
      ...classNames,
    ]),
    addBorderAfter: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-h100`,
      `${classNamePrefix}-border-sm`,
      `${classNamePrefix}-border-color-default`,
      `${classNamePrefix}-border-left`,
      ...classNames,
    ])
  }

  const inputProps: JSX.IntrinsicElements['input'] = {
    type: 'text',
    className: classNamesObj.inputText(),
    readOnly,
    defaultValue,
    ...getValueIfQualified({
      value
    }, !isUndefined(valueProps)),
    onChange: (e) => {
      onChange && onChange(e.target.value, e)
      if (!isUndefined(valueProps)) {
        setValue(e.target.value)
      }
    },
    ...omit(inputAttributes || {}, ['className'])
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
      style={{ width, height, ...style }}
      className={classNamesObj.inputTextComponent()}
    >
      {getAddBefore()}
      {getPrefix()}
      <input {...inputProps} />
      {getSuffix()}
      {getAddAfter()}
    </div>
  )
}
export default InputText