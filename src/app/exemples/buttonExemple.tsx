import React from "react";
import { Page, Button, Title } from "../../components";

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
      <Title type="tooltip" title="大小 size" >
        <div className="flex gap10">
          <Button size="small">Small</Button>
          <Button>Default</Button>
          <Button size="large">Large</Button>
        </div>
      </Title>

      <Title type="tooltip" title="状态 status" >
        <div className="flex gap10">
          <Button >default</Button>
          <Button status='secondary' >secondary</Button>
          <Button status='primary' >primary</Button>
          <Button status="success">Success</Button>
          <Button status="error">Error</Button>
          <Button status="warning">Warning</Button>
        </div>
      </Title>

      <Title type="tooltip" title="禁用" >
        <div className="flex gap10">
          <Button
            disabled
            onClick={() => {
              console.log('disabledBtn');
            }}
          >Disabled</Button>
        </div>
      </Title>

      <Title type="tooltip" title="前缀后缀" >
        <div className="flex gap10">
          <Button size="large" prefix="+">Large</Button>
          <Button size="large" suffix="-">Large</Button>
        </div>
      </Title>


      <Title type="tooltip" title="文字类型" >
        <div className="flex gap10">
          <Button buttonShowType='text'>Text</Button>
          <Button buttonShowType='text' textBottomLine>textBottomLine</Button>
          <Button buttonShowType='text' textBottomLine disabled>textBottomLine disabled</Button>
          <Button buttonShowType='text' disabled>disabled</Button>
        </div>
      </Title>
    </Page>
  )
}
export default ButtonExemple