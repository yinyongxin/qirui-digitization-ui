import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, isArray, isNumber } from "#/utils/tools"
import { SliderPropsType } from "./interface"
import { useData } from "../utils/hooks"

const Slider = (props: SliderPropsType) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-slider`

  const {
    min = 0,
    max = 100,
    range,
    defaultValue = range ? [0, 0] : 0,
    value: valueProps,
    step = 1,
    onChange,
    disabled = false,
    className,
    ...rest
  } = props

  const [value, setValue] = useState<number | number[]>(defaultValue)

  useEffect(() => {
    if (valueProps) {
      setValue(valueProps)
    }
  }, [valueProps])

  const sliderRef = useRef<HTMLDivElement>(null)

  const data = useData({
    mouseDown: false,
  })

  const classNamesObj = {
    slider: getClassNames([
      `${prefixCls}`,
      {
        [`${prefixCls}-disabled`]: disabled
      },
      className
    ]),
    button: getClassNames([
      `${prefixCls}-button`,
      {
        [`${prefixCls}-button-disabled`]: disabled
      },
    ]),
    bar: getClassNames([
      `${prefixCls}-bar`,
    ])
  }

  const buttonRender = () => {
    return (
      <>
        {range && (
          <div
            className={classNamesObj.button}
            style={{
              left: `calc(${(isNumber(value) ? value : value[0]) / max * 100}% - 8px)`,
            }}

          ></div>
        )}
        <div
          className={classNamesObj.button}
          style={{
            left: `calc(${(isNumber(value) ? value : value[1]) / max * 100}% - 8px)`,
          }}
        ></div>
      </>
    )
  }

  const getValue = (proportion: number) => {
    let res
    if (proportion <= 0) {
      res = 0 * max
    } else if (proportion >= 1) {
      res = 1 * max
    } else {
      res = proportion * max
    }
    return Math.trunc(res)
  }

  const setButtonPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      return
    }
    const boundingClientRect: DOMRect = sliderRef.current?.getBoundingClientRect()!
    // 比例
    const proportion = (e.clientX - boundingClientRect?.left) / e.currentTarget.clientWidth
    // 当前位置
    const thisPostion = getValue(proportion)
    let newValue = value
    if (isArray(value)) {
      const num1 = Math.abs(thisPostion - value[0])
      const num2 = Math.abs(thisPostion - value[1])
      const buttonName = num1 < num2 ? 'left' : 'right'
      const valueObj = {
        left: [thisPostion, value[1]],
        right: [value[0], thisPostion]
      }
      newValue = valueObj[buttonName]
    } else {
      newValue = thisPostion
    }
    if (thisPostion % step === 0) {
      onChange?.(newValue)
    }
    setValue(newValue)
  }

  return (
    <>

      <div
        onMouseDown={(e) => {
          setButtonPosition(e)
          data.mouseDown = true
        }}
        onMouseUp={() => {
          data.mouseDown = false
        }}
        onMouseLeave={() => {
          data.mouseDown = false
        }}
        onMouseMove={(e) => {
          if (data.mouseDown) {
            setButtonPosition(e)
          }
        }}
        ref={sliderRef}
        className={classNamesObj.slider}
        {...rest}
      >
        <div
          className={classNamesObj.bar}
          style={{
            left: `${(isNumber(value) ? min : value[0]) / max * 100}%`,
            right: `${100 - (isNumber(value) ? value : value[1]) / max * 100}%`
          }}
        ></div>
        {buttonRender()}
      </div>
    </>
  )
}
export default Slider