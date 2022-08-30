import { CSSProperties, ReactNode } from "react"

export type PartType = 'pageSize' | 'total' | 'current' | 'page' | 'jumper'

export interface PaginationBaseType {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 当前页
   * @en Current page
   */
  current?: number;
  /**
   * @zh 每页数据条数
   * @en Number of data items per page
   */
  pageSize?: number;
  /**
   * @zh 数据总数
   * @en Total number of data
   */
  total?: number;
  defaultConfig?: {
    pageSize?: PaginationBaseType['pageSize'],
    current?: PaginationBaseType['current'],
  }
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 是否在只有一页的情况下隐藏
   * @en Whether to hide when there is only one page
   * @version 2.6.0
   */
  hideOnSinglePage?: boolean;
  sort?: PartType[]
  /**
   * @zh 定制分页按钮的结构
   * @en Customized pagination button structure
   */
  partsRender?: {
    pageSize?: () => ReactNode,
    current?: () => ReactNode,
    total?: () => ReactNode,
    jumper?: () => ReactNode,
    pageItem?: () => ReactNode,
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
   * @zh 是否显示数据总数
   * @en Whether to display the total number of data
   */
  showTotal?: boolean | ((total: number, range: number[]) => ReactNode);
  /**
   * @zh 是否可以改变每页条数
   * @en Is it possible to change page size
   * @defaultValue true
   */
  sizeCanChange?: boolean;
  /**
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
   * @zh 变化时的回调
   * @en Callback when page changes
   */
  onChange?: (current: number, pageSize: number) => void;
  /**
   * @zh pageSize 变化时的回调
   * @en Callback when pageSize changes
   */
  pageSizeChangeResetCurrent?: boolean;
  /**
   * @zh 是否应用精简分页模式
   * @en Whether to use simplified pagination mode
   */
  simple?: boolean;
  /**
   * @zh 是否显示快速跳转到某页，在 `simple` 模式下默认为 true
   * @en Whether to display quick jump. Defaults to true in `simple` mode
   */
  showJumper?: boolean;
  /**
   * @zh 是否显示更多页码提示（当尚无法计算数据总数时可以使用）
   * @en Whether to show more page number tips (can be used when the total number of data cannot be calculated yet)
   */
  showMore?: boolean;
  /**
   * @zh 设置分页器的图标
   * @en Set icon of the pager
   */
  mini?: boolean; // 1.0
}

export type PaginationPropsType = PaginationBaseType & JSX.IntrinsicElements['ul']