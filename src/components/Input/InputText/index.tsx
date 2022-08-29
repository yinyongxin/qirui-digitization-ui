import { FC, useContext, useMemo, useState } from "react"
import { FormContext } from "../../Form/Context";
import { FormItemContext } from "../../Form/Context";
import { GlobalContext } from "../../config/globalContext"
import { ClassNameType, getClassNames, isFunction, getValueIfQualified, isUndefined, omit, setObjectValueByString } from "../../utils/tools";
import { InputTextPropsType } from "./interface"
import { useRef } from "react";
import { InputDataRef } from "../interface";
import { useNotFirst } from "../../utils/hooks";

const InputText: FC<InputTextPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const prefixCls = `${classNamePrefix}-inputText`

  const formItemContent = useContext(FormItemContext);
  const formContent = useContext(FormContext);
  // console.log('formItemContent', formItemContent);

  const dataRef = useRef<InputDataRef>({
    focusState: 'blur'
  })

  const {
    borders,
    value: valueProps,
    defaultValue,
    readOnly = false,
    height = 48,
    width,
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

  const [value, setValue] = useState('')

  useMemo(() => {
    setValue(valueProps || defaultValue || '')
  }, [valueProps])

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

  const inFormObj = {
    valueChange: (newAalue: string) => {
      const innerMethods = formContent.store?.getInnerMethods()
      innerMethods?.innerSetFieldValue(name, newAalue)
      const allValue = formContent.store?.getFields()
      if (dataRef.current.focusState === 'focus') {
        formContent?.onChange?.({ [name]: value }, allValue, { [name]: value })
      }
      formContent?.onValuesChange?.({ [name]: value }, allValue, { [name]: value })
    }
  }

  const inputProps: JSX.IntrinsicElements['input'] = {
    type: 'text',
    name,
    id: name,
    className: classNamesObj.inputText(),
    readOnly,
    defaultValue,
    ...getValueIfQualified({
      value,
    }, !isUndefined(valueProps)),
    onFocus: () => {
      dataRef.current.focusState = 'focus'
    },
    onBlur: () => {
      dataRef.current.focusState = 'blur'
    },
    onChange: (e) => {
      onChange && onChange(e.target.value, e)
      if (formContent.inForm) {
        inFormObj.valueChange(e.target.value)
      }
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