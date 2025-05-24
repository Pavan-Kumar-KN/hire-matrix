import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const ResumeModal = ({ imageUrl, onClose }) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);

    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <button
          className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full text-text-dark hover:bg-white hover:text-primary transition-colors"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>

        <div className="overflow-auto max-h-[90vh] p-2">
          <img
            src={imageUrl}
            alt="Resume"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
