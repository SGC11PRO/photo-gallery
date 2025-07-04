export default function Home()
{
  return (
    <div>
      <header className="header">

        {/* Component 1 : Navbar */}  
        <nav className="nav">
          <h1 className="logo">Gallery</h1>

          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        
        {/* Component 2 : Hero Section */}
        <section id="inicio" className="hero">
          <div className="hero-content">
            <h2>Capturing Moments</h2>
            <p>Professional photography that tells your story</p>
            <button className="cta-button">View Gallery</button>
          </div>
        </section>

        {/* Component 3 : Gallery Section */}
        <section id="galeria" className="gallery">
          <div className="gallery-container">
            <h2 className="section-title">Gallery</h2>
            <p className="section-subtitle">Explore my collection of photographs capturing life's beautiful moments</p>
          </div>

          {/* Component 3.5 : Filter Buttons */}
          <div className="filter-buttons">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Nature</button>
            <button className="filter-btn">Urban</button>
            <button className="filter-btn">Portrait</button>
          </div>

          <div className="gallery-grid">

            {/* Component 4 : Gallery Item */}
            <div className="gallery-item">
              <img src="/images/placeholder.webp" alt="Photo 1"/>
              <div className="gallery-overlay">
                <h3>Urban Sunset</h3>
                <p>Golden hour in the city streets</p>
              </div>
            </div>

            {/* Component 4 : Gallery Item */}
            <div className="gallery-item">
              <img src="/images/placeholder.webp" alt="Photo 2"/>
              <div className="gallery-overlay">
                <h3>Mountain View</h3>
                <p>Breathtaking mountain landscape</p>
              </div>
            </div>

            {/* Component 4 : Gallery Item */}
            <div className="gallery-item">
              <img src="/images/placeholder.webp" alt="Photo 3"/>
              <div className="gallery-overlay">
                <h3>Street Portrait</h3>
                <p>Candid moment captured</p>
              </div>
            </div>

            {/* Component 4 : Gallery Item */}
            <div className="gallery-item">
              <img src="/images/placeholder.webp" alt="Photo 4"/>
              <div className="gallery-overlay">
                <h3>Ocean Waves</h3>
                <p>Powerful waves crashing</p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}
