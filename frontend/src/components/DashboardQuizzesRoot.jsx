import { Outlet } from "react-router-dom";

export default function DashboardQuizzesRoot() {
  return (
    <div className="pt-20 grid gap-10">
      <h1 className="text-dark font-secondary text-xl font-bold">Quizzes</h1>
      <div className="mx-1">
        <Outlet />
      </div>
    </div>
  );
}
