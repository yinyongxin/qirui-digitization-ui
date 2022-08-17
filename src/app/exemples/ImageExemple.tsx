import React from "react";
import { Image, Title, Upload } from "../../components";
import Luoxiaohei from '../../assets/images/luoxiaohei.jpg'

const ImageExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Image status" >
        <div className="flex gap20">
          <Image
            imgAttributes={{
              style: {
                objectFit: 'cover'
              },
            }}
            src={Luoxiaohei}
            width={200}
            height={200}
            optionsShow="never"
            closeShow='always'
            preview
          // mask
          />
        </div>
      </Title>
    </div>
  )
}
export default ImageExemple