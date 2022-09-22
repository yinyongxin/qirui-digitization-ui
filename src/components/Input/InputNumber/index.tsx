import { FC, useContext, useMemo, useState } from "react"
import { FormContext } from "../../Form/Context";
import { FormItemContext } from "../../Form/Context";
import { GlobalContext } from "../../config/globalContext"
import { ClassNameType, getClassNames, isFunction, getValueIfQualified, isUndefined, omit, setObjectValueByString } from "../../utils/tools";
import { InputNumberPropsType } from "./interface"
import { useRef } from "react";
import { InputDataRef } from "../interface";

const InputNumber: FC<InputNumberPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const prefixCls = `${classNamePrefix}-inputNumber`

  const formItemContent = useContext(FormItemContext);
  const formContent = useContext(FormContext);

  const dataRef = useRef<InputDataRef>({
    focusState: 'blur',
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
    placeholder,
    style,
    className,
    inputAttributes,
    name,
  } = {
    ...formItemContent,
    ...props
  }

  // 是否为受控组件
  const isControll = formContent.inForm || !isUndefined(valueProps)

  const [value, setValue] = useState(valueProps)


  useMemo(() => {
    if (formContent.inForm) {
      setValue(valueProps || '')
    }
  }, [valueProps])

  const defaultBorders = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    ...borders
  }

  const classNamesObj = {
    inputNumberComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      className,
      `${classNamePrefix}-border-color-default`,
      `${classNamePrefix}-border-sm`,
      {
        [`${classNamePrefix}-border-top`]: defaultBorders.top,
        [`${classNamePrefix}-border-right`]: defaultBorders.right,
        [`${classNamePrefix}-border-bottom`]: defaultBorders.bottom,
        [`${classNamePrefix}-border-left`]: defaultBorders.left,
        [`${prefixCls}-padding-left`]: !addBefore,
        [`${prefixCls}-padding-right`]: !addAfter
      },
      ...classNames,
    ]),
    inputNumber: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-input`,
      inputAttributes?.className,
      {
        [`${prefixCls}-padding-left`]: !!prefix || !!addBefore,
        [`${prefixCls}-padding-right`]: !!suffix || !!addAfter
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

  const innerMethods = formContent.store?.getInnerMethods()

  const inFormObj = {
    valueChange: (newAalue: number | undefined) => {
      innerMethods?.innerSetFieldValue(name, newAalue)
      formContent?.onChange?.({ [name]: value }, formContent.store?.getFields(), { [name]: value })
    }
  }

  const inputProps: JSX.IntrinsicElements['input'] = {
    type: 'number',
    name,
    id: name,
    className: classNamesObj.inputNumber(),
    readOnly,
    ...(isControll ? {
      value: isUndefined(value) ? '' : value,
    } : {
      defaultValue,
    }),
    onFocus: () => {
      dataRef.current.focusState = 'focus'
    },
    placeholder,
    onBlur: () => {
      dataRef.current.focusState = 'blur'
    },
    onChange: (e) => {
      const newValue = e.target.value ? Number(e.target.value) : undefined
      onChange && onChange(newValue, e)
      inFormObj.valueChange(newValue)
      if (isControll) {
        setValue(newValue)
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
      className={classNamesObj.inputNumberComponent()}
    >
      {before.addBefore()}
      {before.prefix()}
      <input {...inputProps} />
      {after.suffix()}
      {after.addAfter()}
    </div>
  )
}
export default InputNumber