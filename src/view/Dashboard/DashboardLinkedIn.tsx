import { Header } from "../../components/Header";
import { Panel } from "../../components/Panel";
import { FooterComponent } from "../../components/FooterComponent";

export const DashboardLinkedIn = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="dashboard-container">
        <Panel />
        <div className="linkedin-container">
          <h1>Post On LinkedIn Coming Soon!</h1>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
