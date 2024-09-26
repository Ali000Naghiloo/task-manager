import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import asyncWrapper from '../../../../utils/asyncWrapper';
import { Button, Col, Form, Row } from 'react-bootstrap';
import SwitchCase from '../../../../components/SwitchCase';
import StringHelpers from '../../../../helpers/StringHelpers';
import {
  serGetEditTask,
  serGetSubTasks,
  serGetWorkFlows,
  serTasks
} from '../../../../services/masterServices';
import CreateWorkFlow from '../../../WorkFlow';
import CreateTasks from '../../../tasks/CreateTasks';
import { useDispatch, useSelector } from 'react-redux';
import { RsetDeleteModal, RsetShowLoading } from '../../../../hooks/slices/main';
import { useLocation } from 'react-router-dom';
import TasksModal from '../../../tasks/TasksModal';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';

export default function ColTask({ task, taskIndex }) {
  const { control } = useForm();
  const location = useLocation();
  const dispatch = useDispatch();
  const [taskItem, setTaskItem] = useState({});
  const [taskItemDelete, setTaskItemDelete] = useState({});
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showWorkFlow, setShowWorkFlow] = useState(false);
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [workFlowItem, setWorkFlowItem] = useState({});
  const [workflowEditItem, setWorkflowEditItem] = useState({});
  const [allSubTask, setAllSubTask] = useState([]);
  const [getEditTasks, setGetEditTasks] = useState({});
  const showDeleteModal = useSelector((state) => state?.main.deleteModal?.value);

  //handle drag drop task
  const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: {
      taskData: task
    }
  });
  const style = transform
    ? {
        transition,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 100px)`,
        zIndex: '9999 !important'
      }
    : {
        zIndex: '9999 !important'
      };

  const handleShowSubTaskToTask = asyncWrapper(async (task) => {
    const res = await serGetSubTasks(task?.id);
    console.log(res);
    if (res?.data?.code === 1) {
      setAllSubTask(res?.data?.data);
    }
    return res?.data?.data?.map((item) => item?.name);
  });

  const handleShowTask = () => {
    handleShowSubTaskToTask(task);
    setTaskItem(task);
    setShowTasksModal(true);
  };

  const handleEditTask = asyncWrapper(async () => {
    const responseTask = await serGetEditTask(task?.id);
    if (responseTask?.data?.code === 1) {
      setGetEditTasks(responseTask?.data?.data);
      setShowCreateIssuesModal(true);
    }
  });

  const handleDeleteTask = () => {
    setTaskItemDelete(task);
    dispatch(RsetDeleteModal({ value: !showDeleteModal, name: 'DELETE_TASK', title: task.name }));
    setShowTasksModal(false);
  };

  const handleWorkFlows = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const resWorkFlows = await serGetWorkFlows(location?.state?.item?.id);
    console.log(resWorkFlows);
    dispatch(RsetShowLoading({ value: false }));
    if (resWorkFlows?.data?.code === 1) {
      setAllWorkFlow(resWorkFlows?.data?.data);
    }
  });

  const handleAllTasks = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const resTasks = await serTasks(location?.state?.item?.id);
    dispatch(RsetShowLoading({ value: false }));
    if (resTasks?.data?.code === 1) {
      setTasksList(resTasks?.data?.data);
    }
  });

  return (
    <>
      <div
        style={style}
        ref={setNodeRef}
        className="w-100 position-relative subTask_To_Task rounded-1 bg-white position-relative d-flex row justify-content-between my-1 py-2 px-2 m-0 cursorPointer">
        {/* handle ref */}
        <div
          {...listeners}
          {...attributes}
          onClick={handleShowTask}
          style={{ cursor: 'grab' }}
          className="d-flex justify-content-center position-absolute w-20px h-20px top-0 start-0 z-1 hover-element">
          <i class="bi bi-grip-horizontal"></i>
        </div>
        {/* handle show task modal */}
        <div
          onClick={handleShowTask}
          className="position-absolute w-100 h-100 top-0 left-0 start-0 z-0 hover-element-light"></div>

        <div className="px-0 d-flex justify-content-between align-items-center z-1">
          <span className="d-flex gap-1 w-100 text-secondary font-weight-bold font15 fw-bold">
            <Form.Check /> {task?.name}
          </span>

          <div className="d-flex my-1 gap-1 justify-content-end z-1">
            <Button
              onClick={handleDeleteTask}
              variant={'danger'}
              className="p-0 px-1 d-flex justify-content-center align-items-center h-100">
              <i className="cursorPointer pe-auto w-100 h-100 text-white bi bi-trash align-items-center" />
            </Button>

            <Button
              onClick={handleEditTask}
              variant={'info'}
              className="p-0 px-1 d-flex justify-content-center align-items-center">
              <i className="cursorPointer pe-auto w-100 h-100 border-bottom text-white bi bi-gear" />
            </Button>
          </div>

          {/* <span className="py-3 position-absolute top-0 start-0"></span> */}
        </div>

        <div className="font15 py-2" style={{ wordWrap: 'break-word' }}>
          {task.description ? task.description : null}
        </div>
        {task?.taskSubTasksViewModels.length !== 0 ? (
          <div
            style={{ maxHeight: '100px' }}
            className="border cursorPointer rounded overflow-y-scroll scroll_Master h6 z-1"
            onClick={() => handleShowTask(task)}>
            {task?.taskSubTasksViewModels?.map((subToTask, index) => (
              <Row key={index} className="">
                <Col className="d-flex text-align-right overflow-auto scroll_Master border-bottom text-secondary bg-white p-1 rtl">
                  <SwitchCase
                    name={`${subToTask?.name} ${index}`}
                    control={control}
                    checked={true}
                    className={'pe-none'}
                  />{' '}
                  <span>{StringHelpers.cutString(subToTask?.name, 20)}</span>
                </Col>
              </Row>
            ))}
          </div>
        ) : null}
      </div>

      {showTasksModal && (
        <TasksModal
          handleAllTasks={handleAllTasks}
          allSubTask={allSubTask}
          setAllSubTask={setAllSubTask}
          handleShowSubTaskToTask={handleShowSubTaskToTask}
          taskItem={taskItem}
          setShowTasksModal={setShowTasksModal}
          showTasksModal={showTasksModal}
        />
      )}

      {showCreateIssuesModal && (
        <CreateTasks
          handleAllTasks={handleAllTasks}
          setGetEditTasks={setGetEditTasks}
          getEditTasks={getEditTasks}
          handleWorkFlows={handleWorkFlows}
          workFlowItem={workFlowItem}
          showCreateIssuesModal={showCreateIssuesModal}
          setShowCreateIssuesModal={setShowCreateIssuesModal}
        />
      )}

      {workFlowItem && (
        <CreateWorkFlow
          handleAllTasks={handleAllTasks}
          setWorkflowEditItem={setWorkflowEditItem}
          workflowEditItem={workflowEditItem}
          handleWorkFlows={handleWorkFlows}
          workFlowItem={workFlowItem}
          setShowWorkFlow={setShowWorkFlow}
          showWorkFlow={showWorkFlow}
        />
      )}
    </>
  );
}
