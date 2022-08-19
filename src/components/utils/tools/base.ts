import { isArray, isBoolean, isUndefined } from "./is"

/**
 * 根据条件获取值
 */
export const getValueIfQualified = <O = unknown>(value: O, condition: boolean | boolean[]): O | undefined => {
  if (isBoolean(condition) && condition) {
    return value
  } else if (isArray(condition)) {
    const isHas = !isUndefined(condition.find(item => item === false))
    if (isHas) {
      return value
    }
  }
}

/**
 * 从对象中根据字符串获取值
 * @param initialValues 对象
 * @param fieldsString 
 * @returns 
 */
export const getValueFromObjectByString = (initialValues: Record<string, any>, fieldsString: string) => {
  const fieldNameArr = fieldsString?.split('.') || []
  const fieldNameLength = fieldNameArr.length
  let value = initialValues
  for (let index = 0; index < fieldNameLength; index++) {
    const fieldName = isNaN(Number(fieldNameArr[index])) ? fieldNameArr[index] : Number(fieldNameArr[index])
    value = value[fieldName]
  }
  return value
}
