import React from "react";
import { Image, Title, Upload } from "../../components";
import Luoxiaohei from '../../assets/images/luoxiaohei.jpg'

const UploadExemple = () => {
  return (
    <div>
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
    </div>
  )
}
export default UploadExemple