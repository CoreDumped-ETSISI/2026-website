// Ventana tipo terminal: barra con ● ● ● y un título a la derecha.
// Estilos en src/styles/ui.css. Clases extra que se pueden combinar:
//   compact   -> estrecha (bloques sueltos)
//   media     -> proporción 5/4 (visual al lado de un texto)
//   glow      -> brillo verde suave de fondo
//   hoverable -> se levanta al pasar el ratón (o su .feature)
//
//   <Window title="colabora.sh" className="compact">...</Window>
function Window({ title, className = "", children, ...props }) {
    return (
        <div className={`window ${className}`.trim()} {...props}>
            <div className="window-bar" aria-hidden="true">
                <i /><i /><i />
                <span>{title}</span>
            </div>
            {children}
        </div>
    );
}

export default Window;
