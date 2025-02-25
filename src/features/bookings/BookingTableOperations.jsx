import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "已退房" },
          { value: "checked-in", label: "已入住" },
          { value: "unconfirmed", label: "未确认" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "按日期 (最近)" },
          { value: "startDate-asc", label: "按日期 (最早)" },
          {
            value: "totalPrice-desc",
            label: "按总金额 (高)",
          },
          { value: "totalPrice-asc", label: "按总金额 (低)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
