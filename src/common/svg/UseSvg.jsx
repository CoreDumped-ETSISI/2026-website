// Pinta un SVG guardado en public/svg/<icon>.svg.
// Cada archivo contiene un <symbol id="icon-<icon>" viewBox="..."> con el dibujo,
// así que aquí no hace falta repetir el viewBox ni los paths.
//
//   <UseSvg icon="htb" />                          -> /svg/htb.svg#icon-htb
//   <UseSvg icon="prompt" titleSvg="Logo" />       -> accesible con título
//   <UseSvg icon="x" pathSpray="/svg/icons.svg" /> -> si usas un sprite con varios símbolos
//   <UseSvg icon="htb" style={{ width: 48, height: 48, color: "red" }} />
//
// Los estilos se pasan con `style` y se mezclan con los de por defecto (2rem x 2rem).
// El svg lleva siempre la clase "<icon>-icon" por si necesitas animarlo desde CSS.
// Usa fill="currentColor" en el symbol para que el icono herede el color del texto.
const defaultStyle = {
    display: "inline-block",
    flexShrink: 0,
    width: "2rem",
    height: "2rem",
};

function UseSvg({ icon, titleSvg, pathSpray, style, ...props }) {
    const href = `${pathSpray ?? `/svg/${icon}.svg`}#icon-${icon}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${icon}-icon`}
            style={{ ...defaultStyle, ...style }}
            role={titleSvg ? "img" : undefined}
            aria-hidden={titleSvg ? undefined : true}
            focusable="false"
            {...props}
        >
            {titleSvg && <title>{titleSvg}</title>}
            <use href={href} />
        </svg>
    );
}

export default UseSvg;
