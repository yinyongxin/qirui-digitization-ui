import { useRef } from "react";
import { Root, createRoot } from "react-dom/client";

export const useDocumentRender = () => {
  const refFlag = useRef<{
    root: Root | null,
    div?: Element | DocumentFragment
  }>({
    root: null
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
  }

  /**
   * 销毁
   */
  const destroy = () => {
    document.body?.removeChild(refFlag.current.div!)
    refFlag.current.root = null
  }


  return {
    render,
    destroy
  }
}