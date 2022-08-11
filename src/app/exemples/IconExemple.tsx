import React from "react";
import { Icon, Title } from "../../components";

const IconExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <div>
            <Icon icon="circle-check" />
            <div>default</div>
          </div>
          <div>
            <Icon status="primary" icon="circle-check" />
            <div>primary</div>
          </div>
          <div>
            <Icon status="success" icon="circle-check" />
            <div>success</div>
          </div>
          <div>
            <Icon status="error" icon="circle-check" />
            <div>error</div>
          </div>
          <div>
            <Icon status="warning" icon="circle-check" />
            <div>warning</div>
          </div>
        </div>
      </Title>
    </div>
  )
}
export default IconExemple