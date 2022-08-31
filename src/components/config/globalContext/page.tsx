import { PageBaseType } from "@/components/Page/interface"
export type PageConfigType = Partial<Pick<PageBaseType, 'sticky'>>

export const PageConfig: PageConfigType = {
  sticky: true,
}