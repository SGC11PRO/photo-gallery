"use client"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

// Move fotos array outside component to prevent recreation on every render
const fotos = [
  {
    id: 1,
    src: "/photos/Nature_01.JPG",
    titulo: "Sand Dunes",
    categoria: "Nature",
    descripcion: "Natural sand dunes at the beach",
  },
  {
    id: 2,
    src: "/photos/Nature_02.JPG",
    titulo: "Mountain through the clouds",
    categoria: "Nature",
    descripcion: "Majestic mountain peak surrounded by clouds",
  },
  {
    id: 3,
    src: "/photos/Nature_03.JPG",
    titulo: "From the river to the ocean",
    categoria: "Nature",
    descripcion: "River flowing into the ocean",
  },
  {
    id: 4,
    src: "/photos/Nature_04.jpg",
    titulo: "Focusing flowers 01",
    categoria: "Close-up",
    descripcion: "Lonely flower in a field",
  },
  {
    id: 5,
    src: "/photos/Nature_05.jpg",
    titulo: "Focusing flowers 02",
    categoria: "Close-up",
    descripcion: "Meet its new friends",
  },
  {
    id: 6,
    src: "/photos/Nature_06.JPG",
    titulo: "Mountain Lake",
    categoria: "Nature",
    descripcion: "Serene mountain lake",
  },
  {
    id: 7,
    src: "/photos/Nature_07.JPG",
    titulo: "Coastal Beach 01",
    categoria: "Nature",
    descripcion: "Beautiful beach with clear water full of tourists",
  },
  {
    id: 8,
    src: "/photos/Nature_08.JPG",
    titulo: "At the World's End 01",
    categoria: "Nature",
    descripcion: "The End?",
  },
  {
    id: 9,
    src: "/photos/Nature_09.JPG",
    titulo: "Coastal Beach 02",
    categoria: "Nature",
    descripcion: "Another one, this time with cliffs",
  },
  {
    id: 10,
    src: "/photos/Nature_10.JPG",
    titulo: "Lighthouse Cliffs",
    categoria: "Nature",
    descripcion: "A lifesaving lighthouse on the cliffs",
  },
  {
    id: 11,
    src: "/photos/Portrait_01.JPG",
    titulo: "Pair of jet skis",
    categoria: "Close-up",
    descripcion: "Two jet skis ready for adventure",
  },
  {
    id: 12,
    src: "/photos/Portrait_02.JPG",
    titulo: "Spiritual Stone",
    categoria: "Close-up",
    descripcion: "We all have done this at least once",
  },
  {
    id: 13,
    src: "/photos/Urban_01.JPG",
    titulo: "Plane in the sky",
    categoria: "Close-up",
    descripcion: "A plane flying high in the sky",
  },
  {
    id: 14,
    src: "/photos/Urban_02.JPG",
    titulo: "Portugal Fortress",
    categoria: "Urban",
    descripcion: "A historic fortress in Portugal",
  },
  {
    id: 15,
    src: "/photos/Urban_03.JPG",
    titulo: "Portufal's Flag",
    categoria: "Close-up",
    descripcion: "The flag of Portugal waving in the wind",
  },
  {
    id: 16,
    src: "/photos/Urban_04.JPG",
    titulo: "Beach Lighthouse",
    categoria: "Nature",
    descripcion: "A lighthouse guiding ships at the beach",
  },
  {
    id: 17,
    src: "/photos/Urban_05.JPG",
    titulo: "Beach Hammocks",
    categoria: "Urban",
    descripcion: "Empty once in a blue moon",
  },
  {
    id: 18,
    src: "/photos/Urban_06.JPG",
    titulo: "Village Rooftops",
    categoria: "Urban",
    descripcion: "Aerial view of village rooftops",
  },
  {
    id: 19,
    src: "/photos/Urban_07.JPG",
    titulo: "Bell Tower 01",
    categoria: "Urban",
    descripcion: "Historic bell tower in Portugal",
  },
  {
    id: 20,
    src: "/photos/Urban_08.JPG",
    titulo: "Bell Tower 02",
    categoria: "Urban",
    descripcion: "An interesting point of view",
  },
  {
    id: 21,
    src: "/photos/Urban_09.JPG",
    titulo: "Music Corridor",
    categoria: "Urban",
    descripcion: "Reserved for musicians and artists",
  },
]

