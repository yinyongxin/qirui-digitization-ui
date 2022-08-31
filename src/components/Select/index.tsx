import { FC, MutableRefObject, useContext, useRef, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon";
import { DesignTypes } from "../typings";
import { ClassNameType, getClassNames, isFunction, isNumber, isString } from "../utils/tools";
import { SelectPropsType, ValueType } from "./interface"

const valuesMap: Map<DesignTypes['Option']['value'], DesignTypes['Option']> = new Map([])

const Select: FC<SelectPropsType> = (props) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const {
    placeholder = '请选择',
    options,
    multiple = false,
    name,
    width = 200,
    maxShow = 3,
    onValueChange,
    ...rest
  } = props

  const prefixCls = `${classNamePrefix}-select`

  const [value, setValue] = useState<ValueType>([])
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [mouseHover, setMouseHover] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectClassName = getClassNames([
    `${prefixCls}`,
  ])

  const selectMainClassName = getClassNames([
    `${prefixCls}-main`,
    optionsVisible ? `${prefixCls}-main-border` : '',
  ])

  const iconClassName = getClassNames([
    `${prefixCls}-icon`,
  ])

  const updateValueFn = (newValue: ValueType) => {
    setValue(newValue)
    onValueChange && onValueChange(newValue)
  }

  /**
   * 数据更新函数 更新数值并触发onValueChange
   * @param type 更新数值类型
   * @param data 数据
   */
  const updataValueFn = (
    type: 'delete' | 'add',
    data: {
      key?: DesignTypes['Option']['value'],
      updateValue?: DesignTypes['Option']['value'] | DesignTypes['Option']
    }
  ) => {
    const {
      key,
      updateValue
    } = data

    if (multiple) {
      if (type === 'add') {
        valuesMap.set(key as DesignTypes['Option']['value'], updateValue as DesignTypes['Option'])
      }
      if (type === 'delete') {
        valuesMap.delete(key as DesignTypes['Option']['value'])
      }
      const newUpdateValue = [...valuesMap.values()].map((valuesMapValue) => valuesMapValue.value)
      updateValueFn(newUpdateValue)
    } else {
      if (type === 'add') {
        updateValueFn([updateValue as DesignTypes['Option']['value']])
        setOptionsVisible(false)
      }
      if (type === 'delete') {
        updateValueFn([])
      }
    }

  }

  /**
   * 当为单选是渲染
   * @returns ReactNode
   */
  const valueRender = () => {
    const selectOption = options.find((option) => option.value === value?.[0])
    const selectValueLabelShow = typeof selectOption?.label === 'function' ? selectOption?.label(selectOption, true) : selectOption?.label
    return (
      <div className={`${prefixCls}-value`}>{selectValueLabelShow}</div>
    )
  }

  /**
  * 当为多选是渲染
  * @returns ReactNode
  */
  const valuesItemRenter = () => {
    const valuesMapKeys = [...valuesMap.keys()]
    return (
      <div className={`${prefixCls}-multiple-values`}>
        {valuesMapKeys.splice(0, maxShow).map((valuesMapKey) => {
          const valuesItem = valuesMap.get(valuesMapKey)
          const valuesItemLabel = valuesItem?.label
          if (isFunction(valuesItemLabel)) {
            valuesItemLabel(valuesItem as DesignTypes['Option'], true)
          }
          return (
            <div key={valuesMapKey} className={`${prefixCls}-multiple-values-item`}>
              <>
                {valuesItemLabel}
                <Icon
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    updataValueFn('delete', {
                      key: valuesMapKey
                    })
                  }}
                  icon="xmark"
                  size={12}
                />
              </>
            </div>
          )
        })}
        {value?.length! > maxShow && (
          <span className="flex align-end" style={{ padding: '2px 0', fontSize: 18 }}>
            {'...'}
          </span>
        )}
      </div>
    )
  }

  /**
   * 内容渲染
   * @returns 选项显示内容
   */
  const contentRender = () => {
    // 如果有值且为单选  则显示选择值
    if (!multiple && value?.length !== 0) {
      return valueRender()
      // 如果有值且为多选  则显示选择值
    } else if (multiple && value?.length !== 0) {
      return valuesItemRenter()
      // 如果没有值则显示 placeholder
    } else {
      return (
        <div className={`${prefixCls}-placeholder`}>{placeholder}</div>
      )
    }
  }

  /**
   * 右侧图标渲染
   * @returns Icon
   */
  const iconRender = () => {
    let iconRenderRes = <Icon icon="angle-down" />
    if (mouseHover && !multiple) {
      iconRenderRes = (
        <Icon
          icon="xmark"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (optionsVisible) {
              setOptionsVisible(false)
            }
            updateValueFn([])
          }}
        />
      )
    }
    return (
      <div className={iconClassName}>
        {iconRenderRes}
      </div>
    )
  }


  /**
   * 选项渲染
   * @returns options Node
   */
  const optionsRender = () => {
    const optionHandleClick = (option: DesignTypes['Option']) => {
      if (!multiple) {
        updataValueFn('add', {
          updateValue: option.value
        })
      } else {
        // 多选时没有选择则添加选择，有选择则删除选择
        if (!valuesMap.get(option.value)) {
          updataValueFn('add', {
            key: option.value,
            updateValue: option
          })
        } else {
          updataValueFn('delete', {
            key: option.value
          })
        }
      }
    }

    const optionsClassName = getClassNames([
      `${prefixCls}-options`,
      `${prefixCls}-options-overflow-5`
    ])

    return (
      <div
        className={optionsClassName}
      >
        {options.map(option => {
          let resOption = null

          const isSelected = multiple ? !!valuesMap.get(option.value) : value?.[0] === option.value

          let optionClassNameArr: ClassNameType[] = []

          if (isFunction(option.label)) {
            resOption = option.label(option, isSelected)
          } else {
            optionClassNameArr = [
              `${prefixCls}-option`,
              {
                [`${prefixCls}-option-selected`]: isSelected
              }
            ]
            resOption = option.label
          }

          return (
            <div
              key={option.value}
              onClick={() => {
                optionHandleClick(option)
              }}
              className={getClassNames(optionClassNameArr)}
            >
              {resOption}
            </div>
          )
        })}
      </div>
    )
  }

  const selectHandleClick = () => {
    setOptionsVisible(!optionsVisible)
    inputRef.current?.focus()
  }

  const getValue = () => {
    return JSON.stringify(value)
  }

  return (
    <div
      className={selectClassName}
      style={{
        width
      }}
      ref={selectRef}
    >
      <input
        name={name}
        readOnly
        title="select"
        type="text"
        value={getValue()}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <div
        onClick={() => selectHandleClick()}
        onMouseEnter={() => {
          setMouseHover(true)
        }}
        onMouseLeave={() => {
          setMouseHover(false)
        }}
        className={selectMainClassName}
      >
        {contentRender()}
        {iconRender()}
      </div>

      <div className={`${prefixCls}-options-centent`}>
        {optionsVisible && optionsRender()}
        {multiple && optionsVisible && (
          <div
            onClick={() => {
              setOptionsVisible(false)
            }}
            className={`${prefixCls}-option-end`}
          >
            选择结束
          </div>
        )}
      </div>
    </div>
  )
}

export default Select