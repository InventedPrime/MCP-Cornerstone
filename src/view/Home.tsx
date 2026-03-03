import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { FooterComponent } from "../components/FooterComponent";

export const Home = () => {
    const navigate = useNavigate();

    return(
      <div className="page-wrapper"> 
        <Header />
        {/* This structure below was AI generated, I had to tweak the CSS file to ensure everything looked correct*/}
        <main className="main-content">
          <div className="hero-card">
            <div className="hero-logo">
              <img src="/MCPLogo.png" alt="MCP Logo" />
            </div>
            <div className="hero-content">
              <h1>MCP Cornerstone Solutions</h1>
              <p>Explore art collections powered by MCP technology and Claude AI. <br /> Get intelligent answers about artworks, discover new pieces, and build your personal collection with AI-enhanced insights.</p>
            </div>
            <button onClick={() => navigate('/SignUp')}>Get Started</button>
          </div>

          <div className="features">
            <div className="feature-card">
              <span className="feature-icon">🖼️</span>
              <h3>Explore Art Collections</h3>
              <p>Browse curated artworks from world-renowned museums, powered by real-time API integrations.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💡</span>
              <h3>AI-Powered Insights</h3>
              <p>Ask Claude AI questions and get intelligent answers using MCP technology to access your data.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⭐</span>
              <h3>Build Your Collection</h3>
              <p>Save and organize your favorite artworks in a personalized gallery you can access anytime.</p>
            </div>
          </div>
        </main>

        <FooterComponent />
      </div>
    ) 
};