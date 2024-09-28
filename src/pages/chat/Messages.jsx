import moment from 'jalali-moment';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Messages({ userName, content, senderName, prevSender, time }) {
  const loggedInUserName = useSelector((state) => state?.main);

  useEffect(() => {
    // console.log(loggedInUserName?.userRole?.fullName, senderName);
  }, [loggedInUserName]);

  return (
    <>
      {senderName == loggedInUserName?.userRole?.fullName ? (
        <div className="d-flex" style={{ maxWidth: '50%' }}>
          <div className="w-fit-content m-2 py-2 px-3 bgDarkPrimary text-light rounded-2 position-relative">
            <p className="fs-6 mx-50" style={{ wordBreak: 'break-word' }}>
              {content}
            </p>
            <span
              className="position-absolute bottom-0 right-0 text-light"
              style={{ fontSize: '0.8em' }}>
              {time ? moment(time).locale('fa').format('HH:mm') : ''}
            </span>
          </div>

          <div className="h-100 d-flex flex-column justify-content-end">
            <i class="bi bi-reply-fill h-fit-content hover-element cursorPointer rounded-1 p-1"></i>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-end h-auto bg-white">
          <div className="h-100 d-flex flex-column justify-content-end">
            <i class="bi bi-reply-fill h-fit-content hover-element cursorPointer rounded-1 p-1"></i>
          </div>

          <div className="d-flex h-100" style={{ maxWidth: '50%' }}>
            <div className="mx-2 my-1 gap-1 d-flex flex-column">
              {prevSender && prevSender == senderName ? null : (
                <span className="me-auto">{senderName}</span>
              )}
              <div
                className="w-100 py-2 px-2 text-white rounded-2 position-relative"
                style={{ background: 'gray' }}>
                <p className="fs-6 h-100 mw-50 me-auto" style={{ wordBreak: 'break-word' }}>
                  {content}
                </p>
                <span className="position-absolute bottom-0 right-0" style={{ fontSize: '0.8em' }}>
                  {time ? moment(time).locale('fa').format('HH:mm') : ''}
                </span>
              </div>
            </div>

            {prevSender && prevSender == senderName ? (
              <div className="d-flex justify-content-center align-items-center rounded-pill p-2 bg-secondary text-light w-30px h-30px mt-auto">
                <span>{senderName[0]}</span>
                <span>{senderName?.split(' ')[1][0]}</span>
              </div>
            ) : (
              <div className="w-30px h-30px"></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
