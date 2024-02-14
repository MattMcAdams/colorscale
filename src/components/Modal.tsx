import React from "react";

// https://blog.logrocket.com/creating-reusable-pop-up-modal-react/

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  hasCloseBtn,
  onClose,
  children,
}) => {
  const [isModalOpen, setModalOpen] = React.useState(isOpen);
  const modalRef = React.useRef<HTMLDialogElement | null>(null);

  React.useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      onBlur={() => handleCloseModal()}
      className="relative p-4 w-full max-w-3xl max-h-full rounded-lg shadow-lg"
    >
      {hasCloseBtn && (
        <button className="modal-close-btn" onClick={handleCloseModal}>
          Close
        </button>
      )}
      {children}
    </dialog>
  );
};

export default Modal;
