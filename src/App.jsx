import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/Register";
import Application from "./components/Application";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
          <Home />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <NavBar />
          <Register />
        </>
      ),
    },
    {
      path: "/app",
      element: (
        <>
          <NavBar />
          <Application />
        </>
      ),
    },
  ]);
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}
export default App;
