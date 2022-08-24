/**
 * className获取Element对象 有则直接获取，没有则创建
 * @param className 类名
 * @param config 配置项
 * @returns 
 */
export const getElement = (
  className: string,
  config?: {
    attributes?: { qualifiedName: string, value: string }[]
  }
): [
    Element,
    {
      destory: () => void
    }
  ] => {

  const classNames = [className]
  let element = document.querySelector(`.${className}`)
  if (!element) {
    const modalsContent = document.createElement('div');
    config?.attributes?.forEach(({
      qualifiedName,
      value
    }) => {
      if (qualifiedName === 'class') {
        classNames.push(value)
      } else {
        modalsContent.setAttribute(qualifiedName, value);
      }
    })
    modalsContent.setAttribute('class', classNames.join(''));
    document.body.appendChild(modalsContent);
    element = document.querySelector(`.${className}`);
  }
  return [
    element!,
    {
      destory: () => {
        if (element) {
          document.body.removeChild(element)
        }
      }
    }
  ]
}