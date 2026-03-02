import { Link } from "react-router-dom"
import { FooterComponent } from "../../components/FooterComponent"
import { Header } from "../../components/Header"
import { Panel } from "../../components/Panel"
import { useAuth } from "../../context/AuthContext"


export const DashboardCredentials = () => {
    const { user } = useAuth();

    const handleOnClick = () => {
        alert("UserId: "+user?.uid)
    }

     return !user ? <Link to="/SignIn" /> :
        <div className="page-wrapper">
               <Header />
               <div className='dashboard-container'>
                 <Panel />
                 <div className="credentials-container">
                    <button onClick={handleOnClick} className="credentials-content">
                        <p>Click Me To See Your User Id!</p>
                    </button>
                </div>
               </div>
               <FooterComponent />
        </div>
}