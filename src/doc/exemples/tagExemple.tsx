import React, { useState } from "react";
import { Page, Tag, Title, Icon } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";

const TagExemple = () => {
  const [visible, setVisible] = useState(true)
  const [check, setCheck] = useState(true)
  const onClose = (e: boolean) => {
    setVisible(e)
  }
  return (
    <Page
      pageHeader={{
        title: '标签Tag',
        descriptions: '用于信息的选择、筛选、分类。用户通过标签进行信息反馈和交互操作。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'TagExemple',
              path: '/buttonExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title
          title="基本用法"
          description='标签Tag'
        >
          <div className="flex gap10" style={{ alignItems: 'center' }}>
            <Tag>Default</Tag>
            <Tag size="small">small</Tag>
            <Tag size="large">large</Tag>
          </div>
        </Title>
        <Title
          title="颜色tag"
          description='颜色Tag'
        >
          <div className="flex gap10" style={{ alignItems: 'center' }}>
            <Tag color='#f53f3f'> #f53f3f</Tag>
            <Tag color='#7816ff'>#7816ff</Tag>
            <Tag color='#00b42a'> #00b42a</Tag>
            <Tag color='#86909c'> #86909c</Tag>

          </div>
        </Title>
        <Title
          title="可关闭标签"
          description='可关闭标签'
        >
          <div className="flex gap10" style={{ alignItems: 'center' }}>
            <Tag closable visible={visible} onClose={onClose}>Tag</Tag>
            <Tag closable visible={visible} onClose={onClose}>Tag1</Tag>
          </div>
        </Title>
        <Title
          title="可选中标签"
          description='可选中标签'
        >
          <div className="flex gap10" style={{ alignItems: 'center' }}>
            <Tag checkable>Tag</Tag>
            <Tag checkable color='red'>Tag1</Tag>
            <Tag checkable color='blue' defaultChecked>Tag1</Tag>
            <Tag checkable color='orange' checked={check} onCheck={(e) => {
              setCheck(e)
            }}>Tag1</Tag>
          </div>
        </Title>

      </ScrollIntoView>
    </Page>
  )
}
export default TagExemple