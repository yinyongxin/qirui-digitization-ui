import { ReactNode } from "react";

/**
 * 用于存放全局公用类型
 */
export type DesignTypes = {
  /**
   * 默认有四种状态 
   * default: 默认    success：成功    warnnig：警告     error；错误 
   */
  Status: 'default' | 'success' | 'warning' | 'error';
  /**
  * 默认有四种状态 
  * default: 默认    success：成功    warnnig：警告     error；错误 
  */
  Size: 'default' | 'small' | 'large';
  /**
  * 默认两种级别 
  * main: 主要    secondary：次要 
  */
  Level: 'main' | 'secondary';
  ButtonShowType: 'default' | 'text';
  /**
  * 默认两种主题色
  * dark: 深色 light：浅色
  */
  Theme: 'dark' | 'light';
  /**
  * 默认一种语言
  * 'zh-CN': 中文
  */
  Locale: 'zh-CN';


  Option: {
    value: string | number;
    label: ReactNode | ((option: DesignTypes['Option'], isSelected: boolean) => ReactNode);
  }

  Direction: 'top' | 'right' | 'bottom' | 'left'
  Align: 'left' | 'center' | 'right'

  KeyType: string | number | symbol;
}