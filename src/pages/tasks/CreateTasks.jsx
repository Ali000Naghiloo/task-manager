import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { RsetFieldsEditProject, RsetShowCreateModal } from '../../hooks/slices/boardSlice';
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
  serCreateTask,
  serPutEditTask,
  serTasks,
  serWorkFlows
} from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import { useLocation } from 'react-router-dom';
import { RsetShowToast } from '../../hooks/slices/main';

const CreateTasks = ({
  showCreateIssuesModal,
  setShowCreateIssuesModal,
  workFlowItem,
  handleAllTasks,
  handleWorkFlows,
  getEditTasks
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });

  const fixUsers = location?.state?.item?.boardUsersViewModel?.map((user) => {
    return {
      id: user?.userId,
      title: user?.fullName
    };
  });

  console.log(getEditTasks);

  const handleCreateTask = asyncWrapper(async (data) => {
    const fixTaskAssignedUser = data?.assignedUsersId?.map((item) => item?.id);
    const fixTaskVerifyUsersId = data?.verifyUsersId?.map((item) => item?.id);
    console.log(fixTaskAssignedUser, fixTaskVerifyUsersId, data);
    if (!!getEditTasks?.name) {
      const postEditData = {
        id: getEditTasks?.id,
        name: data?.name,
        description: data?.description,
        workFlow: workFlowItem?.id,
        dueDateTime: StringHelpers.convertDateEn(data?.remainderDateTime),
        remainderDateTime: StringHelpers.convertDateEn(data?.remainderDateTime),
        taskAssignedUsersViewModels: fixTaskAssignedUser,
        taskVerifyUsersViewModels: fixTaskVerifyUsersId,
        attachmentEditViewModels: []
      };
      const resPutEdit = await serPutEditTask(postEditData);
      if (resPutEdit?.data?.code === 1) {
        setShowCreateIssuesModal(false);
        handleAllTasks();
        handleWorkFlows();
        dispatch(RsetShowToast({ show: true, title: resPutEdit?.data?.msg, bg: 'success' }));
      } else {
        dispatch(RsetShowToast({ show: true, title: resPutEdit?.data?.msg, bg: 'danger' }));
      }
    } else {
      const postData = {
        name: data?.name,
        description: data?.description,
        workFlow: workFlowItem?.id,
        dueDateTime: StringHelpers.convertDateEn(data?.remainderDateTime),
        remainderDateTime: StringHelpers.convertDateEn(data?.remainderDateTime),
        attachmentStatus: false,
        boardId: location?.state?.item?.id,
        taskAssignedUsersId: fixTaskAssignedUser,
        taskVerifyUsersId: fixTaskVerifyUsersId,
        attachmentCreateViewModels: []
      };
      console.log(postData);

      const res = await serCreateTask(postData);
      if (res?.data?.code === 1) {
        setShowCreateIssuesModal(false);
        handleAllTasks();
        handleWorkFlows();
        dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
      } else {
        dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
      }
    }
  });

  useEffect(() => {
    reset({
      ...getEditTasks,
      remainderDateTime: StringHelpers?.convertDateFa(getEditTasks?.remainderDateTime)
    });
  }, [getEditTasks]);

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showCreateIssuesModal}
        onHide={() => setShowCreateIssuesModal(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-info text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ایجاد وظیفه
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Input xl={6} label="نام وظیفه :" name="name" control={control} />
                <Datepicker
                  minDate={new Date()}
                  name="remainderDateTime"
                  label="تاریخ مهلت:"
                  control={control}
                />
              </Row>
              <Row>
                <ComboBox
                  className=""
                  isMulti
                  name="assignedUsersId"
                  options={fixUsers}
                  xl={6}
                  control={control}
                  label="مسئول انجام:"
                />
                <ComboBox
                  className=""
                  isMulti
                  name="verifyUsersId"
                  options={fixUsers}
                  xl={6}
                  control={control}
                  label="مسئول تایید:"
                />
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
          <Btn
            variant="outline-warning"
            title="لغو"
            onClick={() => setShowCreateIssuesModal(false)}
          />
          <Btn
            variant="outline-info"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateTask(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTasks;
