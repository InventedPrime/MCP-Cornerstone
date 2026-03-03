import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { logInUser, signUpUser } from './utils/firebase.ts'
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom'
import { Home } from './view/Home.tsx'
import { DashboardArtMuseum, DashboardArtPictures, DashboardCredentials  } from './view/Dashboard'
import { SignUp } from './view/SignUp.tsx'
import { LogIn } from './view/LogIn.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
const router = createBrowserRouter([
  {path: '/Home', element: <Home />},
  {path: '/Dashboard/ArtMuseum', element: <DashboardArtMuseum />},
  {path: '/Dashboard/LikedPictures', element: <DashboardArtPictures />},
  {path: '/Dashboard/Credentials', element: <DashboardCredentials />},
  {path: '/SignUp', element: <SignUp/>,
    action: async ({request}) => {
      const formData = await request.formData();
      const username = formData.get('username')!.toString();
      const email = formData.get('email')!.toString();
      const password = formData.get('password')!.toString();

      // basic Sanity Check for empty fields
      if (username === '' || email === '' || password === '') {
        alert('Please fill in all fields');
        return null;
      }

      try {
        await signUpUser(username, email, password);
        return redirect('/Dashboard');
      } catch (error: any) {
        alert(error.message);
        return null;
      }
    }
  },
  {path: '/LogIn', element: <LogIn />, action: async ({request}) => {
    const formData = await request.formData();
    const email = formData.get('email')!.toString();
    const password = formData.get('password')!.toString();

    // basic Sanity Check for empty fields
    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return null;
    }

    try {
      await logInUser(email, password);
      return redirect('/Dashboard');
    } catch (error: any) {
      alert(error.message);
      return null;
    }
  }},
  {path: '/Dashboard', element: <Navigate to='/Dashboard/ArtMuseum' />}, // For some reason < Link /> doesnt work in this case because it only works when its attached to a clickable element?
  {path: '*', element: <Navigate to='/Home' />},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider> 
  </StrictMode>,
)
