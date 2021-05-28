import css from "./modal.module.css";
import { Modal } from "@material-ui/core";
import { ReactElement } from "react";

interface ModalType {
  open: boolean;
  onClose: () => void;
  children: ReactElement | string | number;
}
function ModalWindow({ open, onClose, children }: ModalType) {
  return (
    <Modal
      className={css.modalWrapper}
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={css.modal}>
        <img
          onClick={onClose}
          className={css.close}
          src="/img/cancel.png"
          alt="X"
        />
        <div className={css.content}>{children}</div>
      </div>
    </Modal>
  );
}

export default ModalWindow;
