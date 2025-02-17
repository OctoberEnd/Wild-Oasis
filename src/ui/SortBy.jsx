import { useSearchParams } from "react-router-dom";
import Select from "./Select";

/* eslint-disable react/prop-types */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  // 点击下拉选择框，将其选择的规则放到url中
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    ></Select>
  );
  // 06.31
}

export default SortBy;
