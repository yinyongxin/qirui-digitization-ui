# Page 组件

## 版本 1.2.6

### 属性

``` ts
export interface PageBaseType {
  /**
   * √
   * page头部
   */
  pageHeader?: {
    /**
     * √
     * 面包屑
     */
    breadcrumb?: BreadcrumbBaseType
    /**
     * √
     * 标题
     */
    title?: ReactNode,
    /**
     * √
     * 描述
     */
    descriptions?: ReactNode

    /**
     * √
     * 返回上一步
     * @defaultValue false
     */
    toBack?: boolean,
    /**
     * √
     * 头部内联样式
     */
    style?: React.CSSProperties
  }
  /**
   * √
   * 吸顶
   */
  sticky?: boolean
}

export type PagePropsType = PageBaseType & JSX.IntrinsicElements['div']
```
