import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { Provider } from "react-redux";
import store from "./Redux/store";
import PatientEntry from "./Pages/PatientEntry";

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
