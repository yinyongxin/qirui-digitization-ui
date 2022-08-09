import React from "react";
import { Button } from "../../components";

const ButtonExemple = () => {
  return (
    <div className="exemple">
      <Button size="small">Small</Button>
      <Button
        onClick={() => {
          console.log('notDisabledBtn');
        }}
      >Default</Button>
      <Button size="large">Large</Button>
      <Button level="secondary">Secondary</Button>
      <Button status="success">Success</Button>
      <Button status="error">Error</Button>
      <Button status="warning">Warning</Button>
      <Button
        disabled
        onClick={() => {
          console.log('disabledBtn');
        }}
      >Disabled</Button>
      <Button size="large" prefix="+">Large</Button>
      <Button size="large" suffix="-">Large</Button>
      <Button buttonShowType='text'>Text</Button>
      <Button buttonShowType='text' textBottomLine>Text</Button>
      <Button buttonShowType='text' textBottomLine disabled>Text</Button>
      <Button buttonShowType='text' disabled>Text</Button>
    </div>
  )
}
export default ButtonExemple