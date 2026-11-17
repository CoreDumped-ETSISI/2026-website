import { Image } from "@mantine/core";

const ColaboratorsList = [
    {
        name: "HTB", svg: <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
            <g fill="none" stroke="#9fef00" stroke-width="32" stroke-linecap="round" stroke-linejoin="round">
                <path d="M256 64 L426.67 160 L426.67 352 L256 448 L85.33 352 L85.33 160 Z" />
                <path d="M256 256 L256 448" />
                <path d="M256 256 L426.67 160" />
                <path d="M256 256 L85.33 160" />
            </g>
        </svg></>
    },
    {
        name: "Siemens", svg: <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 555 555">
            <path d="M.2 25c0-13.8 11.2-25 25-25h505c13.8 0 25 11.2 25 25v505c0 13.8-11.2 25-25 25h-505c-13.8 0-25-11.2-25-25V25z" fill="#099" />
            <path d="M144.4 454.9v-72.8c41.5 13.1 78 19.7 109.8 19.7 44 0 65.8-11.6 65.8-34.9 0-8.6-3-16.2-9.6-21.7-6.6-6.1-23.3-15.2-50.6-25.8-48.6-19.7-80-36.9-94.7-51-19.2-18.7-28.9-41.9-28.9-70.2 0-36.4 13.7-64.2 41.5-83.4 27.5-18.7 63.4-28.3 107.4-28.3 24.3 0 59.2 4.5 105.3 13.6v69.7c-34.4-13.6-65.8-20.2-95.2-20.2-41.5 0-61.8 11.1-61.8 33.9 0 8.6 4 15.7 12.7 20.7 7.1 4.5 25.8 13.6 57.2 27.8 45.1 19.7 74.9 37.4 89.6 52 17.7 17.7 26.3 39.9 26.3 67.7 0 39.9-17.2 70.2-52.1 91.5-28.3 17.2-64.7 25.3-109.3 25.3-36.9 0-74.9-4.5-113.4-13.6z" fill="#fff" />
        </svg></>
    },
    {
        name: "NextDigital", svg: <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="100%" height="100%">
            <defs>
                <mask id="nd-cutout">
                    <rect width="192" height="192" fill="white" />
                    <path d="M 38 58 H 50 A 28 28 0 0 1 78 86 V 134" fill="none" stroke="black" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M 104 58 H 128 A 38 38 0 0 1 128 134 H 104" fill="none" stroke="black" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" />
                </mask>
            </defs>
            <circle cx="18" cy="74" r="12.5" fill="#6bc4e8" />
            <circle cx="18" cy="118" r="12.5" fill="#f5a800" />
            <rect x="43" y="24" width="143" height="143" rx="34" ry="34" fill="#323e48" mask="url(#nd-cutout)" />
        </svg></>
    },
    {
        name: "Qualcomm", svg: <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%">
                <g fill="none" stroke="#3153dc" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="128" cy="112" r="80" />
                    <path d="M 132 120 L 152 140 L 152 220" />
                </g>
            </svg>
        </>
    },
    {
        name: "BambooLabs", svg: <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%">
                <g fill="none" stroke="#2c2d2c" stroke-width="24">
                    <circle cx="76" cy="128" r="52" />
                    <circle cx="180" cy="128" r="52" />
                </g>
            </svg></>
    },

]
function ColaboradoresList() {
    return (
        <>
            {
                ColaboratorsList.map((colaborator, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: index % 2 == 0 ? "row" : "row-reverse" }}>
                        {colaborator.svg}

                        <span>{colaborator.name}</span>
                    </div>
                ))
            }
        </>
    )
}
export default ColaboradoresList;
