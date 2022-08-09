import React from "react";
import { Icon } from "../../components";

const IconExemple = () => {
  return (
    <div className="exemple">
      <Icon icon="circle-check" />
      <Icon status="primary" icon="circle-check" />
      <Icon status="success" icon="circle-check" />
      <Icon status="error" icon="circle-check" />
      <Icon status="warning" icon="circle-check" />
    </div>
  )
}
export default IconExemple