import classes from "@/styles/Modal.module.css";
const Modal = ({ children }) => {
  return (
    <div className={classes["modal"]}>
      <div className={classes["modal-content"]}>{children}</div>
    </div>
  );
};

export default Modal;
