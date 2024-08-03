import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import { Provider } from "react-redux";
import store from "../Redux/store";
import PatientEntry from "./PatientEntry";

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
        path: "addpatient",
        element: <PatientEntry />,
      },
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default appRouter;
