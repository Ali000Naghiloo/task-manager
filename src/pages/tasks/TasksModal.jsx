import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row, Col } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import asyncWrapper from '../../utils/asyncWrapper';
import { serComments, serCreateComment, serGetSubTasks } from '../../services/masterServices';
import SubTasks from '../subTasks';
import Comment from '../Comment/index';
import Input from '../../components/Input';
import { RsetShowLoading } from '../../hooks/slices/main';
import DropDown from '../../components/DropDown';
import ComboBox from '../../components/ComboBox';
import { useLocation } from 'react-router-dom';
import FileAttachment from '../../components/FileAttachment';

const TasksModal = ({
  setAllSubTask,
  handleShowSubTaskToTask,
  handleAllTasks,
  setShowTasksModal,
  showTasksModal,
  taskItem,
  allSubTask
}) => {
  const location = useLocation();
  const [allCommets, setAllCommets] = useState({});
  const dispatch = useDispatch();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });

  const fixUsers = location?.state?.item?.boardUsersViewModel?.map((user) => {
    return {
      id: user?.userId,
      title: user?.fullName
    };
  });

  const handleGetComments = asyncWrapper(async () => {
    const res = await serComments(taskItem?.id);
    if (res?.data?.code === 1) {
      setAllCommets(res?.data?.data);
      // [...prev, ...res.data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  });

  const handleCreateComment = asyncWrapper(async (data) => {
    const fixMentionUsers = data?.commentMentionUsersViewModels?.map((item) => item.id);
    const postData = {
      text: data?.createComment,
      parentId: taskItem?.id,
      // taskJiraId: taskItem?.id || null,
      // subTaskId: '' || null,
      commentMentionUsersViewModels: fixMentionUsers || [],
      attachmentCreateViewModels: []
    };
    dispatch(RsetShowLoading({ value: true, btnName: 'sendCommented' }));
    await serCreateComment(postData);
    setValue('createComment', '');
    setValue('commentMentionUsersViewModels', []);
    dispatch(RsetShowLoading({ value: false }));
    return handleGetComments();
  });

  const handleHideModal = () => {
    setValue('createComment', '');
    setValue('commentMentionUsersViewModels', []);
    setShowTasksModal(false);
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  return (
    <>
      <Modal className="p-0" size="xl" show={showTasksModal} onHide={handleHideModal}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-warning text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            وظیفه
          </span>
        </Modal.Header>
        <Modal.Body className="">
          <SubTasks
            handleAllTasks={handleAllTasks}
            setAllSubTask={setAllSubTask}
            handleShowSubTaskToTask={handleShowSubTaskToTask}
            handleGetComments={handleGetComments}
            allSubTask={allSubTask}
            taskItem={taskItem}
          />
          <div className="border mt-4 py-2 bg-light shadow-sm rounded">
            <Col
              className="d-flex shadow-sm bg-white align-items-center justify-content-center my-2 rounded-start-pill"
              xxl={2}
              xl={4}
              md={6}
              xs={12}>
              <h5 className="d-flex align-items-center mt-2 py-2 text-DarkPrimary">ایجاد گزارش</h5>
            </Col>
            <Form className="rounded bg-white m-3 ">
              <Row className=" align-items-center px-3">
                <Input
                  errors={errors}
                  validation={{
                    required: 'لطفا متن گزارش را وارد کنید',
                    minLength: {
                      message: 'متن گزارش باید بیشتر از 2 حرف باشد',
                      value: 2
                    }
                  }}
                  placeholder="متن گزارش"
                  xs={2}
                  xl={6}
                  className="mt-4"
                  control={control}
                  name="createComment"
                />
                <ComboBox
                  isMulti
                  // validation={{
                  //   required: 'لطفا متن گزارش را وارد کنید',
                  //   minLength: {
                  //     message: 'متن گزارش باید بیشتر از 2 حرف باشد',
                  //     value: 2
                  //   }
                  // }}
                  // errors={errors}
                  options={fixUsers}
                  control={control}
                  placeHolder="منشن"
                  name="commentMentionUsersViewModels"
                  className=""
                  xl={4}
                  xxl={1}
                />
                <Btn
                  loadingName="sendCommented"
                  className="mt-4"
                  icon={<i className="d-flex align-items-end bi me-1 bi-send" />}
                  variant="outline-warning"
                  title="ارسال"
                  onClick={handleSubmit((data) => handleCreateComment(data))}
                />
              </Row>
              <Comment
                handleShowSubTaskToTask={handleShowSubTaskToTask}
                handleGetComments={handleGetComments}
                fixUsers={fixUsers}
                control={control}
                allCommets={allCommets}
                setAllCommets={setAllCommets}
                taskItem={taskItem}
              />
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="outline-warning" title="بستن" onClick={handleHideModal} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TasksModal;
