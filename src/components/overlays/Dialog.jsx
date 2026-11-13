import { createPortal } from "react-dom";
import "./../../styles/Dialog/Dialog.css";

export default function Dialog({ children, open, onClose }) {
  return createPortal(
    <dialog className={`dialog ${open ? "dialog--open" : ""}`} onClick={onClose}>
      <div className="dialog__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>,
    document.body
  );
}
