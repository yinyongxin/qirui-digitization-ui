import React from "react";
import { Page, Image, Title, Upload, Button } from "../../components";
import Luoxiaohei from '@/assets/images/luoxiaohei.jpg'
import ScrollIntoView from "../components/ScrollIntoView";

const ImageExemple = () => {
  return (
    <Page
      pageHeader={{
        // title: '图标 Icon',
        title: <Button
          onClick={() => {
            document.querySelector('.exemple-page-content')?.children[2]?.scrollIntoView({
              behavior: 'smooth',
              // block: 'center'
            })
          }}
        >scrollTo</Button>,
        descriptions: '展示和预览图片。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'ImageExemple',
              path: '/imageExemple'
            }
          ]
        }
      }}
    >

      <ScrollIntoView>
        <Title title="基本">
          <div className="flex gap20">
            <Image
              src={Luoxiaohei}
              width={200}
              height={200}
            // mask
            />
          </div>
        </Title>
        <Title title="预览" >
          <div className="flex gap20">
            <Image
              src={Luoxiaohei}
              width={200}
              height={200}
              preview
            />
          </div>
        </Title>
        <Title id="aaa" title="关闭按钮" >
          <div className="flex gap20">
            <Image
              src={Luoxiaohei}
              width={200}
              height={200}
              closeShow='always'
              onClose={() => {
                console.log('onClose');

              }}
            />
          </div>
        </Title>
        <Title title="遮罩" >
          <div className="flex gap20">
            <Image
              src={Luoxiaohei}
              width={200}
              height={200}
              mask
            />
          </div>
        </Title>
        {/* （默认显示预览按钮， 支持自定义） */}
        <Title title="操作" >
          <div className="flex gap20">
            <Image
              src={Luoxiaohei}
              width={200}
              height={200}
              optionsShow="always"
            />
          </div>
        </Title>
        <Title title="加载失败" >
          <div className="flex gap20">
            <Image
              src={'Luoxiaohei'}
              width={200}
              height={200}
              optionsShow="always"
            />
            <Image
              src={'Luoxiaohei'}
              error="error"
              width={200}
              height={200}
              optionsShow="always"
            />
          </div>
        </Title>
        <Title title="默认图片">
          <div className="flex gap20">
            <Image
              src={'Luoxiaohei'}
              defaultSrc={Luoxiaohei}
              width={200}
              height={200}
              preview
            />
          </div>
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default ImageExemple