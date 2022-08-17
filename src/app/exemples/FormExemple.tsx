import React from "react";
import { Icon, Title } from "../../components";

const FormExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <div>
            <Icon icon="circle-check" />
            <div>default</div>
          </div>
        </div>
      </Title>
    </div>
  )
}
export default FormExemple