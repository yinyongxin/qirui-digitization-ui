import React from "react";
import { Page, Title } from "../../components";

const TitleExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '标题 Title',
        descriptions: '用于作为内容和标题详情',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'TableExemple',
              path: '/tableExemple'
            }
          ]
        }
      }}
    >
      <Title title="基础 text"></Title>
      <Title type="tooltip" title="带有下边框 tooltip"></Title>
    </Page>
  )
}
export default TitleExemple