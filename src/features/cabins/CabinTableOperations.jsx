import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperation from "../../ui/TableOperations";
function CabinTableOperations() {
  return (
    <TableOperation>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "全部" },
          { value: "no-discount", label: "无折扣" },
          { value: "with-discount", label: "有折扣" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "按名称 (A-Z)" },
          { value: "name-desc", label: "按名称 (Z-A)" },
          { value: "regularPrice-asc", label: "按价格 (低) " },
          { value: "regularPrice-desc", label: "按价格 (高) " },
          {
            value: "maxCapacity-asc",
            label: "按人数 (少)",
          },
          {
            value: "maxCapacity-desc",
            label: "按人数 (多)",
          },
        ]}
      ></SortBy>
    </TableOperation>
  );
}

export default CabinTableOperations;
