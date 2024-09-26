import React, { useEffect } from 'react';
import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RsetBoardMessage } from '../../../../hooks/slices/boardSlice';

export default function GroupInput({ sendMessage }) {
  const dispatch = useDispatch();
  const boardMessageInfo = useSelector((state) => state.board.boardMessage);

  const handleChangeInput = (message) => {
    dispatch(RsetBoardMessage({ ...boardMessageInfo, inputText: message }));
  };

  return (
    <Form
      onSubmit={(e) => sendMessage(e)}
      className="w-100 d-flex flex-column justify-content-center p-3 group_input position-fixed bottom-0 left-0 p-0 bg-secondary rounded-top-2">
      <InputGroup className="d-flex w-100 justify-content-center">
        <Form.Control
          value={boardMessageInfo?.inputText}
          onChange={(e) => handleChangeInput(e.target.value)}
          className="rounded-start-0 rounded-end-2"
          type="text"
          id="text"
        />
        <Button type="submit" variant="none" className="bg-white rounded-end-0 rounded-start-2">
          <i class="bi bi-send-fill" style={{ transform: 'rotate(-135deg)' }}></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
