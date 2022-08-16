import React from "react";
import { Button, Card, Title } from "../../../components";
import styles from './styles.module.less'

const ButtonExemple = () => {
  return (
    <div className={styles.buttonExemple}>
      <Title type="tooltip" title="大小 size" >
        <div className="flex gap10">
          <Button size="small">Small</Button>
          <Button>Default</Button>
          <Button size="large">Large</Button>
        </div>
      </Title>

      <Title type="tooltip" title="状态 status" >
        <div className="flex gap10">
          <Button >default</Button>
          <Button status="success">Success</Button>
          <Button status="error">Error</Button>
          <Button status="warning">Warning</Button>
        </div>
      </Title>

      <Title type="tooltip" title="水平级别" >
        <div className="flex gap10">
          <Button level="main">main</Button>
          <Button level="white">White</Button>
          <Button level="secondary">Secondary</Button>
        </div>
      </Title>

      <Title type="tooltip" title="禁用" >
        <div className="flex gap10">
          <Button
            disabled
            onClick={() => {
              console.log('disabledBtn');
            }}
          >Disabled</Button>
        </div>
      </Title>

      <Title type="tooltip" title="前缀后缀" >
        <div className="flex gap10">
          <Button size="large" prefix="+">Large</Button>
          <Button size="large" suffix="-">Large</Button>
        </div>
      </Title>


      <Title type="tooltip" title="文字类型" >
        <div className="flex gap10">
          <Button buttonShowType='text'>Text</Button>
          <Button buttonShowType='text' textBottomLine>textBottomLine</Button>
          <Button buttonShowType='text' textBottomLine disabled>textBottomLine disabled</Button>
          <Button buttonShowType='text' disabled>disabled</Button>
        </div>
      </Title>
    </div>
  )
}
export default ButtonExemple