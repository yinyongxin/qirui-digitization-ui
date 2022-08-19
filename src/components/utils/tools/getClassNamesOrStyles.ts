import React from "react";
import { isFunction, isString, isUndefined, getValueIfQualified } from "./index";

export type ClassNameType = string | Record<string, boolean | undefined> | undefined

export type StyleType = React.CSSProperties & {
  style?: React.CSSProperties,
  condition?: boolean | boolean[]
} | undefined
/**
 * 跟类名数组获取类名字符串
 * @param classNames 类名
 * @returns string className的值
 */
export const getClassNames = (classNames: ClassNameType[]) => {
  const classNameArr: string[] = []
  classNames.forEach(className => {
    if (!className) {
      return
    } else if (isString(className)) {
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
export const getStyles = (styles?: StyleType[]) => {
  let styleObj: React.CSSProperties = {}
  styles?.forEach(style => {
    if (!style) {
      return
    } else if (isUndefined(style.condition)) {
      styleObj = { ...styleObj, ...style }
    } else {
      styleObj = { ...styleObj, ...getValueIfQualified(style.style, style.condition) }
    }
  });
  return styleObj
}