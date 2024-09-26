import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Button,
  Tooltip,
  OverlayTrigger,
  Form
} from 'react-bootstrap';
import {
  serDeleteProjects,
  serViceEditProject,
  serviceProjects
} from '../../services/masterServices';
import EditProjectModal from './EditProjectModal';
import { RsetDeleteModal, RsetShowLoading, RsetShowToast } from '../../hooks/slices/main';
import { useDispatch, useSelector } from 'react-redux';
import {
  RsetFieldsEditProject,
  RsetGetAllBoard,
  handleGetBoards
} from '../../hooks/slices/boardSlice';
import CreateProjectModal from '../create-note/CreateProjectModal';
import asyncWrapper from '../../utils/asyncWrapper';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../../components/MainTitle';
import Btn from '../../components/Btn';
import { useWindowSize } from '@uidotdev/usehooks';

const ShowProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { board, main } = useSelector((state) => state);
  const [allProjectList, setAllProjectList] = useState([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [editService, setEditService] = useState(false);
  const [itemAndIndexProject, setItemAndIndexProject] = useState({});
  const [deleteItem, setDeleteItem] = useState({});
  const [editProjectFields, setEditProjectFields] = useState({});
  const [sprintNum, setSprintNum] = useState(1);

  const size = useWindowSize();

  const handleGetProjects = async () => {
    try {
      dispatch(RsetShowLoading({ value: true }));
      const res = await serviceProjects();
      dispatch(RsetShowLoading({ value: false }));
      if (res?.data?.code === 1) {
        setAllProjectList(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProjects();
  }, []);

  const handleNavigateToBoard = asyncWrapper(async (item) => {
    dispatch(RsetFieldsEditProject({ ...board?.fieldsEditProject, projectId: item.id }));
    // clear recent boards list
    dispatch(RsetGetAllBoard(null));

    navigate(`/users/allBoardForm/:${item?.id}`);
  });

  const handleEditProject = asyncWrapper(async (item, index) => {
    dispatch(RsetShowLoading({ value: true }));
    setEditService(true);
    const res = await serViceEditProject(item?.id);
    dispatch(RsetShowLoading({ value: false }));
    if (res?.data?.code === 1) {
      setEditProjectFields(res?.data?.data);
      setItemAndIndexProject({ item, index });
      setShowCreateProjectModal(true);
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  const handleCreateProject = () => {
    setSprintNum(1);
    setEditProjectFields({});
    setEditService(false);
    setShowCreateProjectModal(true);
  };

  const fixStyleUserProjecs = (item) => {
    // const familyName = item?.fullName?.split(' ')[1].substring(0, 1);
    const familyName = item?.fullName?.split(' ')[1];
    const name = item?.fullName?.split(' ')[0];
    const profile = item?.imagePath;
    const renderTooltip = (props) => (
      <Tooltip {...props} id="button-tooltip bg-dark-subtle">
        {`${item?.fullName}`}
      </Tooltip>
    );

    return (
      <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
        {profile && profile !== 'https://www.auto.fanwebco.com/upload/userimage/' ? (
          <img className="w-30px h-30px rounded-pill border" src={profile} alt={item?.fullName} />
        ) : (
          <div className="w-30px h-30px rounded-pill border d-flex justify-content-center align-items-center bg-primary-subtle">
            <span>{name[0]}</span>
            <span>{familyName[0]}</span>
          </div>
        )}
      </OverlayTrigger>
    );
  };

  const handleDeleteProjrctAnswerYes = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const res = await serDeleteProjects(deleteItem?.id);
    dispatch(RsetShowLoading({ value: false }));
    if (res?.data?.code === 1) {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
      handleGetProjects();
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  const HeaderContent = () => {
    if (size && size.width > 700)
      return (
        <div className="w-100 d-flex justify-content-between pe-3">
          <Button onClick={handleCreateProject}>اضافه کردن پروژه جدید +</Button>

          <Form.Control placeholder="فیلتر عنوان پروژه" className="me-auto w-fit-content" />
        </div>
      );
  };

  useEffect(() => {
    if (main?.deleteModal?.name === 'DELETE_PROJECT') {
      if (main?.deleteModal?.answer === 'yes') {
        handleDeleteProjrctAnswerYes();
      }
    }
  }, [main?.deleteModal?.answer]);

  const handleDeleteProject = (prj, title) => {
    setDeleteItem(prj);
    dispatch(RsetDeleteModal({ value: true, name: 'DELETE_PROJECT', title: title }));
  };

  return (
    <>
      <div className="pt-2 px-2 h-100 overflow-auto">
        <MainTitle title="لیست پروژه‌ها" Children={<HeaderContent />} />

        <div className="w-100 h-auto d-flex flex-wrap justify-content-start gap-4 p-2">
          {allProjectList?.map((item, index) => (
            <div
              key={Math.random() * 100 * index}
              style={
                size && size.width < 600 ? { flexGrow: '1', width: '250px' } : { width: '250px' }
              }
              className="text_animate_side cursorPointer shadow-sm rounded-3 border d-flex flex-column gap-2 py-3 mb-4  bg-white">
              <div className="d-flex justify-content-end w-100 px-3">
                <span className="d-flex justify-content-end mw-40 gap-1" style={{ opacity: '90%' }}>
                  <Button
                    variant={'danger'}
                    className="p-1  h-fit-content"
                    onClick={() => handleDeleteProject(item, item?.name, index)}>
                    <i className="cursorPointer font15 text-secondary bi bi-trash text-white d-flex h-fit-content" />
                  </Button>

                  <Button
                    variant={'info'}
                    className="p-1 h-fit-content"
                    onClick={() => handleEditProject(item, index)}>
                    <i className="cursorPointer font15 text-secondary bi bi-gear text-white d-flex h-fit-content" />
                  </Button>
                </span>
              </div>

              <div className="d-flex flex-column gap-2" onClick={() => handleNavigateToBoard(item)}>
                <div className="d-flex w-100 flex-column justify-content-center align-items-center gap-2">
                  <div className="w-60px h-60px rounded-pill bg-dark-subtle d-flex align-items-center justify-content-center">
                    <span className="fw-bold fs-5">{item?.name[0]}</span>
                    <span className="fw-bold fs-5">{item?.name[item.name.length - 1]}</span>
                  </div>
                  <p className="font20 fw-bold" style={{ color: item?.color || 'black' }}>
                    {item?.name}
                  </p>
                </div>

                <div className="w-100 px-3">
                  <div className="d-flex w-100 gap-1 flex-wrap overflow-auto scroll_Master h-60px maxH-100 mixH-100">
                    {item?.projectAssignedUsersViewModel?.map((item, index) => (
                      <div key={index} className="w-fit-content me-2 mb-2">
                        {fixStyleUserProjecs(item)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="eng_Num m-auto px-3 w-100">
                  <span>وضعیت پروژه :</span>

                  <ProgressBar
                    className="eng_Num bg-light"
                    style={{ transform: 'scale(-1, 1)' }}
                    variant="success"
                    label={
                      <span
                        style={{ transform: 'scale(-1, 1)' }}
                        className="font12">{`${item?.projectProgressBar}%`}</span>
                    }
                    now={item?.projectProgressBar}
                  />
                </div>

                <hr />

                <div className="d-flex flex-column gap-2 px-3">
                  <div>
                    <span className="text-dark-emphasis fw-bold">آخرین وظیفه انجام شده:</span>{' '}
                    <span className="text-success">-</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span className="rounded-1 bg-dark-subtle px-2 text-white">2</span>

                    <div>
                      <span>وظایف انجام شده:</span>
                      <span>0 از 0</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className=" ">تاریخ ایجاد پروژه: {item?.createDateTime} </div>
                    <div className=" ">توضیحات: {item?.description} </div>
                    <div className=" ">تاریخ شروع: {item?.dueDateTime} </div>
                    <div className=" ">تاریخ پایان: {item?.endDateTime} </div>
                    <div className=" ">سازنده: {item?.projectCreatorFullName} </div>
                    <div className=" ">اولویت پروژه:{item?.projectPriority} </div>
                    <div className=" ">وضعیت پروژه:{item?.projectStatus} </div>
                    <div className=" ">نوع پروژه:{item?.projectType} </div>
                    <div className=" ">سرعت پروژه:{item?.sprintNumber} </div> */}
            </div>
          ))}

          <div
            className="d-flex align-items-center justify-content-center border rounded-2 bg-white text_animate_side cursorPointer"
            style={{ width: '250px', height: '390px' }}
            onClick={handleCreateProject}>
            <div className="h-100 flex flex-col justify-content-center align-items-center d-flex flex-column gap-2 py-3">
              <i className="cursorPointer d-flex align-items-center mx-1 font70 text-secondary bi bi-plus-circle" />
              <span className="text-bold font18">پروژه جدید</span>
            </div>
          </div>
        </div>
      </div>

      {showCreateProjectModal && (
        <CreateProjectModal
          sprintNum={sprintNum}
          setSprintNum={setSprintNum}
          editService={editService}
          editProjectFields={editProjectFields}
          handleGetProjects={handleGetProjects}
          showCreateProjectModal={showCreateProjectModal}
          setShowCreateProjectModal={setShowCreateProjectModal}
          itemAndIndexProject={itemAndIndexProject}
        />
      )}
    </>
  );
};

export default ShowProjects;
