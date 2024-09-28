import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Messages from './Messages';
import { serAllPvChats } from '../../services/masterServices';

export default function CurrentChat({ currentUser }) {
  const [chatList, setChatList] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetAllChats = async (id) => {
    setLoading(true);

    await serAllPvChats(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {});

    setLoading(false);
  };

  useEffect(() => {
    console.log(currentUser);
    handleGetAllChats();
  }, [currentUser]);
  return (
    <>
      <div className="w-100 m-2 mb-0">
        {currentUser ? (
          <div className="d-flex flex-column align-items-start justify-content-start w-100 h-100 bg-white rounded-2 overflow-y-scroll scroll_Master">
            {/* person details */}
            <div style={{ height: '70px' }} className="w-100 d-flex border-bottom rounded-2">
              <div className="h-100 d-flex justify-content-center align-items-center gap-2 p-3">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/025/220/125/small/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                  alt=""
                  className="w-50px h-50px object-fit-cover rounded-pill"
                />
                <div className="d-flex flex-column">
                  <b className="font18">نام کاربر</b>
                  <span className="text-dark-emphasis">آخرین بازدید در ساعت 19:32</span>
                </div>
              </div>
            </div>

            {/* chat list */}
            <div className="w-100 h-100 d-flex flex-column-reverse justify-content-start">
              {/* {chatList && chatList?.length !== 0 ? chatList?.map((caht)=> (<Messages key={chat?.id} content={}/>) ) : null} */}
            </div>

            <Form className="w-100 d-flex flex-column justify-content-center p-3 p-0 bg-secondary rounded-top-2">
              <InputGroup className="d-flex w-100 justify-content-center">
                <Form.Control className="rounded-start-0 rounded-end-2" type="text" id="text" />
                <Button
                  type="submit"
                  variant="none"
                  className="bg-white rounded-end-0 rounded-start-2">
                  <i class="bi bi-send-fill" style={{ transform: 'rotate(-135deg)' }}></i>
                </Button>
              </InputGroup>
            </Form>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center text-black-50 w-100 h-100 bg-white rounded-2 overflow-y-scroll scroll_Master">
            <span>برای شروع, گفتگو را انتخاب کنید...</span>
          </div>
        )}
      </div>
    </>
  );
}
