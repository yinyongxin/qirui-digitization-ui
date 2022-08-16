import React from "react";
import { Image, Title } from "../../components";
import Luoxiaohei from '../../assets/images/luoxiaohei.jpg'

const ImageExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Image status" >
        <div className="flex gap20">
          <div>
            <Image
              imgAttributes={{
                style: {
                  width: 200,
                  height: 200,
                },

                src: Luoxiaohei
              }}
            />
          </div>
        </div>
      </Title>
    </div>
  )
}
export default ImageExemple