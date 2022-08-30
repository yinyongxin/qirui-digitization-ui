import React from "react";
import { Icon, Image, Title, Upload } from "../../components";
import Luoxiaohei from '@/assets/images/luoxiaohei.jpg'

const ImageExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Image" >
        <div className="flex gap20">
          <Image
            src={Luoxiaohei}
            width={200}
            height={200}
          // mask
          />
        </div>
      </Title>
      <Title type="tooltip" title="预览 preview" >
        <div className="flex gap20">
          <Image
            src={Luoxiaohei}
            width={200}
            height={200}
            preview
          />
        </div>
      </Title>
      <Title type="tooltip" title="close 关闭按钮" >
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
      <Title type="tooltip" title="mask 遮罩" >
        <div className="flex gap20">
          <Image
            src={Luoxiaohei}
            width={200}
            height={200}
            mask
          />
        </div>
      </Title>
      <Title type="tooltip" title="options 操作 （默认显示预览按钮， 支持自定义）" >
        <div className="flex gap20">
          <Image
            src={Luoxiaohei}
            width={200}
            height={200}
            optionsShow="always"
          />
        </div>
      </Title>
      <Title type="tooltip" title="加载失败 error （支持自定义）" >
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
      <Title type="tooltip" title="默认图片" >
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
    </div>
  )
}
export default ImageExemple