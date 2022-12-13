import { Spin } from "antd";

export default function Spinner() {
  return (
    <div>
      <div className="top-0 left-0 w-full h-full bg-slate-200 fixed opacity-40 z-10">
        <div className="py-72 ml-[800px] mt-[80px]">
          <Spin size="large" />
        </div>
      </div>
    </div>
  );
}
