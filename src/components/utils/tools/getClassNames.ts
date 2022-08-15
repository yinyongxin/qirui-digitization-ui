import { isString } from "./is";

export type ClassNameType = (string | Record<string, boolean | undefined>)
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