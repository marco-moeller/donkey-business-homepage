import { RiLoginBoxLine } from "react-icons/ri";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import Login from "./Login";

function LoginButton() {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <button className="login--btn" onClick={toggle}>
        <RiLoginBoxLine />
      </button>
      {isShowing && (
        <Modal>
          <Login toggle={toggle} />
        </Modal>
      )}
    </>
  );
}

export default LoginButton;
