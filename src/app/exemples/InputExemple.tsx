import React, { useState } from "react";
import { Icon, Input, Title, Upload } from "../../components";

const IconExemple = () => {
  const [value, setValue] = useState()
  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <Input />
          <Input defaultValue={'defaultValue'} />
          <Input width={520} borders={{
            top: false,
            bottom: false,
            left: false,
            right: false
          }} placeholder="点击搜索工单" />
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