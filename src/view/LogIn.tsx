
import FormComponent from '../components/FormComponent';
import { Header } from '../components/Header';
import { FooterComponent } from "../components/FooterComponent";
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const LogIn = () => {
    const { user } = useAuth();

    

    return user ? <Navigate to="/Dashboard" />
    :  
    <div className="page-wrapper">
    <Header />
    <FormComponent typeOfForm='LogIn'/>
    <FooterComponent />
    </div>
}