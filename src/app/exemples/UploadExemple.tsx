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
              <Image
                imgAttributes={{
                  style: {
                    width: 200,
                    height: 200,
                    objectFit: 'cover'
                  },
                  src: Luoxiaohei
                }}
                mask
                closeShow="always"
              />
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