import React from "react";
import { Pagination, Title } from "../../components";

const PaginationExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <Pagination
            total={54}
            onChange={(current, pageSize, pageCurrent) => {
              console.log('current', current);
              console.log('pageSize', pageSize);
              console.log('pageCurrent', pageCurrent);
            }}
          />
        </div>
      </Title>
    </div>
  )
}
export default PaginationExemple