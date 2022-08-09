import { createContext } from "react";
import { SideMenuComtextType } from "./interface";


export const SideMenuComtext = createContext<SideMenuComtextType>({
  activeMenu: [],
  activeMenuSub: [],
});