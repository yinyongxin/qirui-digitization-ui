import { ReactNode } from "react";
import { TabPaneBaseType } from "../TabPane/interface";

export type TabType = TabPaneBaseType & { 
  content?: ReactNode | (() => ReactNode)
}

export interface TabsBaseType {
  type?: 'card' | 'line' | 'text' | 'miniCard',
  activeTab?: any,
  tabList: TabType[],
  activeTabChange?: ActiveTabChangeType
}

export type TabsHandle = {
  activeTab: any,
}

export type TabsPropsType = TabsBaseType

export type ActiveTabChangeType = (key: any) => void