import { Container, Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RsetDeleteModal } from '../hooks/slices/main';
import Btn from '../components/Btn';

const DeleteModal = ({ title }) => {
  const dispatch = useDispatch();
  const { main } = useSelector((state) => state);

  return (
    <>
      <Modal
        centered
        show={main?.deleteModal?.value}
        onHide={() => dispatch(RsetDeleteModal({ value: false }))}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-danger text-white  justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            حذف
          </span>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex align-items-center gap-1">
            <i className="font20 text-danger bi bi-exclamation-triangle-fill" />
            {`آیا از حذف "${title ? title : ''}" اطمینان دارید؟`}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Btn
            variant="outline-success"
            title="لغو"
            onClick={() =>
              dispatch(RsetDeleteModal({ ...main?.deleteModal, value: false, answer: 'no' }))
            }
          />
          <Btn
            variant="danger"
            title="حذف"
            onClick={() =>
              dispatch(RsetDeleteModal({ ...main?.deleteModal, value: false, answer: 'yes' }))
            }
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
