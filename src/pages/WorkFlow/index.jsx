import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { RsetShowCreateModal, handleGetBoards } from '../../hooks/slices/boardSlice';
import { Controller, useForm } from 'react-hook-form';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import { DateObject } from 'react-multi-date-picker';
import StringHelpers from '../../helpers/StringHelpers';
import {
  addNewWorkFlowToBoard,
  serCreateTask,
  serGetWorkFlows,
  serPutEditWorkFlow
} from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import { useLocation } from 'react-router-dom';
import { RsetShowToast } from '../../hooks/slices/main';
import ColorPicker from '../../components/ColorPicker';

const CreateWorkFlow = ({
  setWorkflowEditItem,
  handleAllTasks,
  workflowEditItem,
  setShowWorkFlow,
  showWorkFlow,
  handleWorkFlows
}) => {
  const board = useSelector((state) => state.board);
  const location = useLocation();
  const [color, setColor] = useState('');
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });
  const getIdProject = location?.pathname?.split(':')?.[1];

  const handleCreateWorkFlow = asyncWrapper(async (data) => {
    if (!!workflowEditItem?.name) {
      const postData = {
        id: workflowEditItem?.id,
        name: data?.name,
        description: 'data?.description',
        color: color
      };
      const res = await serPutEditWorkFlow(postData);
      if (res?.data?.code === 1) {
        setShowWorkFlow(false);
        handleAllTasks();
        handleWorkFlows();
        dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
        dispatch(handleGetBoards(getIdProject));
      }
    } else {
      const postData = {
        name: data?.name,
        color: color,
        description: 'data?.description',
        boardId: location?.state?.item?.id
      };
      const res = await addNewWorkFlowToBoard(postData);
      if (res?.data?.code === 1) {
        handleWorkFlows();
        dispatch(handleGetBoards(getIdProject));
        setShowWorkFlow(false);
        dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
      } else {
        dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
      }
    }
  });

  useEffect(() => {
    console.log(showWorkFlow);
  }, [showWorkFlow]);

  return (
    <>
      <Modal className="p-0" size="lg" show={showWorkFlow} onHide={() => setShowWorkFlow(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-warning text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ایجاد ستون
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <div className="d-flex gap-4">
                <Input
                  errors={errors}
                  validation={{
                    required: 'لطفا نام برد را وارد کنید',
                    minLength: {
                      message: 'نام کاربری باید بیشتر از 2 حرف باشد',
                      value: 2
                    }
                  }}
                  maxLength={30}
                  xl={6}
                  label="نام ستون:"
                  name="name"
                  control={control}
                />
                <div className="d-flex w-100 align-items-end">
                  <ColorPicker color={color} setColor={setColor} />
                </div>
              </div>
              {/* <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Form.Label className="mt-4 d-flex ">توضیحات:</Form.Label>
                      <Form.Control {...field} name="description" as="textarea" rows={3} />
                    </>
                  )}
                /> */}
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="outline-danger" title="لغو" onClick={() => setShowWorkFlow(false)} />
          <Btn
            variant="outline-warning"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateWorkFlow(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateWorkFlow;
