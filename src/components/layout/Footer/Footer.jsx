
export default function Footer() {
    return (
        <footer>
            <p>
                © {new Date().getFullYear()} CoreDumped
            </p>

            <p>
                Licensed under the Apache License, Version 2.0.
            </p>

            <a
                href="https://www.apache.org/licenses/LICENSE-2.0"
                target="_blank"
                rel="noopener noreferrer"
            >
                Apache License 2.0
            </a>
        </footer>
    );
}

