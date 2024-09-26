import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import asyncWrapper from '../../../utils/asyncWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { serGetSubTasks, serTasks } from '../../../services/masterServices';
import { RsetShowLoading } from '../../../hooks/slices/main';
import Loading from '../../../components/Loading';
import TasksModal from '../../tasks/TasksModal';
import DropDown from '../../../components/DropDown';
import { Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

export default function Tasks() {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 900px)' });
  const location = useLocation();
  const dispatch = useDispatch();
  const [tasksList, setTasksList] = useState([]);
  const loading = useSelector((state) => state.main?.showLoading?.value);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [taskItem, setTaskItem] = useState({});
  const [allSubTask, setAllSubTask] = useState([]);

  // tasks list filter
  const [tasklistSortBy, setTasklistSortBy] = useState('کار های انجام نشده');

  const handleShowSubTaskToTask = asyncWrapper(async (task) => {
    const res = await serGetSubTasks(task?.id);
    console.log(res);
    if (res?.data?.code === 1) {
      setAllSubTask(res?.data?.data);
    }
    return res?.data?.data?.map((item) => item?.name);
  });

  const handleShowTask = (task) => {
    handleShowSubTaskToTask(task);
    setTaskItem(task);
    setShowTasksModal(true);
  };

  const handleGetTasks = asyncWrapper(async () => {
    const resTasks = await serTasks(location?.state?.item?.id);
    dispatch(RsetShowLoading({ value: false }));
    if (resTasks?.data?.code === 1) {
      setTasksList(resTasks?.data?.data);
    } else {
      setTasksList(null);
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

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <>
      <div className="min_Height_100_board py-3 px-2">
        <div className="d-flex justify-content-between align-items-center my-3 px-4">
          {/* showing list by */}
          <div className="d-flex align-items-center gap-2 text-dark-emphasis">
            نمایش :
            <div className="d-flex align-items-center gap-1 border-bottom p-2 w-fit-content">
              <span className="font20" style={{ whiteSpace: 'nowrap' }}>
                {tasklistSortBy}
              </span>
              <DropDown />
            </div>
          </div>

          {/* actions */}
          {!isSmallScreen && (
            <div className="d-flex gap-2 text-dark-emphasis">
              <div className="d-flex align-items-center cursorPointer rounded-1 hover-element p-1 h-30px">
                <i class="bi bi-filter"></i>
                <span>فیلتر</span>
              </div>

              <div className="d-flex align-items-center cursorPointer rounded-1 hover-element p-1 h-30px">
                <i class="bi bi-filter-left"></i>
                <span>مرتب سازی</span>
              </div>

              <div className="d-flex align-items-center cursorPointer rounded-1 hover-element p-1 h-30px">
                <i class="bi bi-printer-fill"></i>
              </div>
            </div>
          )}
        </div>

        <div className="w-100 d-flex flex-column align-items-center">
          {tasksList && tasksList.length !== 0
            ? tasksList.map((task, index) => (
                <div
                  className="w-75 d-flex flex-column justify-content-center align-items-center"
                  key={index * Math.random() * 100}>
                  <div
                    onClick={() => handleShowTask(task)}
                    className="w-100 d-flex justify-content-between gap-2 p-2 border rounded cursorPointer hover-element bg-white w-75">
                    <div className="d-flex gap-2">
                      <Form.Check className="pe-none" size="md" />
                      <span className="fs-5">{task.name}</span>
                    </div>

                    <div className="me-auto d-flex align-items-center gap-1 font12 border rounded p-1">
                      <i class="d-flex align-items-center bi bi-list-check"></i>
                      {4}/{10}{' '}
                    </div>

                    <div className="d-flex justify-content-center align-items-center bg-dark-subtle w-30px h-30px rounded-pill">
                      <span className="font12">ع </span>
                      <span className="font12">ج</span>
                    </div>
                  </div>
                </div>
              ))
            : null}
          {/* empty view */}
          {!loading && !tasksList && (
            <div className="w-100 mt-5 d-flex justify-content-center align-items-center">
              <span className="font20">وظیفه ای برای این بورد وجود ندارد</span>
            </div>
          )}
        </div>
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
    </>
  );
}
