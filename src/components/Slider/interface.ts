export interface SliderBaseType {
  /**
 * 滑动范围最小值
 * @default 0
 */
  min?: number
  /**
   * 滑动范围最大值
   * @default 100
   */
  max?: number
  /**
   * 步长
   * @default 1
   */
  step?: number

  /**
   * 	默认值
   */
  defaultValue?: SliderBaseType['value']

  /**
   * 值
   */
  value?: number | number[],

  /**
   * 选择值变化时触发
   */
  onChange?: (value: SliderBaseType['value']) => void

  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否是范围选择
   * @default undefault
   */

  range?: boolean | { draggableBar: boolean }
}

export type SliderPropsType = SliderBaseType & Pick<JSX.IntrinsicElements['div'], 'style' | 'className'>