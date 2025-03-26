import React from "react";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
