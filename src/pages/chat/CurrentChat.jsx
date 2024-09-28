import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import Messages from './Messages';
import { serAllPvChats, serSendPvMessage } from '../../services/masterServices';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationUpdated } from '../../hooks/slices/notificationSlice';

export default function CurrentChat({ currentUser }) {
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState(null);
  const [sendingText, setSendingText] = useState({
    receiverId: '',
    messageText: '',
    originalMessageId: null,
    attachmentsCreateViewModel: [],
    disabled: false
  });
  const [loading, setLoading] = useState(false);
  const newMessage = useSelector((state) => state?.notification?.updated);

  const handleGetAllChats = async (id) => {
    setLoading(true);
    let chats = [];

    await serAllPvChats(id)
      .then((res) => {
        if (res.status === 200 && res.data?.code === 1) {
          chats = res.data?.data;
        }
      })
      .catch(() => {
        toast.error('خطا در دریافت پیام ها');
      });

    setChatList(chats);
    setLoading(false);
  };

  const handleSendText = async () => {
    setSendingText({ ...sendingText, disabled: true });
    if (sendingText.messageText.length !== 0)
      await serSendPvMessage(sendingText)
        .then((res) => {
          if (res.status === 200 && res.data?.code == 1) {
            setSendingText({ ...sendingText, messageText: '', disabled: false });
            handleGetAllChats(currentUser?.id);
          }
        })
        .catch(() => {
          toast.error('مشکلی در ارسال پیام رخ داد لطفا مجددا تلاش کنید');
        });
  };

  useEffect(() => {
    if (currentUser && currentUser?.id) {
      setSendingText({ ...sendingText, receiverId: currentUser?.id });
      handleGetAllChats(currentUser?.id);
    }
  }, [currentUser]);

  useEffect(() => {
    // console.log(newMessage);
    if (newMessage) {
      setTimeout(() => {
        handleGetAllChats(currentUser?.id);
      }, 500);
      dispatch(setNotificationUpdated(false));
    }
  }, [newMessage]);

  useEffect(() => {
    const getMessageInterval = setInterval(() => {
      if (currentUser) {
        handleGetAllChats(currentUser?.id);
      }
    }, 5000);

    return () => clearInterval(getMessageInterval);
  }, []);

  useEffect(() => {
    setSendingText({ ...sendingText, messageText: '' });
  }, []);

  return (
    <>
      <div className="w-100 m-2 mb-0">
        {currentUser ? (
          <div className="d-flex flex-column align-items-start justify-content-start w-100 h-100 bg-white rounded-2 overflow-y-scroll scroll_Master">
            {/* person details */}
            <div
              style={{ height: '70px' }}
              className="w-100 d-flex justify-content-between align-items-center border-bottom rounded-2">
              <div className="h-100 d-flex justify-content-center align-items-center gap-2 p-3">
                <img
                  src={currentUser ? currentUser?.imagePath : null}
                  alt=""
                  className="w-50px h-50px object-fit-cover rounded-pill"
                />
                <div className="d-flex flex-column">
                  <b className="font18">{currentUser ? currentUser?.fullName : ''}</b>
                  <span className="text-dark-emphasis">آنلاین</span>
                </div>
              </div>

              <div>
                <Button onClick={() => handleGetAllChats(currentUser?.id)}>refresh</Button>
              </div>
            </div>

            {/* chat list */}
            <div className="w-100 h-100 overflow-y-auto no_scroll d-flex flex-column-reverse justify-content-start p-2">
              {chatList && chatList?.length !== 0 ? (
                chatList?.map((chat, index) => (
                  <Messages
                    key={chat?.id}
                    content={chat?.messageText}
                    prevSender={chatList[index + 1] ? chatList[index + 1]?.senderFullName : null}
                    senderName={chat?.senderFullName}
                    time={chat?.sentDate}
                    userName={chat?.receiverFullName}
                  />
                ))
              ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center text-dark-emphasis">
                  پیامی وجود ندارد...
                </div>
              )}
            </div>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (!sendingText.disabled) {
                  handleSendText();
                }
              }}
              className="w-100 d-flex flex-column justify-content-center p-3 p-0 bg-secondary rounded-top-2">
              <InputGroup className="d-flex w-100 justify-content-center">
                <Form.Control
                  className="rounded-start-0 rounded-end-2"
                  type="text"
                  id="text"
                  value={sendingText.messageText}
                  onChange={(e) => setSendingText({ ...sendingText, messageText: e.target.value })}
                />
                <Button
                  disabled={loading}
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
