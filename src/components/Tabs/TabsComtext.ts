import { createContext } from "react";
import { TabsBaseType } from "./Tabs/interface";

export type TabsComtextType = {
  avtiveTab?: number,
} & Omit<TabsBaseType, 'tabList'>  

export const TabsComtext = createContext<TabsComtextType>({
  avtiveTab: 0
});