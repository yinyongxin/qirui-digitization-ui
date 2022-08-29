import React, { FC, ReactNode, useContext, useEffect, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import { useNotFirst } from "../utils/hooks"
import { ClassNameType, getClassNames, getStyles } from "../utils/tools"
import { PaginationPropsType, PartType } from "./interface"

// 分页组件
const Pagination: FC<PaginationPropsType> = (props, ref) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-pagination`

  const {
    style,
    current: currentProps,
    pageSize: pageSizeProps,
    total: totalProps = 0,
    defaultConfig,
    onChange,
    sort = ['total', 'current', 'page', 'pageSize', 'jump'],
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

  const [current, setCurrent] = useState(currentProps || defaultConfig?.current || 1)
  const [pageCurrent, setPageCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(sizeOptions[0])
  const [total, setTotal] = useState(totalProps)
  const [pageList, setPageList] = useState<number[]>([])


  useEffect(() => {
    onChange?.(current, pageSize)
  }, [current, pageSize])

  useEffect(() => {
    const surplus = total - pageSize * pageCurrent
    const forValue = surplus > 0 ? pageSize : pageSize + surplus
    const arr = []
    for (let index = 0; index < forValue; index++) {
      arr[index] = (pageCurrent - 1) * pageSize + index + 1
    }
    setPageList(arr)
    onChange?.(arr[0], pageSize)
    setCurrent(arr[0])
  }, [pageCurrent])

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
      if (pageCurrent > 1) {
        setPageCurrent(pageCurrent - 1)
      }
    },
    next: () => {
      if (pageCurrent < total / pageSize) {
        setPageCurrent(pageCurrent + 1)
      }
    }
  }

  const turnButton = {
    prev: () => {
      return partsRender?.turnButton ? (
        <div onClick={() => turnButtonFn.prev()}>{partsRender.turnButton.prev?.()}</div>
      ) : (
        <Button size='small' onClick={() => turnButtonFn.prev()}>Prev</Button>
      )
    },
    next: () => {
      return partsRender?.turnButton ? (
        <div onClick={() => turnButtonFn.next()}>{partsRender.turnButton.next?.()}</div>
      ) : (
        <Button size='small' onClick={() => turnButtonFn.next()}>Next</Button>
      )
    }
  }

  const parts: Record<PartType, () => ReactNode> = {
    page: () => {
      return (
        <div className={classNamesObj.page}>
          {turnButton.prev()}
          {pageList.map(item => (
            partsRender?.turnButton ? (
              <div onClick={() => setCurrent(item)}>{partsRender.pageItem?.()}</div>
            ) : (
              <Button level={item === current ? 'white' : 'main'} onClick={() => setCurrent(item)} key={item} size='small'>
                {item}
              </Button>
            )
          ))}
          {turnButton.next()}
        </div>
      )
    },
    current: () => {
      return (
        <div>
          {current}
        </div>
      )
    },
    pageSize: () => {
      return (
        <div>
          {pageSize}
        </div>
      )
    },
    total: () => {
      return (
        <div>
          {total}
        </div>
      )
    },
    jump: () => {
      return (
        'jump'
      )
    }
  }

  return (
    <ul style={sytlesObj.pagination} className={classNamesObj.pagination()}>
      {sort.map(item => (
        <li key={item} className={`${prefixCls}-${item}`}>
          {parts[item]()}
        </li>
      ))}
    </ul>
  )
}
export default Pagination