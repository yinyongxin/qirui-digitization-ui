import React from "react";
import { Image, Title, Upload, Page } from "../../components";
import Luoxiaohei from '../../assets/images/luoxiaohei.jpg'

const UploadExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '上传 Upload',
        descriptions: '用户可传输文件或提交相应的内容。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'UploadExemple',
              path: '/uploadExemple'
            }
          ]
        }
      }}
    >
      <Title type="tooltip" title="基本Image status" >
        <div className="flex gap20">
          <div>
            <Upload>
              {(files) => (
                <Image
                  imgAttributes={{
                    style: {
                      objectFit: 'cover'
                    },
                  }}
                  width={200}
                  height={200}
                  src={files?.[0] ? URL.createObjectURL(files?.[0]) : ''}
                // defaultSrc={Luoxiaohei}
                />
              )}

            </Upload>

            <Upload>
              选择图片
            </Upload>
          </div>
        </div>
      </Title>
    </Page>
  )
}
export default UploadExemple