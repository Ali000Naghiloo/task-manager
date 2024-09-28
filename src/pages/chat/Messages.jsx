import React from 'react';

export default function Messages({ userId, content, name, time }) {
  const currentUserId = 1;

  return (
    <>
      {userId.current == currentUserId ? (
        <div className="d-flex h-100" style={{ maxWidth: '80%' }}>
          <div className="w-fit-content m-2 py-2 px-3 bgDarkPrimary text-light rounded-2 position-relative">
            <p className="fs-6 mx-50" style={{ wordBreak: 'break-word' }}>
              {content}
            </p>
            <span className="position-absolute bottom-0 left-0 text-light fs-7">{time}</span>
          </div>

          <div className="h-100 d-flex flex-column justify-content-end">
            <i class="bi bi-reply-fill h-fit-content hover-element cursorPointer rounded-1 p-1"></i>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-end h-100">
          <div className="h-100 d-flex flex-column justify-content-end">
            <i class="bi bi-reply-fill h-fit-content hover-element cursorPointer rounded-1 p-1"></i>
          </div>

          <div className="d-flex h-100" style={{ maxWidth: '80%' }}>
            <div className="mx-2 my-1 gap-1 d-flex flex-column">
              {userId.prev && userId.prev != userId.current ? (
                <span className="me-auto">{name}</span>
              ) : null}
              <div className="w-fit-content py-2 px-2 bg-white text-dark rounded-2 position-relative">
                <p className="fs-6 h-100 mw-50 me-auto" style={{ wordBreak: 'break-word' }}>
                  {content}
                </p>
                <span className="position-absolute bottom-0 right-0 text-secondary fs-7">
                  {time}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center rounded-pill p-2 bg-secondary text-light w-30px h-30px mt-auto">
              <span>{name[0]}</span>
              <span>{name[name.length - 1]}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
