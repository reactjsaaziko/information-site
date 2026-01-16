import VoyagerExperience from './components/VoyagerExperience';
import './styles/voyagerExperience.css';

/**
 * Voyager App - Cinematic Hero Experience
 * 
 * "From a tiny blue dot… to one connected global market."
 * 
 * This is the main entry point for the Aaziko cinematic
 * scroll-driven hero experience.
 */
function VoyagerApp() {
  return (
    <>
      {/* Minimal Navigation - appears after Scene 2 */}
      <nav className="voyager-nav">
        <div className="voyager-nav__logo">Aaziko</div>
        <div className="voyager-nav__links">
          <a href="#" className="voyager-nav__link">How it Works</a>
          <a href="#" className="voyager-nav__link">For Sellers</a>
          <a href="#" className="voyager-nav__link">For Buyers</a>
        </div>
        <div className="voyager-nav__actions">
          <button className="voyager-nav__btn voyager-nav__btn--ghost">Log In</button>
          <button className="voyager-nav__btn voyager-nav__btn--primary">Get Started</button>
        </div>
      </nav>

      {/* Main Experience */}
      <VoyagerExperience />
    </>
  );
}

export default VoyagerApp;
