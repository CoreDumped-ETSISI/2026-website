import './QueHacemos.css';
import cartelDimension from './../../../assets/morado/carteldimension26.webp';
import tallerPython from './../../../assets/morado/tallerpython.webp';
import tallerScratch from './../../../assets/morado/tallerscratch.webp';
import tallerC from './../../../assets/morado/tallerC.webp';

const QueHacemos = () => (
  <div className="que-hacemos">
    <div className="que-hacemos__text">
      <h2 className="que-hacemos__title reveal" style={{ '--delay': '0.35s' }}>
        ¿Qué hacemos?
      </h2>

      <p className="que-hacemos__body reveal" style={{ '--delay': '0.5s' }}>
        Convertimos las ideas en experiencias para aprender haciendo: talleres
        de ayuda a alumnos, <strong>competiciones de programación</strong>,
        proyectos de impresión 3D y un club de ciberseguridad.
      </p>

      <p className="que-hacemos__body que-hacemos__body--last reveal" style={{ '--delay': '0.65s' }}>
        Y esto es solo el principio. Si está relacionado con la tecnología y
        puedes imaginarlo, podemos construirlo juntos.
      </p>
    </div>

    <div className="que-hacemos__photos">
      <figure className="purple-photo purple-photo--main reveal" style={{ '--delay': '0.5s' }}>
        <img src={cartelDimension} alt="Cartel de Dimension 26" />
      </figure>
      <figure className="purple-photo purple-photo--python reveal" style={{ '--delay': '0.65s' }}>
        <img src={tallerPython} alt="Taller de Python" />
      </figure>
      <figure className="purple-photo purple-photo--scratch reveal" style={{ '--delay': '0.8s' }}>
        <img src={tallerScratch} alt="Taller de Scratch" />
      </figure>
      <figure className="purple-photo purple-photo--c reveal" style={{ '--delay': '0.95s' }}>
        <img src={tallerC} alt="Taller de programacion en C" />
      </figure>
    </div>
  </div>
);

export default QueHacemos;
