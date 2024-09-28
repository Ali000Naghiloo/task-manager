import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  ProgressBar,
  Row,
  Tooltip
} from 'react-bootstrap';
import CreateTasks from '../tasks/CreateTasks';
import { useDispatch, useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import {
  serCreateBoardGet,
  serDeleteBoard,
  serEditBoard,
  serGetBoards
} from '../../services/masterServices';
import CreateBoardModal from '../create-note/CreateBoardModal';
import EditBoardModal from './EditBoardModal';
import StringHelpers from '../../helpers/StringHelpers';
import {
  RsetAllUsers,
  RsetDeleteModal,
  RsetShowLoading,
  RsetShowToast
} from '../../hooks/slices/main';
import Board from './Board';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  RsetFieldsEditProject,
  RsetItsBoard,
  handleGetBoards
} from '../../hooks/slices/boardSlice';
import MainTitle from '../../components/MainTitle';
import { useWindowSize } from '@uidotdev/usehooks';

const AllBoard = () => {
  const { board, main } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getIdProject = location?.pathname?.split(':')?.[1];
  const [itemBoard, setItemBoard] = useState({});
  const [deleteBoard, setDeleteBoard] = useState({});
  const [isEditField, setIsEditField] = useState(false);
  const [editFiledsBoard, setEditFiledsBoard] = useState({});
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  const size = useWindowSize();

  const handleRedirectBoard = (item, index) => {
    console.log(item, index);
    dispatch(RsetItsBoard(item));
    navigate(`/users/board/:${getIdProject}`, {
      state: { item, index }
    });
  };

  const handleCreateBoard = asyncWrapper(async () => {
    setShowCreateBoardModal(true);
    dispatch(RsetShowLoading({ value: true }));
    const response = await serCreateBoardGet(getIdProject).catch(() => {});
    console.log(response);
    dispatch(RsetShowLoading({ value: false }));
    if (response?.data?.code === 1) {
      console.log(response?.data);
      setIsEditField(false);
      setEditFiledsBoard(response?.data?.data);
      const fixUserCombo = StringHelpers.convertComboBox(
        response?.data?.data?.projectAssignedUsersViewModel
      );
      dispatch(
        RsetAllUsers({
          ...main?.allUsers,
          allUserAssignedBoard: fixUserCombo
        })
      );
      setShowCreateBoardModal(true);
    }
  });

  const handleShowEditBoard = asyncWrapper(async (data, index) => {
    RsetShowLoading({ value: true });
    const responseEditBoard = await serEditBoard(data?.id);
    console.log(responseEditBoard);
    RsetShowLoading({ value: false });
    if (responseEditBoard?.data?.code === 1) {
      setIsEditField(true);
      setEditFiledsBoard(responseEditBoard?.data?.data);
    }
    console.log(console.log(data, index));
    setItemBoard(data);
    setShowCreateBoardModal(true);
  });

  const handleDeleteBoardAnswerYes = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const res = await serDeleteBoard(deleteBoard?.id);
    console.log(res);
    dispatch(RsetShowLoading({ value: false }));
    if (res?.data?.code === 1) {
      dispatch(handleGetBoards(getIdProject));
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  const handleDeleteBoard = (boardItem) => {
    setDeleteBoard(boardItem);
    console.log(boardItem);
    dispatch(RsetDeleteModal({ value: true, name: 'DELETE_BOARD' }));
  };

  const fixStyleUserProjecs = (item) => {
    // const familyName = item?.fullName?.split(' ')[1].substring(0, 1);
    const familyName = item?.fullName?.split(' ')[1];
    const name = item?.fullName?.split(' ')[0];
    const profile = item?.imagePath;
    const renderTooltip = (props) => (
      <Tooltip {...props} id="button-tooltip bg-dark-subtle">
        {`${name} ${familyName}`}
      </Tooltip>
    );

    return (
      <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
        {profile && profile !== 'https://www.auto.fanwebco.com/upload/userimage/' ? (
          <img className="w-30px h-30px rounded-pill border" src={profile} />
        ) : (
          <div className="w-30px h-30px rounded-pill border d-flex justify-content-center align-items-center bg-primary-subtle">
            <span>{name[0]}</span>
            <span>{familyName[0]}</span>
          </div>
        )}
      </OverlayTrigger>
    );
  };

  const HeaderContent = () => {
    return (
      <div className="w-100 d-flex justify-content-between pe-3">
        <Button onClick={handleCreateBoard}>اضافه کردن برد جدید +</Button>

        <Form.Control placeholder="فیلتر عنوان برد..." className="me-auto w-fit-content" />
      </div>
    );
  };

  useEffect(() => {
    if (main?.deleteModal?.name === 'DELETE_BOARD') {
      if (main?.deleteModal?.answer === 'yes') {
        handleDeleteBoardAnswerYes();
      }
    }
  }, [main?.deleteModal?.answer]);

  useEffect(() => {
    // if (board.getAllBoard && board.getAllBoard.length === 1 && !main.showLoading.value) {
    //   handleRedirectBoard(board.getAllBoard[0], 0);
    // }
  }, [main.showLoading.value]);

  useEffect(() => {
    dispatch(handleGetBoards(getIdProject));
  }, []);

  return (
    <>
      <Container fluid className="w-100 m-0">
        <MainTitle
          title={`لیست برد های پروژه "${
            board?.getAllBoard?.[0]?.projectName ? board?.getAllBoard?.[0]?.projectName : ''
          }"`}
          Children={<HeaderContent />}
        />
        {/* {board?.getAllBoard?.[0]?.sprintNumber} */}
        {/* {StringHelpers.convertDateFa(board?.getAllBoard?.[0]?.createDateTime)} */}

        <div className="w-100 d-flex mx-2 p-3 row gap-3 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {board?.getAllBoard?.map((item, index) => {
            return (
              <div
                style={
                  size && size.width < 600 ? { flexGrow: '1', width: '250px' } : { width: '250px' }
                }
                key={index}
                className="text_animate_side bg-white shadow-sm rounded-3 border d-flex flex-column mb-3 gap-2 py-3 cursorPointer"
                md="12"
                lg="12"
                xl="12"
                xxl="12">
                <div className="d-flex justify-content-end w-100 px-3">
                  <span
                    className="d-flex justify-content-end mw-40 gap-1"
                    style={{ opacity: '90%' }}>
                    <Button
                      variant={'danger'}
                      className="p-1"
                      onClick={() => handleDeleteBoard(item, item?.name, index)}>
                      <i className="cursorPointer font15 text-secondary bi bi-trash text-white d-flex h-fit-content" />
                    </Button>

                    <Button
                      variant={'info'}
                      className="p-1"
                      onClick={() => handleShowEditBoard(item, index)}>
                      <i className="cursorPointer font15 text-secondary bi bi-gear text-white d-flex h-fit-content" />
                    </Button>
                  </span>
                </div>

                <div
                  className="d-flex flex-column gap-2"
                  onClick={() => handleRedirectBoard(item, index)}>
                  <div className="d-flex w-100 flex-column justify-content-center align-items-center gap-2">
                    <div
                      style={{ color: item?.color || 'black' }}
                      className="w-60px h-60px rounded-pill bg-dark-subtle d-flex align-items-center justify-content-center">
                      <span className="fw-bold fs-5">{item?.name[0]}</span>
                      <span className="fw-bold fs-5">{item?.name[item.name.length - 1]}</span>
                    </div>
                    <p className="font20 fw-bold" style={{ color: item?.color || 'black' }}>
                      {item?.name}
                    </p>
                  </div>

                  <div className="w-100 px-3">
                    <div className="d-flex w-100 gap-1 flex-wrap overflow-auto scroll_Master h-60px maxH-100 mixH-100">
                      {item?.boardUsersViewModel?.map((item, index) => (
                        <div key={index} className="w-fit-content me-2 mb-2">
                          {fixStyleUserProjecs(item)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="eng_Num m-auto px-3 w-100">
                    <span>وضعیت پیشرفت برد :</span>

                    <ProgressBar
                      className="eng_Num bg-light"
                      style={{ transform: 'scale(-1, 1)' }}
                      variant="success"
                      label={
                        <span style={{ transform: 'scale(-1, 1)' }} className="font12">
                          {item?.projectProgressBar ? `${item?.projectProgressBar}%` : '60%'}
                        </span>
                      }
                      now={item?.projectProgressBar ? item.projectProgressBar : 60}
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
            );
          })}

          <div
            className="d-flex align-items-center justify-content-center border rounded-2 bg-white text_animate_side cursorPointer"
            style={{ width: '250px', height: '390px' }}
            onClick={handleCreateBoard}>
            <div className="h-100 flex flex-col justify-content-center align-items-center d-flex flex-column gap-2 py-3">
              <i className="cursorPointer d-flex align-items-center mx-1 font70 text-secondary bi bi-plus-circle" />
              <span className="text-bold font18">برد جدید</span>
            </div>
          </div>
        </div>
      </Container>
      {/* {showCreateIssuesModal && (
        <CreateTasks
          showCreateIssuesModal={showCreateIssuesModal}
          setShowCreateIssuesModal={setShowCreateIssuesModal}
        />
      )} */}
      {showCreateBoardModal && (
        <CreateBoardModal
          isEditField={isEditField}
          setEditFiledsBoard={setEditFiledsBoard}
          editFiledsBoard={editFiledsBoard}
          handleGetBoards={handleGetBoards}
          itemBoard={itemBoard}
          showCreateBoardModal={showCreateBoardModal}
          setShowCreateBoardModal={setShowCreateBoardModal}
        />
      )}
    </>
  );
};

export default AllBoard;
