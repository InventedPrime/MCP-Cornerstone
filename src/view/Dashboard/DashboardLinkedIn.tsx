import { Navigate } from "react-router-dom"
import { Header } from "../../components/Header"
import { Panel } from "../../components/Panel"
import { FooterComponent } from "../../components/FooterComponent"
import { useAuth } from "../../context/AuthContext"

export const DashboardLinkedIn = () => {
    const { user } = useAuth();

    return !user ? <Navigate to="/SignUp" /> :
    <div className="page-wrapper">
            <Header />
            <div className='dashboard-container'>
                <Panel />
                <div className="linkedin-container">
                </div>
            </div>
            <FooterComponent />
    </div>
}