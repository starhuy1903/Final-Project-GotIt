import React, { useState } from "react";
import Pagination from "./Pagination";

const PaginationTablePage = () => {
  const [current, setCurrent] = useState(1);
  return (
    <div>
      <Pagination
        totalCount={600}
        currentPage={current}
        onPageChange={setCurrent}
        pageSize={20}
      />
    </div>
  );
};

export default PaginationTablePage;
