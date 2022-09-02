import React from "react";
import { Icon, Page, Title, Text } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
const IconExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '图标 Icon',
        descriptions: '这里有 fontawesome 内置的免费图标。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'Iconxemple',
              path: '/iconExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="基本Icon status" >
          <div className="flex gap20">
            <div>
              <Icon icon="circle-check" />
              <div>default</div>
            </div>
            <div>
              <Icon status="primary" icon="circle-check" />
              <div>primary</div>
            </div>
            <div>
              <Icon status="success" icon="circle-check" />
              <div>success</div>
            </div>
            <div>
              <Icon status="error" icon="circle-check" />
              <div>error</div>
            </div>
            <div>
              <Icon status="warning" icon="circle-check" />
              <div>warning</div>
            </div>
          </div>
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default IconExemple