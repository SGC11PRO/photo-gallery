'use client'
import { useState, useEffect, useMemo } from "react"

export default function Home()
{
  // code logic -----------------------------------
  const [categoriaActiva, setCategoriaActiva] = useState("All");
  const [fotosVisibles, setFotosVisibles] = useState<number[]>([]);
  const [mezclaSeed, setMezclaSeed] = useState(0); // Para forzar re-mezcla
  const [cargando, setCargando] = useState(false);
  const [isClient, setIsClient] = useState(false); // Para detectar si estamos en el cliente
  const fotos = [
    {
      id: 1,
      src: "/photos/Nature_01.JPG",
      titulo: 'Sand Dunes',
      categoria: 'Nature',
      descripcion: 'Natural sand dunes at the beach'
    },
    {
      id: 2,
      src: "/photos/Nature_02.JPG",
      titulo: "Mountain through the clouds",
      categoria: "Nature",
      descripcion: "Majestic mountain peak surrounded by clouds"
    },
    {
      id: 3,
      src: "/photos/Nature_03.JPG",
      titulo: "From the river to the ocean",
      categoria: "Nature",
      descripcion: "River flowing into the ocean"
    },
    {
      id: 4,
      src: "/photos/Nature_04.jpg",
      titulo: "Focusing flowers 01",
      categoria: "Close-up",
      descripcion: "Lonely flower in a field"
    },
    {
      id: 5,
      src: "/photos/Nature_05.jpg",
      titulo: "Focusing flowers 02",
      categoria: "Close-up",
      descripcion: "Meet its new friends"
    },
    {
      id: 6,
      src: "/photos/Nature_06.JPG",
      titulo: "Mountain Lake",
      categoria: "Nature",
      descripcion: "Serene mountain lake"
    },
    {
      id: 7,
      src: "/photos/Nature_07.JPG",
      titulo: "Coastal Beach 01",
      categoria: "Nature",
      descripcion: "Beautiful beach with clear water full of tourists"
    },
    {
      id: 8,
      src: "/photos/Nature_08.JPG",
      titulo: "At the World's End 01",
      categoria: "Nature",
      descripcion: "The End?"
    },
    {
      id: 9,
      src: "/photos/Nature_09.JPG",
      titulo: "Coastal Beach 02",
      categoria: "Nature",
      descripcion: "Another one, this time with cliffs"
    },
    {
      id: 10,
      src: "/photos/Nature_10.JPG",
      titulo: "Lighthouse Cliffs",
      categoria: "Nature",
      descripcion: "A lifesaving lighthouse on the cliffs"
    },
    {
      id: 11,
      src: "/photos/Portrait_01.JPG",
      titulo: "Pair of jet skis",
      categoria: "Close-up",
      descripcion: "Two jet skis ready for adventure"
    },
    {
      id: 12,
      src: "/photos/Portrait_02.JPG",
      titulo: "Spiritual Stone",
      categoria: "Close-up",
      descripcion: "We all have done this at least once"
    },
    {
      id: 13,
      src: "/photos/Urban_01.JPG",
      titulo: "Plane in the sky",
      categoria: "Close-up",
      descripcion: "A plane flying high in the sky"
    },
    {
      id: 14,
      src: "/photos/Urban_02.JPG",
      titulo: "Portugal Fortress",
      categoria: "Urban",
      descripcion: "A historic fortress in Portugal"
    },
    {
      id: 15,
      src: "/photos/Urban_03.JPG",
      titulo: "Portufal's Flag",
      categoria: "Close-up",
      descripcion: "The flag of Portugal waving in the wind"
    },
    {
      id: 16,
      src: "/photos/Urban_04.JPG",
      titulo: "Beach Lighthouse",
      categoria: "Nature",
      descripcion: "A lighthouse guiding ships at the beach"
    },
    {
      id: 17,
      src: "/photos/Urban_05.JPG",
      titulo: "Beach Hammocks",
      categoria: "Urban",
      descripcion: "Empty once in a blue moon"
    },
    {
      id: 18,
      src: "/photos/Urban_06.JPG",
      titulo: "Village Rooftops",
      categoria: "Urban",
      descripcion: "Aerial view of village rooftops"
    },
    {
      id: 19,
      src: "/photos/Urban_07.JPG",
      titulo: "Bell Tower 01",
      categoria: "Urban",
      descripcion: "Historic bell tower in Portugal"
    },
    {
      id: 20,
      src: "/photos/Urban_08.JPG",
      titulo: "Bell Tower 02",
      categoria: "Urban",
      descripcion: "An interesting point of view"
    },
    {
      id: 21,
      src: "/photos/Urban_09.JPG",
      titulo: "Music Corridor",
      categoria: "Urban",
      descripcion: "Reserved for musicians and artists"
    }
  ];

  // Función para mezclar array aleatoriamente (algoritmo Fisher-Yates)
  const mezclarArray = <T,>(array: T[]): T[] => {
    const arrayMezclado = [...array] // Crear copia para no modificar el original
    
    for (let i = arrayMezclado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arrayMezclado[i], arrayMezclado[j]] = [arrayMezclado[j], arrayMezclado[i]]
    }
    
    return arrayMezclado
  }

  const categorias = ['All', 'Nature', 'Urban', 'Close-up']

  // Función para filtrar fotos
  const fotosFiltradas = useMemo(() => {
    const fotosPorCategoria = categoriaActiva === 'All' 
      ? fotos 
      : fotos.filter(foto => foto.categoria === categoriaActiva);
    
    // Mezclar las fotos aleatoriamente solo si estamos en el cliente
    return isClient ? mezclarArray(fotosPorCategoria) : fotosPorCategoria;
  }, [categoriaActiva, mezclaSeed, isClient]); // Incluir mezclaSeed e isClient para forzar re-cálculo

  // Función para cambiar categoría
  const cambiarCategoria = (categoria: string) => {
    // setCargando(true)
    setCategoriaActiva(categoria)
    
    // Generar nueva semilla para mezclar
    setMezclaSeed(prev => prev + 1)
    
    // setTimeout(() => {
    //   setCargando(false)
    // }, 300)
  }
  
  // Efecto para detectar si estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Efecto de aparicion gradual de las fotos
  useEffect(() => {
    // Resetear animaciones cuando cambia la categoría
    setFotosVisibles([]);
    
    // Calcular fotos filtradas dentro del useEffect
    const fotosParaMostrar = categoriaActiva === 'All' 
      ? fotos 
      : fotos.filter(foto => foto.categoria === categoriaActiva);
    
    // Mostrar fotos gradualmente
    fotosParaMostrar.forEach((foto, index) => {
      setTimeout(() => {
        setFotosVisibles(prev => [...prev, foto.id]);
      }, index * 100);
    });

    // Mezclar las fotos solo si estamos en el cliente
    if (isClient) {
      setMezclaSeed(Math.floor(Math.random() * 1000));
    }
  }, [categoriaActiva, isClient]); // Depende de categoriaActiva e isClient



  // return -------------------------------------
  return (
    <div>
      <header className="header">

        {/* Component 1 : Navbar */}  
        <nav className="nav">
          <h1 className="logo">ISO Diaries</h1>

          <ul className="nav-menu">
            <li><a href="#inicio" onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}>Home</a></li>
            <li><a href="#galeria" onClick={() => document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' })}>Gallery</a></li>
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
            <button 
              className="cta-button"
              onClick={() => {
                document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth'})
              }}
            >View Gallery</button>
          </div>
        </section>

        {/* Component 3 : Gallery Section */}
        <section id="galeria" className="gallery">
          <div className="gallery-container">
            <h2 className="section-title">Gallery</h2>
            <p className="section-subtitle">Explore my collection of photographs capturing life's beautiful moments</p>
            <div className="gallery-counter">
              Showing {fotosFiltradas.length} of {fotos.length} photographs
            </div>
          </div>

          {/* Component 3.5 : Filter Buttons */}
          <div className="filter-buttons">
            {categorias.map((categoria) => (
              <button 
                key={categoria}
                className={`filter-btn ${categoriaActiva === categoria ? 'active' : ''}`}
                onClick={() => cambiarCategoria(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {cargando ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading Photos...</p>
                </div>
              ) : (
                fotosFiltradas.map((foto, index) => (
                  <div 
                    key={foto.id} 
                    className={`gallery-item ${fotosVisibles.includes(foto.id) ? 'visible' : 'hidden'}`}
                  >
                    <img src={foto.src || "/placeholder.svg"} alt={foto.titulo} />
                    <div className="gallery-overlay">
                      <h3>{foto.titulo}</h3>
                      <p>{foto.descripcion}</p>
                      <span className="categoria-tag">{foto.categoria}</span>
                    </div>
                  </div>
                ))
              )}
          </div>
        </section>
      </main>
    </div>
  )
}
