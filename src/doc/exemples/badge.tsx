import React from "react";
import { Icon, Page, Title, Text, Box, Badge } from "@/components";
import ScrollIntoView from "../components/ScrollIntoView";
const BadgeExemple = () => {
  return (
    <Page
      pageHeader={{
        title: 'Badge徽标',
        descriptions: 'Badge徽标',
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
        <Title type="tooltip" title="基本Badge徽标" >
          <Badge
          >

          </Badge>

        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default BadgeExemple