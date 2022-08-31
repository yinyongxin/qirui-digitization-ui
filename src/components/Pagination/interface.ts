import { CSSProperties, ReactNode } from "react"

export type PartType = 'pageSize' | 'total' | 'current' | 'page' | 'jumper'

export interface PaginationBaseType {
  /**
   * √
   */
  style?: CSSProperties;
  /**
  * √
  */
  className?: string | string[];
  /**
   * √
   * @zh 数据总数
   * @en Total number of data
   */
  total?: number;
  /**
   * √
   * 默认配置
   */
  defaultConfig?: {
    pageSize?: number,
    current?: number,
  }
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * √
   * @zh 是否在只有一页的情况下隐藏
   * @en Whether to hide when there is only one page
   * @version 2.6.0
   */
  hideOnSinglePage?: boolean;
  /**
   * √
   * 排序和控制显示隐藏
   */
  sort?: PartType[]
  /**
   * @zh 定制结构
   * @en Customized structure
   */
  partsRender?: {
    pageSize?: () => ReactNode,
    current?: () => ReactNode,
    total?: () => ReactNode,
    jumper?: () => ReactNode,
    pageItem?: (checked: boolean) => ReactNode,
    turnButton?: {
      prev?: (isFirst: boolean) => ReactNode
      next?: (isLast: boolean) => ReactNode
    }
  };
  /**
   * @zh 分页器尺寸
   * @en pager size
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * √
   * @zh 每页可以显示数据条数
   * @en The number of data items that can be displayed per page
   */
  sizeOptions?: number[];
  /**
   * @zh `current` 页与 `...` 之间的页码个数
   * @en the number of pages between the `current` page and `...`
   * @defaultValue 2
   * @version 2.32.0
   */
  bufferSize?: number;
  /**
   * √
   * @zh 变化时的回调
   * @en Callback when page changes
   */
  onChange?: (current: number, pageSize: number) => void;
  /**
   * @zh `pageSize` 改变的时候重置当前页码为 `1`
   * @en When pageSize changes, resets the current page number to `1`
   * @defaultValue true
   */
  pageSizeChangeResetCurrent?: boolean;
  /**
   * @zh 是否应用精简分页模式
   * @en Whether to use simplified pagination mode
   */
  simple?: boolean;
  /**
   * @zh 是否显示更多页码提示（当尚无法计算数据总数时可以使用）
   * @en Whether to show more page number tips (can be used when the total number of data cannot be calculated yet)
   */
  showMore?: boolean;
}

export type PaginationPropsType = PaginationBaseType & Omit<JSX.IntrinsicElements['ul'], 'onChange'>