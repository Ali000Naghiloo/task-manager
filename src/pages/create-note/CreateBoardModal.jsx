import React, { useEffect, useState } from 'react';
import { Container, Form, Modal, Row } from 'react-bootstrap';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import Btn from '../../components/Btn';
import { RsetShowCreateModal, handleGetBoards } from '../../hooks/slices/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import {
  serCreateBoardGet,
  serCreateBoardPost,
  serGetBoards,
  serGetProjectUsers,
  serPutEditBoard,
  serWorkFlows
} from '../../services/masterServices';
import StringHelpers from '../../helpers/StringHelpers';
import { useLocation } from 'react-router-dom';
import { RsetShowLoading, RsetShowToast } from '../../hooks/slices/main';
import ColorPicker from '../../components/ColorPicker';

const CreateBoardModal = ({
  showCreateBoardModal,
  isEditField,
  editFiledsBoard,
  setShowCreateBoardModal,
  itemBoard
}) => {
  const { board, main } = useSelector((state) => state);
  const [allWorkFlow, setAllWorkFlow] = useState([]);
  const [color, setColor] = useState('');

  const location = useLocation();
  const dispatch = useDispatch();
  const {
    reset,
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });
  const getIdProject = location?.pathname?.split(':')?.[1];
  const fixAllWorkFlow =
    allWorkFlow.length !== 0
      ? allWorkFlow?.map((item) => {
          return {
            id: item?.id,
            title: item?.name
          };
        })
      : [];

  const [usersAssigned, setUsersAssigned] = useState();

  const handleGetProjectUsers = async () => {
    await serGetProjectUsers(editFiledsBoard?.projectId)
      ?.then((res) => {
        if (res.status === 200 && res.data?.code == 1) {
          setUsersAssigned(
            res.data?.data?.map((d) => {
              return { id: d?.userName, title: d?.fullName };
            })
          );
        }
      })
      .catch(() => {});
  };

  const handleCreateBoard = asyncWrapper(async (data) => {
    dispatch(RsetShowLoading({ value: true }));
    const fixUsersId = data?.usersAssigned?.map((item) => item?.id);
    const fixWorkFlowsId = data?.boardWorkFlowsId?.map((item) => item?.id);
    setShowCreateBoardModal(false);
    console.log(editFiledsBoard?.id);
    if (isEditField) {
      const postData = {
        id: itemBoard?.id,
        name: data?.boardName,
        // description: '',
        sprintNumber: editFiledsBoard?.projectType === 0 ? 0 : data?.sprintNumber,
        color: color,
        boardWorkFlowsId: fixWorkFlowsId,
        boardUsersId: fixUsersId,
        attachmentsEditViewModel: []
      };
      console.log(postData);
      const resEditBoards = await serPutEditBoard(postData);
      console.log(resEditBoards);
      dispatch(RsetShowLoading({ value: false }));
      if (resEditBoards?.data?.code === 1) {
        dispatch(RsetShowToast({ show: true, title: resEditBoards?.data?.msg, bg: 'success' }));
        dispatch(handleGetBoards(getIdProject));
      } else {
        dispatch(RsetShowToast({ show: true, title: resEditBoards?.data?.msg, bg: 'danger' }));
      }
    } else {
      const postDatePost = {
        name: data?.boardName,
        color: color,
        description: data?.description,
        projectId: getIdProject,
        boardWorkFlowsId: fixWorkFlowsId,
        boardUsersId: fixUsersId,
        attachmentsCreateViewModel: []
      };
      const resCreateBoard = await serCreateBoardPost(postDatePost);
      dispatch(RsetShowLoading({ value: false }));
      if (resCreateBoard?.data?.code === 1) {
        dispatch(handleGetBoards(getIdProject));
        // handleGetBoards();
        dispatch(RsetShowToast({ show: true, title: resCreateBoard?.data?.msg, bg: 'success' }));
      } else {
        dispatch(RsetShowToast({ show: true, title: resCreateBoard?.data?.msg, bg: 'danger' }));
      }
    }
  });

  const handleWorkFlows = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const responseWorkFlow = await serWorkFlows().catch(() => {});
    dispatch(RsetShowLoading({ value: false }));
    if (responseWorkFlow?.data?.code === 1) {
      console.log(responseWorkFlow);
      setAllWorkFlow(responseWorkFlow?.data?.data);
    } else {
      setAllWorkFlow([]);
    }
  });

  useEffect(() => {
    handleWorkFlows();
    handleGetProjectUsers();
  }, []);

  useEffect(() => {
    reset({
      ...editFiledsBoard,
      boardName: editFiledsBoard?.name,
      projectType: StringHelpers?.findCombo(
        editFiledsBoard?.projectType,
        main?.allEnums?.projectType
      ),
      sprintNumber: editFiledsBoard?.sprintNumber,
      usersAssigned: StringHelpers?.findCombo(editFiledsBoard?.usersAssigned),
      boardWorkFlowsId: StringHelpers?.findCombo(editFiledsBoard?.boardWorkFlowsId)
    });
  }, [editFiledsBoard]);

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showCreateBoardModal}
        onHide={() => setShowCreateBoardModal(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-warning text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            افزودن برد
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row className="d-flex align-items-end">
                <Input
                  errmsg="لطفا نام برد را وارد کنید"
                  errors={errors}
                  name="boardName"
                  xl={4}
                  label="نام برد:"
                  control={control}
                />
                <ComboBox
                  isDisabled
                  options={main?.allEnums?.projectType}
                  name="projectType"
                  control={control}
                  label="نوع:"
                />
              </Row>
              <Row className="mt-4">
                {/* <SwitchCase
                  disabled={editFiledsBoard?.projectType === 0 ? true : false}
                  min={0}
                  max={editFiledsBoard?.sprintNumber}
                  control={control}
                  name="sprintNumber"
                  range={0}
                  label={`سرعت پروژه:${watch('sprintNumber') || editFiledsBoard?.projectType}`}
                /> */}
              </Row>
              <Row className="mt-4">
                <ComboBox
                  isMulti
                  name="usersAssigned"
                  options={usersAssigned}
                  xl={6}
                  control={control}
                  label="اختصاص به:"
                />
                <ComboBox
                  isMulti
                  name="boardWorkFlowsId"
                  options={fixAllWorkFlow}
                  xl={6}
                  control={control}
                  label="ستون ها:"
                />
                <ColorPicker color={color} setColor={setColor} />
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn
            variant="outline-warning"
            title="لغو"
            onClick={() => setShowCreateBoardModal(false)}
          />
          <Btn
            variant="outline-primary"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateBoard(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateBoardModal;
