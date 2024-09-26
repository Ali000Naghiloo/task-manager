import React, { useEffect, useState } from 'react';
import { Form, Modal, Row } from 'react-bootstrap';
import Input from '../../components/Input';
import ComboBox from '../../components/ComboBox';
import Btn from '../../components/Btn';
import { serEditGetSubtask, serPutEditSubTask } from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import { Controller, useForm } from 'react-hook-form';
import StringHelpers from '../../helpers/StringHelpers';
import Datepicker from '../../components/Datepicker';
import { RsetShowToast } from '../../hooks/slices/main';
import { useDispatch } from 'react-redux';

const EditSubTaskModal = ({
  handleShowSubTaskToTask,
  setShowEditSubTask,
  taskItem,
  subTask,
  showEditSubTask
}) => {
  const dispatch = useDispatch();
  const [editFieldSubTask, setEditFieldSubTask] = useState({});
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });

  const handleGetEditSubTask = asyncWrapper(async () => {
    console.log(subTask);
    const res = await serEditGetSubtask(subTask?.id);
    setEditFieldSubTask(res?.data?.data);
    console.log(res);
  });

  const handleFixEditSubTask = asyncWrapper(async (data) => {
    const postData = {
      id: subTask?.id,
      name: data?.createEditComment,
      description: 'data?.description',
      workFlow: subTask?.workFlow,
      dueDateTime: StringHelpers.convertDateEn(new Date()),
      doneStatus: true,
      doneDateTime: StringHelpers.convertDateEn(new Date()),
      remainderDateTime: StringHelpers.convertDateEn(data?.remainderDateTime),
      subTaskAssignedUsersViewModels: [''],
      subTaskVerifyUsersViewModels: [''],
      attachmentEditViewModels: []
    };
    const res = await serPutEditSubTask(postData);
    if (res?.data?.code === 1) {
      handleShowSubTaskToTask(taskItem);
      setShowEditSubTask(false);
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  useEffect(() => {
    handleGetEditSubTask();
  }, []);

  useEffect(() => {
    reset({ ...editFieldSubTask });
  }, [editFieldSubTask]);

  return (
    <Modal
      className="p-0"
      size="lg"
      centered
      show={showEditSubTask}
      onHide={() => setShowEditSubTask(false)}>
      <Modal.Header
        style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
        className="d-flex bg-warning text-white  justify-content-center"
        closeButton>
        <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
          ایجاد وظیفه فرعی
        </span>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="align-items-end px-2">
            <Input
              label="ایجاد متن گزارش:"
              placeholder=""
              xs={2}
              xl={6}
              className="my-2"
              control={control}
              name="createEditComment"
            />
            <ComboBox
              isMulti
              // options={fixUsers}
              control={control}
              placeHolder="منشن"
              name="commentMentionUsersViewModels"
              className=""
              xl={6}
              xxl={12}
            />
            <Datepicker name="remainderDateTime" label="تاریخ مهلت:" control={control} />
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
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Btn
          variant="outline-warning"
          title="تایید"
          onClick={handleSubmit((data) => handleFixEditSubTask(data))}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default EditSubTaskModal;
