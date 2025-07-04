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
      </main>
    </div>
  )
}