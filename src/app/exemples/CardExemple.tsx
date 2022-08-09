import React from "react";
import { Card } from "../../components";

const CardExemple = () => {
  return (
    <div className="exemple">
      <Card>
        CardContent
      </Card>
      <Card title="title">
        CardContent
      </Card>
      <Card status="success">
        CardContent
      </Card>
      <Card title="title" status="error">
        CardContent
      </Card>
      <Card border={['right']} title="title" status="error">
        CardContent
      </Card>
    </div>
  )
}
export default CardExemple 