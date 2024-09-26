import React, { useState } from 'react';
import { Container, Form, Modal, Row } from 'react-bootstrap';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import Btn from '../../components/Btn';
import { RsetShowCreateModal } from '../../hooks/slices/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import { serEditBoard, serPutEditBoard } from '../../services/masterServices';

const EditBoardModal = ({ showEditBoardModal, setShowEditBoardModal }) => {
  const { board } = useSelector((state) => state);
  const getIdProject = location?.pathname?.split(':')?.[1];
  const [sprintNum, setSprintNum] = useState(0);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });

  const handleCreateBoard = asyncWrapper(async (data) => {
    setShowEditBoardModal(false);
    const postData = {
      id: board?.fieldsEditProject?.editProjectData?.id,
      name: data?.name,
      description: data?.description,
      sprintNumber: sprintNum,
      boardWorkFlowsId: [
        // '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      ],
      boardUsersId: ['string'],
      attachmentsEditViewModel: [
        // {
        //   id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        //   fileName: 'string',
        //   filePath: 'string',
        //   uploadDate: 'string',
        //   attachCreatorId: 'string'
        // }
      ]
    };
    console.log(res);
  });

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showEditBoardModal}
        onHide={() => setShowEditBoardModal(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-warning text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ویرایش بورد
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Input name="name" xl={6} label="نام بورد:" control={control} />
                <Row className="mt-4">
                  <SwitchCase
                    value={sprintNum}
                    onChange={(e) => setSprintNum(e.target.value)}
                    name="sprintNumber"
                    range
                    label="سرعت پروژه:"
                  />
                </Row>
                <Row>
                  <Input xl={6} label="ایجاد توسط:" control={control} />
                  <ComboBox xl={6} control={control} label="اختصاص به:" />
                </Row>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Form.Label className="mt-4 d-flex ">توضیحات:</Form.Label>
                      <Form.Control {...field} name="description" as="textarea" rows={3} />
                    </>
                  )}
                />
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="outline-warning" title="لغو" onClick={() => setShowEditBoardModal(false)} />
          <Btn
            variant="outline-primary"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateBoard(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditBoardModal;
