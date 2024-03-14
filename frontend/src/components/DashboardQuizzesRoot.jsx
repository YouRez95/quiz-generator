import { Outlet } from "react-router-dom";

export default function DashboardQuizzesRoot() {
  return (
    <div className="pt-20 grid gap-10">
      <h1 className="text-dark font-secondary text-3xl font-bold">Quizzes</h1>
      <Outlet />
    </div>
  );
}
