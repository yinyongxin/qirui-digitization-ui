import React, { useState } from "react";
import { Page, Pagination, Title } from "../../components";

const PaginationExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '分页 Pagination',
        descriptions: '采用分页控制单页内的信息数量，也可进行页面跳转。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'PaginationExemple',
              path: '/paginationExemple'
            }
          ]
        }
      }}
    >
      <div className="exemple-page-content">
        <Title type="tooltip" title="基本Icon status" >
          <div className="flex gap20">
            <Pagination
              total={54}
              onChange={(current, pageSize) => {
                console.log('current', current);
                console.log('pageSize', pageSize);
              }}
            />
          </div>
        </Title>
      </div>
    </Page>
  )
}
export default PaginationExemple