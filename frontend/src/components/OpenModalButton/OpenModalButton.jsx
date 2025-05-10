// frontend/src/components/OpenModalButton/OpenModalButton.jsx

import { useModal } from '../../context/ModalContext';

function OpenModalButton({
  // component to render inside the modal
  modalComponent,
  // text of the button that opens the modal
  buttonText,
  // optional: callback function that will be called once the button that opens the modal is clicked
  onButtonClick,
  // optional: callback function that will be called once the modal is closed
  onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
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

export default OpenModalButton;