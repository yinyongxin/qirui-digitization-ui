import React from "react";
import { Icon, Page, Title, Text, Box } from "@/components";
import ScrollIntoView from "../components/ScrollIntoView";
const IconExemple = () => {
  return (
    <Page
      pageHeader={{
        title: 'Box 盒子',
        descriptions: '这里有 fontawesome 内置的免费图标。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'BoxExemple',
              path: '/boxExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="基本Icon status" >
          <div
            style={{
              position: 'relative',
            }}
          >
            <div style={{
              background: 'linear-gradient(315deg, #ffbc00, #ff0058)',
              left: '30%',
              height: 400,
              width: 200,
              position: 'absolute'
            }}>

            </div>

            <Box
              type='blur'
              style={{
                height: 200,
                width: 400
              }}
            >
              Im a Box
            </Box>
            <Box
              style={{
                height: 200,
                width: 400
              }}
            >
              Im a Box
            </Box>


          </div>

        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default IconExemple