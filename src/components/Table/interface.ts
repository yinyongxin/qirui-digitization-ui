import React, { Key, PropsWithChildren, ReactNode } from "react"
import { PaginationPropsType } from "../Pagination/interface";
import { DesignTypes } from "../typings";

export type CallbackProps = Partial<Pick<React.DOMAttributes<any>, 'onClick' | 'onMouseEnter' | 'onMouseLeave'>>

export type ColumnType<
  T extends unknown = any,
  TValue = T[keyof T],
  TKey extends DesignTypes['KeyType'] = keyof T> = {
    /**
     * √
     * 列标题
     */
    title: ReactNode,
    /**
     * √
     * React的 key值，如果不指定，默认取 dataKey 的值
     */
    key?: Key,
    /**
     * √
     * 列数据在数据项中对应的 key，用于取值显示
     */
    dataKey: TKey;
    /**
     * √
     * 列宽度
     */
    width?: string | number,
    /**
    * 排序函数，如果想要服务端排序或者添加更多自定义操作，
    */
    sorter?: ((a: any, b: any) => any) | boolean,
    /**
     * √
     * 自定义单元格显示的内容
     */
    bodyCellRender?: (column: ColumnType<T, TValue, TKey>, record: T, index: Record<'columnIndex' | 'dataIndex', number>) => ReactNode,
    /**
     * √
     * 自定义头部标题单元格显示的内容
     */
    headerCellRender?: (column: ColumnType<T, TValue, TKey>, index: number) => ReactNode,
    /**
     * √
     * 设置头部单元格的各项事件回调
     */
    onTheadTdCell?: (column: ColumnType<T, TValue, TKey>, index: number) => CallbackProps,
    /**
     * √
     * 设置单元格的各项事件回调
     */
    onTbodyTdCell?: (record: T, index: number) => CallbackProps,
    /**
     * √
     * 	当单元格内容为空时，显示占位符，优先级低于 render。
     */
    placeholder?: ReactNode,
    /**
     * √
     * 	设置列的对齐方式 left
     */
    align?: DesignTypes['Align']
  }

export interface TableBaseType<
  T extends unknown = any,
  TValue = T[keyof T],
  TKey extends DesignTypes['KeyType'] = keyof T
  > {
  /**
   * 表格尾部
   */
  footer?: (currentPageDate: any) => ReactNode
  /**
   * √
   */
  columns: ColumnType<T, TValue, TKey>[],
  /**
   * √
   * 表格数据
   */
  data: T[] | ((
    pagination: {
      current: number,
      pageSize: number,
      pageCurrent: number
    },
    search: any
  ) => Promise<{
    list: T[],
    total: number
  }>),
  /**
   * √
   * 	表格行 key 的取值字段
   */
  rowKey?: TKey | ((record: T) => TKey),
  /**
   * √
   * 设置表格行的各项事件回调
   */
  onRow?: (record: T, index: number) => CallbackProps,

  /**
   * 表格是否在加载中
   */
  loading?: boolean,
  /**
   * √
   * 当单元格内容为空时，显示占位符，优先级低于 column.placeholder。
   */
  placeholder?: ReactNode,
  /**
   * 	是否开启斑马纹
   */
  stripe?: boolean,
  /**
   * √
   * 边框
   */
  borders?: Partial<Record<DesignTypes['Direction'] | 'thead' | 'tbody' | 'vertical', boolean>> | null
  /**
   * √
   * 边框宽度
   */
  borderWidth?: number,
  /**
   * 分页
   */
  pagination?: boolean | PaginationPropsType
}

export type TablePropsType<
  T extends unknown = any,
  TValue = T[keyof T],
  TKey extends DesignTypes['KeyType'] = keyof T
  > = TableBaseType<T, TValue, TKey> & JSX.IntrinsicElements['table']