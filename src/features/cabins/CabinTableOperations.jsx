import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperation from "../../ui/TableOperations";
function CabinTableOperations() {
  return (
    <TableOperation>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (low first) " },
          { value: "regularPrice-desc", label: "Sort By Price (high first) " },
          {
            value: "maxCapacity-asc",
            label: "Sort By maxCapacity (low first)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort By maxCapacity (high first)",
          },
        ]}
      ></SortBy>
    </TableOperation>
  );
}

export default CabinTableOperations;
