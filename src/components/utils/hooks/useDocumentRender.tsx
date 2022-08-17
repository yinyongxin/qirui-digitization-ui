import { useEffect, useRef } from "react";
import { Root, createRoot } from "react-dom/client";

export const useDocumentRender = () => {
  const refFlag = useRef<{
    root: Root | null,
    div?: Element | DocumentFragment,
    isRender: boolean,
    isDestroy: boolean,
  }>({
    root: null,
    isRender: false,
    isDestroy: false,
  })


  /**
   * 设置root
   */
  const setRoot = () => {
    if (!refFlag.current.root) {
      refFlag.current.div = document.createElement('div');
      document.body.appendChild(refFlag.current.div);
      refFlag.current.root = createRoot(refFlag.current.div!);
    }
  }

  /**
   * 渲染
   * @param children 需要渲染的内容
   */
  const render = (children: React.ReactNode) => {
    setRoot()
    refFlag.current.root?.render(children)
    refFlag.current.isRender = true
  }

  /**
   * 销毁
   */
  const destroy = () => {
    try {
      document.body?.removeChild(refFlag.current.div!)
    } catch (error) {
    }
    refFlag.current.isDestroy = true
    refFlag.current.root = null
  }

  useEffect(() => {
    return () => {
      if (!refFlag.current.isDestroy || refFlag.current.isRender) {
        destroy()
      }
    }
  }, [])

  return {
    render,
    destroy,
    root: refFlag.current.root
  }
}