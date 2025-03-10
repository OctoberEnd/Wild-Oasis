/* eslint-disable no-unused-vars */
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  // 便于在多个地方重用数据
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner></Spinner>;
  if (!cabins.length) return <Empty resourceName="cabins"></Empty>;

  const filteValue = searchParams.get("discount") || "all";

  // 1) Filter
  let filterCabins;
  if (filteValue === "all") filterCabins = cabins;
  if (filteValue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filteValue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  // console.log(sortedCabins, direction);

  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>房间</div>
          <div>入住人数</div>
          <div>价格</div>
          <div>折扣</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}></CabinRow>}
        />
        {/* {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id}></CabinRow>
        ))} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
