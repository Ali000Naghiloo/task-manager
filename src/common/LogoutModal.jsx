import { Modal, Spinner } from 'react-bootstrap';
import Btn from '../components/Btn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import asyncWrapper from '../utils/asyncWrapper';

const LogoutModal = ({ toggle, setToggle }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = asyncWrapper(async () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem('tokenId');
      navigate('/');
      setLoading(false);
    }, 2000);
  });

  return (
    <>
      <Modal centered show={toggle} onHide={() => setToggle(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-danger text-white  justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            خروج
          </span>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex align-items-center gap-1">
            <i className="font20 text-danger bi bi-exclamation-triangle-fill" />
            {`آیا از خروج اطمینان دارید؟`}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Btn variant="outline-success" title="لغو" onClick={() => setToggle(false)} />
          <Btn
            variant="danger"
            title={loading ? <Spinner size="sm" /> : 'خروج'}
            onClick={handleLogout}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutModal;
