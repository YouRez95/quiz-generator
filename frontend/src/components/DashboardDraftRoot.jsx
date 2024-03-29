import { Outlet } from "react-router-dom";

export default function DashboardDraftRoot() {
  return (
    <div className="pt-20 grid gap-10">
      <h1 className="text-dark font-secondary text-xl font-bold">
        Draft
        <span className="text-[12px] px-2 bg-dark-2 rounded-full font-thin text-light">
          Quiz not completed yet
        </span>
      </h1>
      <Outlet />
    </div>
  );
}
