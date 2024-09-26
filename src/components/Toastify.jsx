import React from 'react';
import { Button, Col, Row, Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RsetShowToast } from '../hooks/slices/main';

const Toastify = () => {
  const { main } = useSelector((state) => state);
  const dispatch = useDispatch();

  const oparationIcons = () => {
    if (main?.showToast?.bg === 'danger') {
      return <i className="font20 text-danger bi bi-exclamation-triangle-fill" />;
    }
    if (main?.showToast?.bg === 'info') {
      return <i className="font20 text-white" />;
    }
    if (main?.showToast?.bg === 'success') {
      return <i className="font20 text-success bi bi-check-circle-fill" />;
    }
    if (main?.showToast?.bg === 'warning') {
      return <i className="font20 text-dark bi bi-exclamation-triangle-fill" />;
    }
  };

  return (
    <>
      {/* <Row className="d-flex toastContainer">
        <Col xs="10" sm="10" xl="12" className="d-flex">
          <Toast
            bg={main?.showToast?.bg}
            onClose={() => dispatch(RsetShowToast({ show: false }))}
            show={main?.showToast?.show}
            delay={3000}
            autohide>
            <Toast.Header></Toast.Header>
            <Toast.Body
              className={`d-flex py-4 justify-content-end text-end ${main?.showToast?.bg === 'warning' ? 'text-dark' : 'text-white'}`}>
              {main?.showToast?.title}
            </Toast.Body>
          </Toast>
        </Col>
      </Row> */}
    </>
  );
};

export default Toastify;
