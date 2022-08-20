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
 * 从对象中根据字符串获取值 速度比递归的快
 * @param initialValues 对象
 * @param fieldsString 
 */
export const getValueFormObjectByString = <R = unknown>(initialValues: Record<string, any>, fieldNames: string | (string | number)[]): R => {
  const fieldNameArr = isArray(fieldNames) ? fieldNames : fieldNames?.split('.')
  const fieldNameLength = fieldNameArr.length
  let value = initialValues
  for (let index = 0; index < fieldNameLength; index++) {
    const fieldName = isNaN(Number(fieldNameArr[index])) ? fieldNameArr[index] : Number(fieldNameArr[index])
    value = value[fieldName]
  }
  return value as R
}

/**
 * 从对象中根据字符串获取值 递归
 * @param initialValues 对象
 * @param fieldsString 
 */
export const getValueFormObjectByStringDeep = <R = unknown>(initialValues: Record<string, any>, fieldNames: string | (string | number)[]): R => {
  const fieldNameArr = isArray(fieldNames) ? fieldNames : fieldNames?.split('.')
  const fieldNameArrFrist = fieldNameArr.shift()
  const fieldName = isNaN(Number(fieldNameArrFrist)) ? fieldNameArrFrist : Number(fieldNameArrFrist)
  if (fieldNameArr.length === 0) {
    return initialValues[(fieldName)!]
  } else {
    return getValueFormObjectByStringDeep(initialValues, fieldNameArr.join('.'))
  }
}

/**
 * 设置值通过string
 * @param initialValues 
 * @param {string} fieldsString 
 * @param newValue 
 * @param options 
 * @returns oldValue 是否返回旧值
 * @returns allValue 是否返回旧值
 */
export const setObjectValueByString = (
  initialValues: Record<string, any>,
  fieldsString: string,
  newValue: any,
  options?: {
    returnOldValue: boolean
    returnAllValue: boolean
  }
) => {
  const {
    returnOldValue,
    returnAllValue
  } = {
    returnOldValue: false,
    returnAllValue: false,
    ...options
  }
  const fieldNameArr = fieldsString?.split('.') || []
  const fieldNameLength = fieldNameArr.length
  let value = initialValues
  for (let index = 0; index < fieldNameLength - 1; index++) {
    const fieldName = isNaN(Number(fieldNameArr[index])) ? fieldNameArr[index] : Number(fieldNameArr[index])
    value = value[fieldName]
  }
  const oldValue = value[fieldNameArr[fieldNameLength - 1]]

  value[fieldNameArr[fieldNameLength - 1]] = newValue

  return {
    ...getValueIfQualified({
      allValue: initialValues
    }, returnAllValue),
    ...getValueIfQualified({
      oldValue
    }, returnOldValue)
  }
}
