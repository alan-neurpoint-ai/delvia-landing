import "../styles/sections/Gallery.css";
import { dahyun, jyhoyo, mermelada, mina, nayeon, tzuyu } from "../assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const videos = [
  { img: nayeon, title: "Mermelada Casera", subtitle: "Receta de Nayeon" },
  { img: tzuyu, title: "Desayuno Saludable", subtitle: "Cocina con Tzuyu" },
  { img: dahyun, title: "Brunch Creativo", subtitle: "Inspirado por Dahyun" },
  { img: jyhoyo, title: "Moda Urbana", subtitle: "Street Style de Jyhoyo" },
  { img: mina, title: "Estilo Contemporáneo", subtitle: "Fotografía con Mina" },
  { img: mermelada, title: "Delicias Artesanales", subtitle: "100% Natural" },
];

export default function GalleryGrid() {
  useEffect(() => {
    AOS.init({ duration: 1800, once: true });
  }, []);

  // Estado para el carrusel móvil
  const [current, setCurrent] = useState(0);

  // Detecta si es mobile (menor a 900px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Navegación carrusel
  const next = () => setCurrent((c) => (c + 1) % videos.length);
  const prev = () => setCurrent((c) => (c - 1 + videos.length) % videos.length);

  return (
    <section
      className="gallery-grid-section"
      id="galeria"
      data-aos="fade-right"
      data-aos-delay="200"
    >
      <h2 className="gallery-grid-title">Galería</h2>

      {/* MODO DESKTOP: GRID */}
      {!isMobile && (
        <div className="gallery-grid">
          {videos.map((video, idx) => (
            <div className="gallery-grid-item" key={idx}>
              <img src={video.img} alt={video.title} />
              <div className="gallery-grid-overlay" />
              <div className="gallery-grid-info">
                <div className="gallery-grid-text">
                  <div className="gallery-grid-title-main">{video.title}</div>
                  <div className="gallery-grid-title-sub">{video.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODO MOBILE: CARRUSEL */}
      {isMobile && (
        <div className="gallery-carousel">
          <button
            className="carousel-arrow left"
            onClick={prev}
            aria-label="Anterior"
            type="button"
          >
            &#8592;
          </button>

          <div className="gallery-carousel-item">
            <img src={videos[current].img} alt={videos[current].title} />
            <div className="gallery-carousel-overlay" />
            <div className="gallery-carousel-info">
              <div className="gallery-grid-title-main">
                {videos[current].title}
              </div>
              <div className="gallery-grid-title-sub">
                {videos[current].subtitle}
              </div>
            </div>
          </div>

          <button
            className="carousel-arrow right"
            onClick={next}
            aria-label="Siguiente"
            type="button"
          >
            &#8594;
          </button>
        </div>
      )}
    </section>
  );
}
