import React from "react";
import { Switch, Page, Title, Text, Icon } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
const SwitchExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '开关 Switch',
        descriptions: '互斥性的操作控件，用户可打开或关闭某个功能。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'Switchxemple',
              path: '/swichExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="基础用法" description="最基础的应用。">
          <div className="flex gap20">
            <Switch />
          </div>
        </Title>
        <Title type="tooltip" title="不同类型" description="有三种类型的开关可供选择。">
          <div className="flex gap20">
            <Switch />
            <Switch type="round" />
            <Switch type="line" />
          </div>
        </Title>
        <Title type="tooltip" title="不同尺寸的开关" description="通过指定 size 可以得到不同尺寸的开关。">
          <div className="flex gap20">
            <Switch />
            <Switch size="small" />
            <Switch type="round" />
            <Switch size="small" type="round" />
            <Switch type="line" />
            <Switch size="small" type="line" />
          </div>
        </Title>
        <Title type="tooltip" title="自定义文案" description="自定义开关打开（关闭）时需要显示的文字或者图标。">
          <div className="flex gap20">
            <Switch checkedText='1' uncheckedText='0' type="round" />
            <Switch checkedText='ON' uncheckedText='OFF' />
            <Switch checkedText={<Icon icon="check" />} uncheckedText={<Icon icon="xmark" />} />
          </div>
        </Title>
        <Title type="tooltip" title="禁用状态" description="通过 disabled 设置 Switch 为禁用状态。">
          <div className="flex gap20">
            <div className="flex gap20">
              <Switch disabled />
              <Switch disabled defaultChecked />
              <Switch disabled type="round" />
              <Switch disabled defaultChecked type="round" />
              <Switch disabled type="line" />
              <Switch disabled defaultChecked type="line" />
            </div>
          </div>
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default SwitchExemple