import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/pages/Root";
import Question from "./components/Question";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "question", element: <Question /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
