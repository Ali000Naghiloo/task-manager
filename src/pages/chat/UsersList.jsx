import React from 'react';
import { Spinner } from 'react-bootstrap';
import { imageUrl } from '../../services/masterServices';

export default function UsersList({ users }) {
  const handleRenderUsersList = () => {
    return (
      <>
        {users.map((user) => (
          <div
            key={user.id}
            className="w-100 d-flex align-items-center gap-3 p-2 border-bottom hover-element cursorPointer">
            {/* profile image */}
            <div className="h-100">
              {user?.imagePath && user?.imagePath !== imageUrl ? (
                <img
                  className="w-40px h-40px rounded-pill border"
                  src={user.imagePath}
                  alt={user.name}
                />
              ) : (
                <div
                  className={
                    'w-40px h-40px rounded-pill border shadow-sm d-flex justify-content-center align-items-center bg-dark-sblet'
                  }>
                  <span className="font10">{user?.firstName[0]}</span>
                  <span>{user?.family[0]}</span>
                </div>
              )}
            </div>

            <span>{user?.fullName}</span>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div style={{ minWidth: '30%' }} className="h-100 me-2">
        <div className="w-100 h-100 bg-white rounded-2 overflow-y-scroll scroll_Master">
          {users ? (
            users?.length ? (
              handleRenderUsersList()
            ) : (
              <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                کاربری برای گفتگو وجود ندارد
              </div>
            )
          ) : (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
