import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import logo from '../assets/icons/core-green-black-both.svg';
import QuienesSomos from './sections/quienes-somos/QuienesSomos.jsx';
import QueHacemos from './sections/que-hacemos/QueHacemos.jsx';
import VenAConocernos from './sections/ven-a-conocernos/VenAConocernos.jsx';

const SECTIONS = ['blanco', 'verde', 'morado', 'negro'];
// Secciones con fondo oscuro → indicador en blanco
const DARK_SECTIONS = ['morado', 'negro'];
// Debe coincidir con la duración de la transición de .page en App.css
const TRANSITION_MS = 900;
// Tiempo sin eventos de rueda necesario para aceptar un nuevo gesto
// (evita que la inercia del trackpad salte varias secciones de golpe)
const WHEEL_QUIET_MS = 150;
const SWIPE_MIN_PX = 30;

const App = () => {
  const [introDone, setIntroDone] = useState(false);
  const [index, setIndex] = useState(0);

  const indexRef = useRef(0);
  const lockedRef = useRef(false);
  const animEndRef = useRef(0);
  const unlockTimerRef = useRef(null);

  const handleAnimationEnd = (e) => {
    if (e.animationName === 'introGradient') setIntroDone(true);
  };

  // Desbloquea la navegación cuando termina la transición y además
  // ha habido una pausa en los eventos de entrada
  const scheduleUnlock = useCallback(() => {
    clearTimeout(unlockTimerRef.current);
    const wait = Math.max(animEndRef.current - Date.now(), 0) + WHEEL_QUIET_MS;
    unlockTimerRef.current = setTimeout(() => {
      lockedRef.current = false;
    }, wait);
  }, []);

  const goTo = useCallback(
    (target) => {
      const next = Math.max(0, Math.min(SECTIONS.length - 1, target));
      if (next !== indexRef.current) {
        indexRef.current = next;
        setIndex(next);
        animEndRef.current = Date.now() + TRANSITION_MS;
      }
      lockedRef.current = true;
      scheduleUnlock();
    },
    [scheduleUnlock]
  );

  // Navegación por secciones: rueda, gestos táctiles y teclado
  useEffect(() => {
    if (!introDone) return undefined;

    const step = (dir) => {
      if (lockedRef.current) {
        scheduleUnlock();
        return;
      }
      goTo(indexRef.current + dir);
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 1) return;
      step(e.deltaY > 0 ? 1 : -1);
    };

    let touchStartY = null;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => e.preventDefault();
    const onTouchEnd = (e) => {
      if (touchStartY === null) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      touchStartY = null;
      if (Math.abs(dy) < SWIPE_MIN_PX || lockedRef.current) return;
      goTo(indexRef.current + (dy > 0 ? 1 : -1));
    };

    const KEYS = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 };
    const onKeyDown = (e) => {
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        goTo(e.key === 'Home' ? 0 : SECTIONS.length - 1);
        return;
      }
      if (!(e.key in KEYS)) return;
      e.preventDefault();
      if (!lockedRef.current) goTo(indexRef.current + KEYS[e.key]);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(unlockTimerRef.current);
    };
  }, [introDone, goTo, scheduleUnlock]);

  const dotsClass = [
    'dots',
    introDone && 'dots--visible',
    DARK_SECTIONS.includes(SECTIONS[index]) && 'dots--light',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="viewport">
      <main className="page" style={{ transform: `translateY(${-index * 100}vh)` }}>
        {/* Gradiente de 4 pantallas de alto */}
        <div className="gradient" onAnimationEnd={handleAnimationEnd} />

        {SECTIONS.map((name, i) => (
          <section
            key={name}
            id={name}
            className={`screen screen--${name}${i === index ? ' screen--active' : ''}`}
          >
            {name === 'blanco' && (
              <img
                src={logo}
                alt="Logo"
                className={`logo${introDone ? ' logo--visible' : ''}`}
              />
            )}
            {name === 'verde' && <QuienesSomos />}
            {name === 'morado' && <QueHacemos />}
            {name === 'negro' && <VenAConocernos />}
          </section>
        ))}
      </main>

      <nav className={dotsClass} aria-label="Secciones">
        {SECTIONS.map((name, i) => (
          <button
            key={name}
            type="button"
            className={`dot${i === index ? ' dot--active' : ''}`}
            aria-label={`Ir a la sección ${name}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </nav>
    </div>
  );
};

export default App;
