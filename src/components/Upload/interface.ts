import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface UploadBaseInterface {
  onChange?: (files: FileList, e: React.ChangeEvent<HTMLInputElement>) => void,
  inputFileAttributes?: JSX.IntrinsicElements['input'],
  /**
   * 是否显示文件列表
   */
  showFileList?: false,
  /**
   * 	展示类型
   */
  listType?: 'text' | 'picture-list' | 'picture-card',
  /**
   * 禁用
   */
  disabled?: boolean
  files?: FileList,
  defaultFileList?: { name: string, url: string }[],
  children?: ReactNode | ((files?: FileList) => ReactNode)
}

export type UploadPropsType = UploadBaseInterface