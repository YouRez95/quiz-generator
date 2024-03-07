import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import CreateQuizPage from "./pages/CreateQuizPage";
import CreateQuestions from "./pages/CreateQuestions";
import UserProfile from "./pages/UserProfile";
import DashboardStatistiques from "./components/DashboardStatistiques";
import DashboardQuizzes from "./components/DashboardQuizzes";
import DashboardNotifications from "./components/DashboardNotifications";
import DashboardSetting from "./components/DashboardSetting";
import DashboardDraft from "./components/DashboardDraft";

const router = createBrowserRouter([
  {
    element: <Header inCreateQuiz={false} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <UserProfile />,
        children: [
          { index: true, element: <DashboardStatistiques /> },
          { path: "quizzes", element: <DashboardQuizzes /> },
          { path: "draft", element: <DashboardDraft /> },
          { path: "notifications", element: <DashboardNotifications /> },
          { path: "settings", element: <DashboardSetting /> },
        ],
      },
    ],
  },
  {
    path: "create-quiz/",
    element: <CreateQuizPage />,
  },
  {
    path: "create-questions/:id",
    element: <CreateQuestions />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
