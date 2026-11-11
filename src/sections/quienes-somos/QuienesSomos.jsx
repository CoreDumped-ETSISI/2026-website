import React from 'react';
import './QuienesSomos.css';
import fotoSala from './../../../assets/verde/todos_sala.webp';
import fotoCodeboost from './../../../assets/verde/codeboost.webp';
import fotoLluvia from './../../../assets/verde/bajolalluvia.webp';

const QuienesSomos = () => (
  <div className="quienes">
    <div className="quienes__text">
      <h2 className="quienes__title reveal" style={{ '--delay': '0.35s' }}>
        ¿Quiénes somos?
      </h2>

      <p className="quienes__body reveal" style={{ '--delay': '0.5s' }}>
        Somos una <strong>asociación de estudiantes</strong> dedicada al
        aprendizaje externo. Hacemos talleres, sacamos adelante proyectos
        chulos y, sobre todo, disfrutamos proponiendo actividades
        alternativas para quienes quieren aprender más.
      </p>

      <ul className="quienes__tags reveal" style={{ '--delay': '0.65s' }}>
        <li>Talleres</li>
        <li>Proyectos</li>
        <li>Actividades alternativas</li>
      </ul>
    </div>

    <div className="quienes__photos">
      <figure className="photo photo--main reveal" style={{ '--delay': '0.5s' }}>
        <img src={fotoSala} alt="Miembros de la asociación reunidos en el local" />
      </figure>
      <figure className="photo photo--secondary reveal" style={{ '--delay': '0.65s' }}>
        <img src={fotoCodeboost} alt="Miembros de la asociación con los trofeos de CodeBoost" />
      </figure>
      <figure className="photo photo--tertiary reveal" style={{ '--delay': '0.8s' }}>
        <img src={fotoLluvia} alt="Miembros de la asociación bajo la lluvia" />
      </figure>
    </div>
  </div>
);

export default QuienesSomos;

