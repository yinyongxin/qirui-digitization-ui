import React from "react";
import { isFunction, isString } from "./is";

export type ClassNameType = (string | Record<string, boolean | undefined>)
export type StyleType = React.CSSProperties | (() => {
  condition: boolean,
  style: React.CSSProperties
})
/**
 * 跟类名数组获取类名字符串
 * @param classNames 类名
 * @returns string className的值
 */
export const getClassNames = (classNames: ClassNameType[]) => {
  const classNameArr: string[] = []
  classNames.forEach(className => {
    if (isString(className)) {
      classNameArr.push(className)
    } else {
      Object.keys(className).forEach(key => {
        if (className[key]) {
          classNameArr.push(key)
        }
      })
    }
  });
  return classNameArr.join(' ');
}

/**
 * 获取style
 * @param styles CSSProperties
 * @returns 
 */
export const getStyles = (styles: StyleType[]) => {
  let styleObj: React.CSSProperties = {}
  styles.forEach(style => {
    if (!isFunction(style)) {
      styleObj = { ...styleObj, ...style }
    } else {
      const res = style()
      styleObj = { ...styleObj, ...(res.condition ? res.style : {}) }
    }
  });
  return styleObj || ((styles: StyleType[]) => getStyles(styles))
} 