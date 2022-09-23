import React from "react";
import { Slider, Page, Title, Text } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
const SliderExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '滑动输入条 Slider',
        descriptions: '滑动型输入器，展示当前值和可选范围。',
        breadcrumb: {
          list: [
            {
              title: 'CompCards',
              path: '/compCards'
            },
            {
              title: 'Sliderxemple',
              path: '/exemples/sliderExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="基本用法" description="基本用法展示。">
          <Slider />
        </Title>
        <Title type="tooltip" title="范围选择" description="设置 range = true 即可开启范围选择，此时 value 为数组。">
          <Slider range />
        </Title>
        <Title type="tooltip" title="基础状态" description="默认态、禁用态。">
          <div className="flex gap20">
            <Slider />
            <Slider disabled />
          </div>
        </Title>
        <Title
          type="tooltip"
          title="设置步长"
          description="传入 step 设置步长。 默认步长为 1。建议设置值能够被 max-min 整除，否则会出现可选最大值小于 max 的情况。"
        >
          <Slider step={2} />
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default SliderExemple