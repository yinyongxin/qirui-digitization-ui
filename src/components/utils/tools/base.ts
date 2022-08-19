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
