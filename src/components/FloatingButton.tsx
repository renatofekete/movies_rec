import React from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

interface FloatingButtonProps {
    buttonContent: string;
    children: React.ReactNode;
}

const FloatingButton = ({ buttonContent, children }: FloatingButtonProps) => {
    const [showModal, setShowModal] = React.useState(true);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <button onClick={handleClick}>{buttonContent}</button>
            {showModal &&
                createPortal(
                    <Modal onClose={handleClose}>{children}</Modal>,
                    document.body
                )}
        </>
    );
};

export default FloatingButton;
