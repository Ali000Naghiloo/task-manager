import React, { FormEvent, useRef } from 'react';
import { Button, Col, Modal, Row, Form, Container } from 'react-bootstrap';
import Btn from './Btn';
import { RsetMessageModal } from '../hooks/slices/main';
import { useDispatch, useSelector } from 'react-redux';

const MessageAlert = ({ title = '' }) => {
  const dispatch = useDispatch();
  const { main } = useSelector((state) => state);

  return (
    <>
      <Modal
        // size='lg'
        keyboard={true}
        backdrop="static"
        centered
        show={main?.messageModal?.show}
        onHide={() => dispatch(RsetMessageModal({ show: false }))}>
        <Modal.Body>
          <Container>
            <Row>
              <Col md="12" className="d-flex justify-content-center">
                <i className=" bi bi-exclamation-triangle-fill font45 text-danger" />
              </Col>
              <Col md="12" className="d-flex justify-content-center">
                <span className=" ">{main?.messageModal?.title}</span>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Btn
            variant="danger"
            onClick={() => dispatch(RsetMessageModal({ show: false }))}
            title="تایید"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MessageAlert;
