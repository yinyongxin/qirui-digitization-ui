import React from "react";
import { Breadcrumb, Page, Title, Text } from "../../components";

const BreadcrumbExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '面包屑 Breadcrumb',
        descriptions: '面包屑是辅助导航模式，用于识别页面在层次结构内的位置，并根据需要向上返回。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'BreadcrumbExemple',
              path: '/breadcrumbExemple'
            }
          ]
        }
      }}
    >
      <div className="exemple-page-content">
        <Title type="tooltip" title="基本Icon status" >
          <Breadcrumb
            list={[
              {
                title: 'Home',
                // path: '/home'
              },
              {
                title: 'BreadcrumbExemple',
                path: '/breadcrumbExemple'
              }
            ]}
          />
        </Title>
      </div>
    </Page>
  )
}
export default BreadcrumbExemple