import React from "react";
import { Card, Page, Title } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";

const CardExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '卡片 Card',
        descriptions: '将信息分类后分标题、详情等区域聚合展现，一般作为简洁介绍或者信息的大盘和入口。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'CardExemple',
              path: '/cardExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>

        <Title type="tooltip" title="基本" >
          <Card>
            CardContent
          </Card>
        </Title>

        <Title type="tooltip" title="头部标题" >
          <Card title={<div>title</div>}>
            CardContent
          </Card>
        </Title>

        <Title type="tooltip" title="头部状态" >
          <div className="flex gap10">
            <Card width={400} status="success">
              status
            </Card>
            <Card width={400} title="title" status="error">
              title & status
            </Card>
          </div>
        </Title>

        <Title type="tooltip" title="自定义头部底部" >
          <div className="flex gap10">
            <Card
              header={(
                <div>
                  <div>header1</div>
                  <div>header2</div>
                </div>
              )}
              width={400}
              status="success"
            >
              自定义头部自定义header
            </Card>
            <Card
              footer={(
                <div>
                  <div>footer1</div>
                  <div>footer2</div>
                </div>
              )}
              width={400}
            >
              自定义底部footer
            </Card>
          </div>
        </Title>

        <Title type="tooltip" title="边框配置 borders" >
          <Card width={500} borders={['right']}>
            {`border={['right']}`}
          </Card>
        </Title>
        <Title type="tooltip" title="阴影 shadow" >
          <Card width={200} shadow="base" shadowShow='always'>
            {`border={['right']}`}
          </Card>

          <div style={{ height: 30 }}></div>
          <Card width={200} shadow="base" shadowShow="hover">
            {`border={['right']}`}
          </Card>
        </Title>

      </ScrollIntoView>
    </Page>
  )
}
export default CardExemple 