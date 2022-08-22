import { FC, useContext, useState } from "react"
import { FormContext } from "../../Form/FormContext";
import { FormItemContext } from "../../Form/FormItemContext";
import { GlobalContext } from "../../config/globalContext"
import { ClassNameType, getClassNames, isFunction, getValueIfQualified, isUndefined, omit, setObjectValueByString } from "../../utils/tools";
import { InputTextPropsType } from "./interface"

const InputText: FC<InputTextPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const prefixCls = `${classNamePrefix}-inputText`

  const formItemContent = useContext(FormItemContext);
  const formContent = useContext(FormContext);
  // console.log('formItemContent', formItemContent);

  const {
    borders,
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
    inputAttributes,
    name,
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
        [`${prefixCls}-margin-left`]: !!prefix || !!addBefore,
        [`${prefixCls}-margin-right`]: !!suffix || !!addAfter
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
    name,
    className: classNamesObj.inputText(),
    readOnly,
    defaultValue,
    ...getValueIfQualified({
      value,
    }, !isUndefined(valueProps)),
    onChange: (e) => {
      onChange && onChange(e.target.value, e)

      const {
        allValue: allValue1,
      } = setObjectValueByString(formContent.allValue!, name, e.target.value, {
        returnAllValue: true,
      })
      console.log('allValue1', allValue1);


      const {
        allValue,
        oldValue
      } = setObjectValueByString(formContent.initialValues!, name, e.target.value, {
        returnAllValue: true,
        returnOldValue: true,
      })
      formContent?.onValuesChange?.(e.target.value! as any, allValue as any, oldValue)
      if (!isUndefined(valueProps)) {
        setValue(e.target.value)
      }
    },
    ...omit(inputAttributes || {}, ['className'])
  }

  /**
   * 输入框前
   */
  const before = {
    //前缀
    prefix: () => {
      if (!prefix) {
        return
      }
      if (isFunction(prefix)) {
        return prefix(value)
      } else {
        return prefix
      }
    },
    // 输入框前
    addBefore: () => {
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
  }
  /**
   * 输入框后
   */
  const after = {
    //后缀
    suffix: () => {
      if (!suffix) {
        return
      }
      if (isFunction(suffix)) {
        return suffix(value)
      } else {
        return suffix
      }
    },
    // 输入框后
    addAfter: () => {
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
  }

  return (
    <div
      style={{ width, height, ...style }}
      className={classNamesObj.inputTextComponent()}
    >
      {before.addBefore()}
      {before.prefix()}
      <input {...inputProps} />
      {after.suffix()}
      {after.addAfter()}
    </div>
  )
}
export default InputText