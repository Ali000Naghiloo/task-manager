import { DndContext, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import { serGetWorkFlow } from '../../../../services/masterServices';
import asyncWrapper from '../../../../utils/asyncWrapper';
import { RsetDeleteModal } from '../../../../hooks/slices/main';
import { useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import BoardTask from './BoardTask';
import CreateTasks from '../../../tasks/CreateTasks';
import CreateWorkFlow from '../../../WorkFlow';
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function BoardCol({
  wfData,
  wfIndex,
  tasksList,
  setTaskList,
  handleWorkFlows,
  setWorkFlowItemDelete,
  handleAllTasks
}) {
  const dispatch = useDispatch();
  const [showWorkFlow, setShowWorkFlow] = useState(false);
  const [workFlowItem, setWorkFlowItem] = useState({});
  const [workflowEditItem, setWorkflowEditItem] = useState({});
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [getEditTasks, setGetEditTasks] = useState({});

  //handle drop tasks place
  const droppable = useDroppable({
    id: wfData?.id
  });
  const dropStyle = {
    backgroundColor: droppable.isOver ? 'rgba(0,0,50,0.5)' : undefined,
    overflow: droppable.isOver ? 'visible' : '',
    zIndex: droppable.isOver ? '0' : ''
  };

  //handle sort col
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: `sortable${wfData?.id}`
    });
  const sortStyle = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleEditWorkFlow = asyncWrapper(async (wfData) => {
    setShowWorkFlow(true);
    const res = await serGetWorkFlow(wfData?.id);
    setWorkflowEditItem(res?.data?.data);
  });

  const handleDeleteWorkFlow = (workFlow) => {
    console.log(workFlow);
    setWorkFlowItemDelete(workFlow);
    dispatch(RsetDeleteModal({ value: true, name: 'DELETE_WorkFlow' }));
  };
  const handleCreateIssue = (wfData) => {
    setWorkFlowItem(wfData);
    setGetEditTasks({});
    setShowCreateIssuesModal(true);
  };

  return (
    <>
      <div
        style={sortStyle}
        ref={setNodeRef}
        className="tasks_col no_scroll scroll_Master overflow-y-scroll rounded-1 justify-content-center overflow-visible">
        <div
          // {...listeners}
          // {...attributes}
          ref={setActivatorNodeRef}
          style={{ backgroundColor: wfData?.color || 'blue', cursor: 'grab' }}
          xxl="12"
          className="w-100 d-flex rounded-2 align-items-center justify-content-between text-white px-2 py-1">
          <span>{wfData?.name}</span>
          <div className="d-flex gap-2">
            <i
              onClick={() => {
                handleEditWorkFlow(wfData);
              }}
              className="cursorPointer bi bi-sliders d-flex align-items-center"
            />
            <i
              onClick={() => handleDeleteWorkFlow(wfData)}
              className="cursorPointer bi bi-trash d-flex align-items-center"
            />
          </div>
        </div>

        <div
          onClick={() => handleCreateIssue(wfData)}
          className="w-100 bg-white rounded-2 d-flex py-1 justify-content-center cursorPointer align-items-center my-2 border-bottom">
          <i className="d-flex align-items-center mx-1 bi bi-plus-circle" />
          <span>ایجاد وظیفه</span>
        </div>

        <div
          style={dropStyle}
          ref={droppable.setNodeRef}
          className="d-flex flex-column py-2 rounded">
          {tasksList.map((task, index) => {
            return <BoardTask task={task} taskIndex={task?.id} key={Math.random() * 100 * index} />;
          })}
        </div>
      </div>

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
