// frontend/src/components/Navigation/OpenModalMenuItem.jsx

// import React from 'react';
import { useModal } from '../../context/ModalContext';

function OpenModalMenuItem({
    // component to render inside the modal
  modalComponent,
   // text of the menu item that opens the modal
  buttonText,
  // optional: callback function that will be called once the menu item that opens the modal is clicked
  onItemClick,
  // optional: callback function that will be called once the modal is closed
  onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <button
    type='button' 
    onClick={ onClick }
    className='modal-menu-button'
    >
      { buttonText }
    </button>
  )
}

export default OpenModalMenuItem;