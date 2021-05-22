import Test from "../../../../components/test/Test";
import { TestModalType } from "../../../../../models/type";

function Tests({ data }: { data: Array<TestModalType> }) {
  return (
    <div>
      {data.map((item: TestModalType) => (
        <Test key={item.id} {...item} />
      ))}
    </div>
  );
}

export default Tests;
