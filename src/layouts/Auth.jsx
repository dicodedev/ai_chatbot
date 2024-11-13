import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { StyledAuth } from "../components/styles/Auth.styled";
import background from "../assets/desktop--DyoIivM.png";
import Logo from "../assets/logos/logo_dark.png";
import success from "../assets/success.png";
import Modal from "react-bootstrap/Modal";
import Toast from "../components/AppToast";

export default function AuthLayout() {
  const token = useSelector((state) => state.auth.access_token);
  const appState = useSelector((state) => state.app);
  const handleClose = () => setShow(false);

  if (token) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <>
      {appState.toast && <Toast />}
      <div className="modal">
        <Modal
          show={false}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="text-center flex flex-col justify-center items-center"
        >
          <div className="flex flex-col justify-center items-center py-4">
            <img src={success} alt="Success mark" className="w-20 h-20" />
          </div>
          <p className="p-3 text-lg">
            A password reset link has been sent your email.
          </p>
          <div classsName="w-full flex flex-col">
            <Link to="/">
              <button
                onClick={handleClose}
                className="mb-4 bg-violet-800 text-white w-44 border-2 border-slate-100 text-lg outline-0 px-3 py-2 rounded-md font-medium"
              >
                Open email
              </button>
            </Link>
          </div>
        </Modal>
      </div>
      <StyledAuth>
        <div style={{ backgroundImage: `url(${background})` }}>
          <img src={Logo} />
          <div className="px-3">
            <Outlet />
          </div>
        </div>
        {/* <Outlet /> */}
      </StyledAuth>
    </>
  );
}
