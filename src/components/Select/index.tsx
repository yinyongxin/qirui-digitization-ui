import { FC, MutableRefObject, useContext, useRef, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon";
import { DesignTypes } from "../typings";
import { getClassNames, isFunction, isNumber, isString } from "../utils/tools";
import { SelectPropsType } from "./interface"

const valuesMap: Map<DesignTypes['Option']['value'], DesignTypes['Option']> = new Map([])

const Select: FC<SelectPropsType> = (props) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);


  const prefixCls = `${classNamePrefix}-select`

  const [value, setValue] = useState<DesignTypes['Option']['value'] | DesignTypes['Option']['value'][]>()
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [selectRef, setSelectRef] = useState<HTMLDivElement>()


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
      setValue(newUpdateValue)
      onValueChange && onValueChange(newUpdateValue)
    } else {
      if (type === 'add') {
        setValue(updateValue as DesignTypes['Option']['value'])
        onValueChange && onValueChange(updateValue as DesignTypes['Option']['value'])
        setOptionsVisible(false)
      }
      if (type === 'delete') {
        setValue(undefined)
        onValueChange && onValueChange(undefined)
      }
    }

  }



  const contentRender = () => {

    /**
     * 当为单选是渲染
     * @returns ReactNode
     */
    const valueRender = () => {
      const selectOption = options.find((option) => option.value === value)
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
          {(value as [])?.length > maxShow && (
            <span className="flex align-end" style={{ padding: '2px 0', fontSize: 18 }}>
              {'...'}
            </span>
          )}
        </div>
      )
    }

    // 如果有值且为单选  则显示选择值
    if (!multiple && isNumber(value) || isString(value)) {
      return valueRender()
      // 如果有值且为多选  则显示选择值
    } else if (multiple && Array.isArray(value) && value.length !== 0) {
      return valuesItemRenter()
      // 如果没有值则显示 placeholder
    } else {
      return (
        <div className={`${prefixCls}-placeholder`}>{placeholder}</div>
      )
    }
  }


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

          const isSelected = multiple ? !!valuesMap.get(option.value) : value === option.value

          let optionClassNameArr: string[] = []

          if (isFunction(option.label)) {
            resOption = option.label(option, isSelected)
          } else {
            optionClassNameArr = [
              `${prefixCls}-option`,
              isSelected ? `${prefixCls}-option-selected` : ''
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
  }

  const getValue = () => {
    if (multiple && Array.isArray(value)) {
      return value?.join(',')
    } else if (multiple && (typeof value === "number" || typeof value === "string")) {
      return value
    }
    return ''
  }

  return (
    <div
      className={selectClassName}
      style={{
        width
      }}
      ref={ref => setSelectRef(ref as React.SetStateAction<HTMLDivElement | undefined>)}
    >
      <input
        name={name}
        readOnly
        title="select"
        type="text"
        value={getValue()}
        style={{ display: 'none' }}
      />
      <div
        onClick={() => selectHandleClick()}
        className={selectMainClassName}
      >
        {contentRender()}
        <div className={iconClassName}>
          <Icon icon="angle-down" />
        </div>
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