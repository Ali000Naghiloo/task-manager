import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import StringHelpers from '../../helpers/StringHelpers';
import Input from '../../components/Input';
import Btn from '../../components/Btn';
import asyncWrapper from '../../utils/asyncWrapper';
import {
  serDeleteCommented,
  serEditCommentGet,
  serEditCommentPut
} from '../../services/masterServices';
import { useForm } from 'react-hook-form';
import ComboBox from '../../components/ComboBox';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RsetDeleteModal, RsetShowLoading, RsetShowToast } from '../../hooks/slices/main';

const Comment = ({
  allCommets,
  fixUsers,
  taskItem,
  handleGetComments,
  setAllCommets,
  handleShowSubTaskToTask
}) => {
  const [editComment, setEditComment] = useState({});
  const [commentedItemDelete, setCommentedItemDelete] = useState({});
  const dispatch = useDispatch();
  // const fixAllComment = Object.values(allCommets)?.reverse()
  const { main } = useSelector((state) => state);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });

  const handleSerEditComments = asyncWrapper(async (data, index) => {
    const res = await serEditCommentGet(data?.id);
    setEditComment(res?.data?.commentViewModel);
  });

  const handleEditComment = (data, index) => {
    console.log(data, index);

    handleSerEditComments(data, index);
    let temporaryList = [];
    allCommets?.map((itemComments, indexComments) => {
      if (indexComments === index) {
        temporaryList.push({
          ...itemComments,
          editMode: !itemComments?.editMode
        });
      } else {
        temporaryList.push({
          ...itemComments,
          editMode: false
        });
      }
    });
    setAllCommets(temporaryList);
  };

  const handleEditTextComment = asyncWrapper(async (cmt, data) => {
    console.log(cmt, data);
    const postData = {
      id: cmt?.id,
      text: data?.textCommented,
      commentMentionUsersViewModels: [''],
      attachmentCreateViewModels: []
    };
    const res = await serEditCommentPut(postData);
    if (res?.data?.code === 1) {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
      const newData = allCommets?.map((itemComments) => {
        if (cmt?.id === itemComments?.id) {
          return {
            ...itemComments,
            editMode: false
          };
        }
        return itemComments;
      });
      setAllCommets(newData);
      handleGetComments();
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  useEffect(() => {
    reset({
      ...editComment,
      commentMentionUsersViewModels: StringHelpers?.findCombo(
        editComment?.commentMentionUsersViewModels,
        main?.allEnums?.commentMentionUsersViewModels
      )
    });
  }, [editComment]);

  const handleDeleteCommentedAnswerYes = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const res = await serDeleteCommented(commentedItemDelete?.id);
    dispatch(RsetShowLoading({ value: false }));
    if (res?.data?.code === 1) {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
      handleGetComments();
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  useEffect(() => {
    if (main?.deleteModal?.name === 'DELETE_COMMENTED') {
      if (main?.deleteModal?.answer === 'yes') {
        handleDeleteCommentedAnswerYes();
      }
    }
  }, [main?.deleteModal?.answer]);

  const handleDeleteCommented = (cmt) => {
    setCommentedItemDelete(cmt);
    dispatch(RsetDeleteModal({ value: true, name: 'DELETE_COMMENTED' }));
  };

  return (
    <div className="m-3 rounded bg-white p-3">
      {Object.values(allCommets)?.map((cmt, index) => {
        return (
          <Row className="py-1">
            <div className="">
              <span className="text-secondary ms-2">{cmt?.creatorFullName}</span>
              <span className="text-secondary">
                {StringHelpers?.convertDateFa(cmt?.creationDateTime)}
              </span>
            </div>
            <Col className="d-flex justify-content-end">
              <i
                onClick={() => handleEditComment(cmt, index)}
                className=" text-secondary bi bi-pencil mx-2 cursorPointer"
              />
              <i
                onClick={() => handleDeleteCommented(cmt, index)}
                className=" text-secondary bi bi-trash mx-2 cursorPointer"
              />
              <i className="text-secondary bi bi-arrow-left-circle-fill me-2 cursorPointer" />
            </Col>
            <Row className="my-1 d-flex justify-content-between">
              {cmt?.editMode === true ? (
                <Col className="d-flex align-items-end mb-4">
                  <Input xs={2} xl={6} control={control} name="textCommented" />
                  <ComboBox
                    name="commentMentionUsersViewModels"
                    options={fixUsers}
                    control={control}
                    placeHolder="منشن"
                    className=" mx-2"
                    xl={4}
                    xxl={1}
                  />
                  <Btn
                    xxl={2}
                    loadingName="sendText"
                    className="mx-1 "
                    icon={<i className="d-flex align-items-center bi ms-1 bi-send" />}
                    variant="outline-warning"
                    title="ویرایش"
                    onClick={handleSubmit((data) => handleEditTextComment(cmt, data))}
                  />
                </Col>
              ) : (
                <small className="mb-4"> {cmt?.text}</small>
              )}
              {/* <Col xxl="12" className="">
                ارسال به:
              </Col> */}
            </Row>
            <hr />
          </Row>
        );
      })}
    </div>
  );
};

export default Comment;
