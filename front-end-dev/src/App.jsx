import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/pages/Root";
import Question from "./components/pages/Question";
import Home from "./components/pages/Home";
import QuestionDetail from "./components/pages/QuestionDetail";
import ForTeam from "./components/pages/ForTeam";
import About from "./components/pages/About";
import Product from "./components/pages/Product";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path:'signup',element:<SignUpPage/>},
      { path: "question", element: <Question /> },
      { path: ":idx", element: <QuestionDetail /> },
      { path: "forTeam", element: <ForTeam /> },
      { path: "about", element: <About /> },
      { path: "product", element: <Product /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