export default function Home() {
  // code logic -----------------------------------
  const [categoriaActiva, setCategoriaActiva] = useState("All")
  const [fotosVisibles, setFotosVisibles] = useState<number[]>([])
  const [cargando] = useState(false)
  const [imagenModal, setImagenModal] = useState<(typeof fotos)[0] | null>(null)
  const [indiceModal, setIndiceModal] = useState<number>(0)

  const categorias = ["All", "Nature", "Urban", "Close-up"]

  // Función para filtrar fotos - Fixed logic to use 'All' instead of 'Todas'
  const fotosFiltradas = useMemo(() => {
    return categoriaActiva === "All" ? fotos : fotos.filter((foto) => foto.categoria === categoriaActiva)
  }, [categoriaActiva])

  // Función para cambiar categoría
  const cambiarCategoria = (categoria: string) => {
    setCategoriaActiva(categoria)
  }

  // Función para abrir modal
  const abrirModal = (foto: (typeof fotos)[0]) => {
    const indice = fotosFiltradas.findIndex((f) => f.id === foto.id)
    setIndiceModal(indice)
    setImagenModal(foto)
    document.body.style.overflow = "hidden" // Prevent background scrolling
  }

  // Función para cerrar modal
  const cerrarModal = () => {
    setImagenModal(null)
    document.body.style.overflow = "unset"
  }

  // Función para navegar en el modal
  const navegarModal = (direccion: "prev" | "next") => {
    let nuevoIndice = indiceModal

    if (direccion === "next") {
      nuevoIndice = (indiceModal + 1) % fotosFiltradas.length
    } else {
      nuevoIndice = indiceModal === 0 ? fotosFiltradas.length - 1 : indiceModal - 1
    }

    setIndiceModal(nuevoIndice)
    setImagenModal(fotosFiltradas[nuevoIndice])
  }

  // Efecto de aparicion gradual de las fotos - Fixed dependencies
  useEffect(() => {
    setFotosVisibles([])

    fotosFiltradas.forEach((foto) => {
      setTimeout(() => {
        setFotosVisibles((prev) => [...prev, foto.id])
      }, Math.random() * 500)
    })
  }, [fotosFiltradas]) // Removed 'fotos' from dependencies since it's now constant

  // Efecto para manejar teclas del modal
  useEffect(() => {
    const manejarTecla = (e: KeyboardEvent) => {
      if (!imagenModal) return

      switch (e.key) {
        case "Escape":
          cerrarModal()
          break
        case "ArrowLeft":
          navegarModal("prev")
          break
        case "ArrowRight":
          navegarModal("next")
          break
      }
    }

    if (imagenModal) {
      document.addEventListener("keydown", manejarTecla)
      return () => document.removeEventListener("keydown", manejarTecla)
    }
  }, [imagenModal, indiceModal, fotosFiltradas])

  // return -------------------------------------
  return (
    <div>
      <header className="header">
        {/* Component 1 : Navbar */}
        <nav className="nav">
          <h1 className="logo">ISO Diaries</h1>

          <ul className="nav-menu">
            <li>
              <a
                href="#inicio"
                onClick={() => document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#galeria"
                onClick={() => document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" })}
              >
                Gallery
              </a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
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
                document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              View Gallery
            </button>
          </div>
        </section>

        {/* Component 3 : Gallery Section */}
        <section id="galeria" className="gallery">
          <div className="gallery-container">
            <h2 className="section-title">Gallery</h2>
            <p className="section-subtitle">
              Explore my collection of photographs capturing life&apos;s beautiful moments
            </p>
            <div className="gallery-counter">
              Showing {fotosFiltradas.length} of {fotos.length} photographs
            </div>
          </div>

          {/* Component 3.5 : Filter Buttons */}
          <div className="filter-buttons">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className={`filter-btn ${categoriaActiva === categoria ? "active" : ""}`}
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
              fotosFiltradas.map((foto) => (
                <div
                  key={foto.id}
                  className={`gallery-item ${fotosVisibles.includes(foto.id) ? "visible" : "hidden"}`}
                  onClick={() => abrirModal(foto)}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={foto.src || "/placeholder.svg"} alt={foto.titulo} width={400} height={300} />
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

        {/* Modal Component */}
        {imagenModal && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={cerrarModal}>
                  <Image 
                    src={'/images/close.png'}
                    alt="Next icon"
                    width={20}
                    height={20}
                    className="modal-nav-img"
                  />
              </button>

              <button
                className="modal-nav modal-prev"
                onClick={() => navegarModal("prev")}
                disabled={fotosFiltradas.length <= 1}
              >
                <Image 
                  src={'/images/prev.png'}
                  alt="Next icon"
                  width={20}
                  height={20}
                  className="modal-nav-img"
                />
              </button>

              <div className="modal-image-container">
                <Image
                  src={imagenModal.src || "/placeholder.svg"}
                  alt={imagenModal.titulo}
                  width={1200}
                  height={800}
                  className="modal-image"
                  priority
                />
                <div className="modal-info">
                  <h3>{imagenModal.titulo}</h3>
                  <p>{imagenModal.descripcion}</p>
                  <span className="modal-categoria">{imagenModal.categoria}</span>
                  <div className="modal-counter">
                    {indiceModal + 1} / {fotosFiltradas.length}
                  </div>
                </div>
              </div>

              <button
                className="modal-nav modal-next"
                onClick={() => navegarModal("next")}
                disabled={fotosFiltradas.length <= 1}
              >
              <Image 
                src={'/images/next.png'}
                alt="Next icon"
                width={20}
                height={20}
                className="modal-nav-img"
              />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
