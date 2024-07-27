import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";  
import About from "./About";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default appRouter;
