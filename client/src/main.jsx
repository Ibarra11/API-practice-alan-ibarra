import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from "./components/Auth/AuthProvider.jsx";
import Login from "./components/Auth/Login.jsx";
import AuthLayout from "./components/Auth/AuthLayout.jsx";
import Register from "./components/Auth/Register.jsx";
import CarTable from "./components/CarTable.jsx";
import MainLayout from "./components/MainLayout.jsx";
import { checkAuth } from "./components/Auth/checkAuthLoader.js";
import { getCars } from "./api/cars.js";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    loader: async (req) => {
      const auth = await checkAuth(req);
      if (auth) {
        return redirect("/");
      }
      return null;
    },
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
    ],
  },
  {
    path: "/",

    children: [
      {
        index: true,
        loader: async (req) => {
          const auth = await checkAuth(req);
          if (!auth) {
            return redirect("/auth/login");
          }
          const { cars } = await getCars();
          return cars;
        },
        element: (
          <MainLayout>
            <CarTable />
          </MainLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
