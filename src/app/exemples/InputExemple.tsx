import React from "react";
import { Icon, Input, Title } from "../../components";

const IconExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <Input label={'testLabel1'} />
          <Input label={'testLabel2'} defaultValue={'defaultValue'} />
          <Input label={'testLabel2'} placeholder="placeholder" />
        </div>
      </Title>
      <Title type="tooltip" title="前缀(prefix) 后缀(suffix)" >
        <div className="flex gap20">
          <Input
            prefix={'prefix'}
          />
          <Input
            suffix={'suffix'}
          />
        </div>
      </Title>
      <Title type="tooltip" title="前置(addBefore) 后置(addAfter)" >
        <div className="flex gap20">
          <Input
            addBefore={'addBefore'}
          />
          <Input
            addAfter={'addAfter'}
          />
        </div>
      </Title>
    </div>
  )
}
export default IconExemple