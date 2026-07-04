import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { logInUser, signUpUser } from "./utils/firebase.ts";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./view/Home.tsx";
import {
  DashboardArtMuseum,
  DashboardSavedArtworks,
  DashboardCredentials,
  DashboardLinkedIn,
} from "./view/Dashboard";
import { SignUp } from "./view/SignUp.tsx";
import { LogIn } from "./view/LogIn.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";
import { Loader } from "./components/Loader.tsx";
import { DashboardArtMetrics } from "./view/Dashboard/DashboardArtMetrics.tsx";
import { RequireAuth } from "./components/RequireAuth.tsx";

const router = createBrowserRouter([
  { path: "/Home", element: <Home /> },
  { path: "/Dashboard", element: <Navigate to="/Dashboard/ArtMuseum" /> },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/Dashboard/ArtMuseum",
        element: (
          <Suspense fallback={<Loader isLoading={true} />}>
            <DashboardArtMuseum />
          </Suspense>
        ),
      },
      {
        path: "/Dashboard/SavedArtworks",
        element: (
          <Suspense fallback={<Loader isLoading={true} />}>
            <DashboardSavedArtworks />
          </Suspense>
        ),
      },
      { path: "/Dashboard/PostedOnLinkedIn", element: <DashboardLinkedIn /> },
      { path: "/Dashboard/Credentials", element: <DashboardCredentials /> },
      { path: "/Dashboard/ArtMetrics", element: <DashboardArtMetrics /> },
    ],
  },

  {
    path: "/SignUp",
    element: <SignUp />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const username = formData.get("username")!.toString();
      const email = formData.get("email")!.toString();
      const password = formData.get("password")!.toString();

      // basic Sanity Check for empty fields
      if (username === "" || email === "" || password === "") {
        alert("Please fill in all fields");
        return null;
      }

      try {
        await signUpUser(username, email, password);
        return redirect("/Dashboard");
      } catch (error: any) {
        alert(error.message);
        return null;
      }
    },
  },
  {
    path: "/LogIn",
    element: <LogIn />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get("email")!.toString();
      const password = formData.get("password")!.toString();

      // basic Sanity Check for empty fields
      if (email === "" || password === "") {
        alert("Please fill in all fields");
        return null;
      }

      try {
        await logInUser(email, password);
        return redirect("/Dashboard");
      } catch (error: any) {
        alert(error.message);
        return null;
      }
    },
  },
  { path: "*", element: <Navigate to="/Home" /> },
]);

const App = () => {
  return (
    <StrictMode>
      <AuthProvider>
        <LoaderProvider>
          <RouterProvider router={router} />
        </LoaderProvider>
      </AuthProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
