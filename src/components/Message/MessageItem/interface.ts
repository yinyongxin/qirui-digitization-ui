import { Key, ReactNode } from "react";
import { DesignTypes } from "../../typings";

export type MessageItemPropsType = {
   id: symbol;
    /**
   * 状态 
   * 默认：default 成功：warnnig 失败：error 警告：warnning
   * 默认值： default
   */
   status?: DesignTypes['Status'];
   /**
    * 是否显示关闭按钮
    * boolean
    * 默认：false
    */
   closable?: boolean;
   /**
    * 是否显示图标
    * boolean
    * 默认：true
    */
   showIcon?: boolean;
    /**
     * 自定义图标
     * ReactNode
     */
   icon?: ReactNode;
   /**
    * 消息内容
    * 必填
    */
   content: ReactNode | string
   /**
    * Message弹框自动关闭时间
    * 默认； 2000毫秒
    */
   autoCloseTime?: number;
 /**
    * Message弹框自动关闭
    * 默认； true
    */
   autoClose?: boolean;

   /**
    * 操作部分自定义渲染
    */
   operationRenter?: (close: () => void) => ReactNode;

   /**
    * 关闭对消息弹框方法
    */
   close: (id: symbol) => void;

    /**
    * 关闭对消息后执行
    */
   closeAfter?: (item: MessageItemPropsType) => void

   key?: Key;
}