import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import { Provider } from "react-redux";
import store from "../Redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Outlet />
      </div>
    </Provider>
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
