import React from "react";
import { Page, Button, Title, Icon } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";

const ButtonExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '按钮 Button',
        descriptions: '按钮是一种命令组件，可发起一个即时操作。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'ButtonExemple',
              path: '/buttonExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title
          title="基本用法"
          description='按钮分为 主要按钮、次要按钮、虚线按钮和文本按钮四种。'
        >
          <div className="flex gap10">
            <Button type="primary">Default</Button>
            <Button type="secondary">Default</Button>
            <Button
              style={{
                borderStyle: 'dashed'
              }}
              type="secondary"
            >Default</Button>
            <Button type="text">Default</Button>
          </div>
        </Title>
        <Title
          title="图标按钮"
          description="Button 可以嵌入图标，在只设置图标而没有 children 时，按钮的高宽相等。"
        >
          <div className="flex gap10">
            <Button type="primary" icon={<Icon icon="circle-check" />}></Button>
            <Button type="primary" icon={<Icon icon="circle-check" />}>
              Delete
            </Button>
          </div>
        </Title>
        <Title
          title="按钮尺寸"
          description="按钮分为：小、中、大，四种尺寸。高度分别为：24px/32px/40px。推荐及默认为尺寸「中」。可在不同场景及不同业务需求选择适合尺寸。"
        >
          <div className="flex gap10">
            <Button size="small">Small</Button>
            <Button>Default</Button>
            <Button size="large">Large</Button>
          </div>
        </Title>

        <Title title="按钮状态" >
          <div className="flex flex-column gap10">
            <div className="flex gap10">
              <Button status="success">success</Button>
              <Button
                status="success"
                style={{
                  borderStyle: 'dashed'
                }}
              >Default</Button>
              <Button status="success" type="text">Default</Button>

            </div>
            <div className="flex gap10">
              <Button status="error">error</Button>
              <Button
                status="error"
                style={{
                  borderStyle: 'dashed'
                }}
              >Default</Button>
              <Button status="error" type="text">Default</Button>

            </div>
            <div className="flex gap10">
              <Button status="warning">warning</Button>
              <Button
                status="warning"
                style={{
                  borderStyle: 'dashed'
                }}
              >Default</Button>
              <Button status="warning" type="text">Default</Button>

            </div>
          </div>
        </Title>

        <Title
          title="禁用按钮"
          description="按钮状态分为 警告，危险，成功 三种，可以与按钮类型同时生效，优先级高于按钮类型。"
        >
          <div className="flex flex-column gap10">
            <div className="flex gap10">
              <Button disabled status="primary">primary</Button>
              <Button
                disabled
                status="primary"
                style={{
                  borderStyle: 'dashed'
                }}
              >Default</Button>
              <Button disabled status="primary" type="text">Default</Button>

            </div>
            <div className="flex gap10">
              <Button disabled >success</Button>
              <Button
                disabled
                style={{
                  borderStyle: 'dashed'
                }}
              >Default</Button>
              <Button disabled type="text">Default</Button>

            </div>
            <div className="flex gap10">
              <Button disabled status="success">success</Button>
              <Button
                disabled
                status="success"
                style={{
                  borderStyle: 'dashed'
                }}
              >Default</Button>
              <Button disabled status="success" type="text">Default</Button>

            </div>
            <div className="flex gap10">
              <Button disabled status="error">error</Button>
              <Button
                disabled
                status="error"
                style={{
                  borderStyle: 'dashed'
                }}
              >Default</Button>
              <Button disabled status="error" type="text">Default</Button>

            </div>
            <div className="flex gap10">
              <Button disabled status="warning">warning</Button>
              <Button
                disabled
                status="warning"
                style={{
                  borderStyle: 'dashed'
                }}
              >Default</Button>
              <Button disabled status="warning" type="text">Default</Button>

            </div>
          </div>
        </Title>

        <Title
          title="前缀后缀"
          description="增加前缀后缀"
        >
          <div className="flex gap10">
            <Button size="large" prefix="+">Large</Button>
            <Button size="large" suffix="-">Large</Button>
          </div>
        </Title>


        <Title
          title="文字类型"
          description="下划线"
        >
          <div className="flex gap10">
            <Button type='text' underline>textBottomLine</Button>
            <Button type='text' underline disabled>textBottomLine disabled</Button>
          </div>
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default ButtonExemple