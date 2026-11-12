
import "src/styles/Error/Error.css"

export default function Error({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Error</h2>

                <p>{message}</p>

                <button onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}
