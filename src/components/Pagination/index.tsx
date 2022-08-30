import React, { FC, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import { useData, useNotFirst } from "../utils/hooks"
import { ClassNameType, getClassNames, getStyles, isNumber } from "../utils/tools"
import { PaginationBaseType, PaginationPropsType, PartType } from "./interface"

// 分页组件
const Pagination: FC<PaginationPropsType> = (props, ref) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-pagination`

  const {
    style,
    total = 0,
    defaultConfig,
    onChange,
    sort = ['total', 'current', 'page', 'pageSize', 'jumper'],
    sizeOptions = [
      10,
      20,
      30,
      40,
      50,
    ],
    partsRender,
    className = '',
    ...rest
  } = props

  const [current, setCurrent] = useState(defaultConfig?.current || 1)
  const [pageSize, setPageSize] = useState(defaultConfig?.pageSize || sizeOptions[0])
  const [pageList, setPageList] = useState<number[]>([])


  const data = useData({
    pageCurrent: 0,
  })

  const pageNum = Math.ceil(total / pageSize)

  const setPageListFn = () => {
    const sub = pageNum - pageSize * data.pageCurrent
    const forValue = sub < 10 ? sub : pageSize
    const arr = []
    for (let index = 0; index < forValue; index++) {
      arr[index] = data.pageCurrent * pageSize + index + 1
    }
    setPageList(arr)
  }

  useMemo(() => {
    const floor = Math.floor((current - 1) / pageSize)
    if (data.pageCurrent !== floor) {
      data.pageCurrent = floor
      setPageListFn()
    }

    onChange?.(current, pageSize)
  }, [current, pageSize])

  useEffect(() => {
    setPageListFn()
  }, [total])

  const classNamesObj = {
    pagination: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      className,
      ...classNames
    ]),
    page: getClassNames([
      `${prefixCls}-page`,
    ])
  }
  const sytlesObj = {
    pagination: getStyles([
      style,
      {
        // gridTemplateColumns: `repeat(${sort.length}, 1fr)`,
        gridAutoFlow: 'column dense'
      },
    ])
  }

  const turnButtonFn = {
    prev: () => {
      if (current > 1) {
        setCurrent(current - 1)
      }
    },
    next: () => {
      if (current < pageNum) {
        setCurrent(current + 1)
      }
    }
  }

  const turnButton = {
    prev: () => {
      const disabled = current === 1
      return partsRender?.turnButton?.prev ? (
        <div onClick={() => turnButtonFn.prev()}>
          {partsRender.turnButton.prev(current === 1)}
        </div>
      ) : (
        <Button
          disabled={disabled}
          size='small'
          onClick={() => turnButtonFn.prev()}
        >Prev</Button>
      )
    },
    next: () => {
      const disabled = current >= pageNum
      return partsRender?.turnButton?.next ? (
        <div onClick={() => turnButtonFn.next()}>
          {partsRender.turnButton.next(disabled)}
        </div>
      ) : (
        <Button
          size='small'
          disabled={disabled}
          onClick={() => turnButtonFn.next()}
        >Next</Button>
      )
    }
  }

  const parts: Record<PartType, () => ReactNode> = {
    page: () => {
      return (
        <>
          {turnButton.prev()}
          {pageList.map(item => {
            const checked = item === current
            return (
              partsRender?.pageItem ? (
                <div onClick={() => setCurrent(item)}>{partsRender.pageItem(checked)}</div>
              ) : (
                <Button
                  level={checked ? 'white' : 'main'}
                  onClick={() => setCurrent(item)}
                  key={item}
                  size='small'
                >
                  {item}
                </Button>
              )
            )
          })}
          {turnButton.next()}
        </>
      )
    },
    current: () => {
      return (
        <>
          {current}
        </>
      )
    },
    pageSize: () => {
      return (
        <>
          {pageSize}
        </>
      )
    },
    total: () => {
      return (
        <>
          {total}
        </>
      )
    },
    jumper: () => {
      return (
        'jumper'
      )
    }
  }

  return (
    <div style={sytlesObj.pagination} className={classNamesObj.pagination()}>
      {sort.map(item => (
        <div key={item} className={`${prefixCls}-${item}`}>
          {parts[item]()}
        </div>
      ))}
    </div>
  )
}
export default Pagination