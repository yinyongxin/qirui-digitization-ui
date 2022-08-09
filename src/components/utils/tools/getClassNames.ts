type ClassNamesType = string[]
/**
 * 跟类名数组获取类名字符串
 * @param classNames 类名
 * @returns string className的值
 */
export const getClassNames = (classNames: ClassNamesType) => {
  return [...new Set(classNames)].join(' ');
}