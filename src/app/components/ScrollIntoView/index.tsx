import React, { PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react"
import { useData } from "../../../components/utils/hooks"
import { Button } from "../../../components"
import styles from './style.module.less'

const ScrollIntoView = (props: PropsWithChildren) => {

  const data = useData<{
    children?: HTMLCollection
  }>({})
  const mainRef = useRef<HTMLElement>(null)

  const [list, setList] = useState<ReactNode[]>([])

  const [active, setActive] = useState(0)

  const getList = () => {
    const newList: ReactNode[] = []
    for (const iterator of data.children!) {
      newList.push(iterator.textContent)
    }
    setList(newList)
  }

  useEffect(() => {
    data.children = mainRef.current?.children
    getList()
  }, [])


  const liHandle = (index) => {
    try {
      data.children?.[index]?.scrollIntoView({
        behavior: 'smooth'
      })
      setActive(index)
    } catch (error) {

    }
  }

  return (
    <div className={styles.scrollIntoView}>
      <main ref={mainRef} className={styles.main}>
        {props.children}
      </main>
      <aside className={styles.nameList} >
        <ol className={styles.ol}>
          {list.map((item, index) => (
            <li key={index} onClick={() => liHandle(index)} >
              <Button buttonShowType="text" status={active === index ? 'primary' : 'default'}>
                {item}
              </Button>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  )
}

export default ScrollIntoView