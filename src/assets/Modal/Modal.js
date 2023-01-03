import React from 'react';
import { useModal } from '../../Redux/actions/useModal';
import { useSelector } from "react-redux";
import './Modal.css';


function Modal() {
  const { hideModal } = useModal();
  const modal = useSelector((state) => state.modal);

  const onCloseModal = () => {
    hideModal()
  }
  return (<>
    {
      modal.open &&
      <div className="modal-overlay">
        <div className="modal">
          <span className="modal-close" onClick={onCloseModal}>
            &#10005; {/* HTML code for a multiplication sign */}
          </span>

          <div>
            <p>This is my new modal!</p>
            <p>{modal.message}</p>
          </div>
        </div>

      </div>
    }
  </>

  );
}

export default Modal;