import "./UseSvg.css";

// Pinta un SVG guardado en public/Svg/<icon>.Svg.
// Cada archivo contiene un <symbol id="icon-<icon>" viewBox="..."> con el dibujo,
// así que aquí no hace falta repetir el viewBox ni los paths.
//
//   <UseSvg icon="htb" />                          -> /Svg/htb.Svg#icon-htb
//   <UseSvg icon="prompt" titleSvg="Logo" />       -> accesible con título
//   <UseSvg icon="x" pathSpray="/Svg/icons.Svg" /> -> si usas un sprite con varios símbolos
//   <UseSvg icon="htb" style={{ width: 48, height: 48, color: "red" }} />
//
// Tamaño por defecto 2rem x 2rem (en UseSvg.css, fácil de sobrescribir desde tu CSS).
// `style` va inline: úsalo solo para cosas fijas; si quieres :hover o media queries, usa CSS.
// El Svg lleva siempre la clase "<icon>-icon" por si necesitas animarlo desde CSS.
// Usa fill="currentColor" en el symbol para que el icono herede el color del texto.
function UseSvg({ icon, titleSvg, pathSpray, style, ...props }) {
    const href = `${pathSpray ?? `/svg/${icon}.svg`}#icon-${icon}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`use-svg ${icon}-icon`}
            style={style}
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
