import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {
  serDeleteTask,
  serDeleteWorkFlow,
  serGetBoards,
  serGetEditTask,
  serGetSubTasks,
  serGetWorkFlow,
  serGetWorkFlows,
  serSwitchTaskInCols,
  serTasks,
  serWorkFlows
} from '../../../services/masterServices';
import asyncWrapper from '../../../utils/asyncWrapper';
import AllTasks from '../../tasks/MyTasks';
import { useDispatch, useSelector } from 'react-redux';
import { RsetDeleteModal, RsetShowLoading, RsetShowToast } from '../../../hooks/slices/main';
import TasksModal from '../../tasks/TasksModal';
import CreateTasks from '../../tasks/CreateTasks';
import CreateWorkFlow from '../../WorkFlow/index';
import DeleteModal from '../../../common/DeleteModal';
import { RsetItsBoard, handleGetBoards } from '../../../hooks/slices/boardSlice';
import DropDown from '../../../components/DropDown';
import StringHelpers from '../../../helpers/StringHelpers';
import SwitchCase from '../../../components/SwitchCase';
import { useForm } from 'react-hook-form';
import Btn from '../../../components/Btn';
import { DndContext, closestCenter } from '@dnd-kit/core';
import BoardCol from './board/BoardCol';
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';

export default function Boards() {
  const { main, board } = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tasksList, setTasksList] = useState([]);
  const [showWorkFlow, setShowWorkFlow] = useState(false);
  const [workFlowItem, setWorkFlowItem] = useState({});
  const [workflowEditItem, setWorkflowEditItem] = useState({});
  const [workFlowItemDelete, setWorkFlowItemDelete] = useState({});

  const [allWorkFlow, setAllWorkFlow] = useState([]);

  const handleCreateWorkFlow = () => {
    setShowWorkFlow(true);
  };

  const handleDeleteTaskAnswerYes = asyncWrapper(async () => {
    const res = await serDeleteTask(taskItemDelete?.id);
    if (res?.data?.code === 1) {
      handleWorkFlows();
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      handleWorkFlows();
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  const handleWorkFlows = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const resWorkFlows = await serGetWorkFlows(location?.state?.item?.id);
    console.log(resWorkFlows);
    dispatch(RsetShowLoading({ value: false }));
    if (resWorkFlows?.data?.code === 1) {
      setAllWorkFlow(resWorkFlows?.data?.data);
    }
  });

  const handleDeleteWorkFlowAnswerYes = asyncWrapper(async () => {
    const res = await serDeleteWorkFlow(workFlowItemDelete?.id);
    if (res?.data?.code === 1) {
      handleWorkFlows();
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
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

  const handleOnDragEnd = (event) => {
    const body = {
      taskId: event?.active?.id,
      newWorkFlowId: event?.over?.id
    };

    if (event?.over?.id && event?.over?.id !== event?.active?.data?.current?.taskData?.workFlow) {
      dispatch(RsetShowLoading({ value: false }));
      handleDragtask(body);
    }
  };

  const handleDragtask = async (body) => {
    await serSwitchTaskInCols(body)
      .then((res) => {
        console.log(res.data);
        handleAllTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSortCol = (event) => {
    console.log(event);
  };

  useEffect(() => {
    console.log(main?.deleteModal, 'dddd');
    if (main?.deleteModal?.name == 'DELETE_TASK')
      if (main?.deleteModal?.answer == 'yes') {
        handleDeleteTaskAnswerYes();
      }
    if (main?.deleteModal?.name == 'DELETE_WorkFlow') {
      if (main?.deleteModal?.answer == 'yes') {
        handleDeleteWorkFlowAnswerYes();
      }
    }
  }, [main?.deleteModal]);

  useEffect(() => {
    handleAllTasks();
    handleWorkFlows();
  }, []);

  return (
    <>
      <Container fluid className="count_WorkFlow d-flex gap-3 py-2 min_Height_100_board">
        {/* <div className="position-absolute top-0 end-0 w-100 h-30px"></div> */}
        <DndContext onDragEnd={handleOnDragEnd} collisionDetection={closestCenter}>
          {/* <DndContext collisionDetection={closestCenter} onDragEnd={handleSortCol}> */}
          {allWorkFlow?.map((wf, wfIndex) => {
            return (
              <>
                {/* <SortableContext
              key={Math.random() * wfIndex}
              items={tasksList?.filter((task) => task?.workFlow === wf?.id)}
              strategy={verticalListSortingStrategy}> */}
                <BoardCol
                  wfData={wf}
                  wfIndex={wfIndex}
                  tasksList={tasksList?.filter((task) => task?.workFlow === wf?.id)}
                  setTaskList={setTasksList}
                  setWorkFlowItemDelete={setWorkFlowItemDelete}
                  handleWorkFlows={handleWorkFlows}
                  handleAllTasks={handleAllTasks}
                />
                {/* </SortableContext> */}
              </>
            );
          })}
          {/* </DndContext> */}
        </DndContext>

        <div className="tasks_col d-flex align-items-start justify-content-center">
          <span
            onClick={handleCreateWorkFlow}
            className="w-100 cursorPointer bg-primary text-white rounded d-flex justify-content-center align-items-center">
            ایجاد ستون
            <i className="d-flex align-items-center py-1 mx-1 font20 fw-bold bi bi-plus-circle" />
          </span>
        </div>
      </Container>

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
