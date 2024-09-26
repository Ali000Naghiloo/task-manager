import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { imageUrl } from '../../services/masterServices';

const Partners = () => {
  const { main } = useSelector((state) => state);

  const handleUserStatus = (status, userData = { last_seen: '2 ساعت پیش' }) => {
    if (status === 0) {
      return { text: `آخرین بازدید ${userData?.last_seen}`, style: 'bg-dark opacity-75' };
    } else if (status === 1) {
      return { text: 'آنلاین', style: 'bg-success' };
    } else if (status === 2) {
      return {
        text: 'دور از کار',
        style: 'bg-warning'
      };
    } else if (status === 3) {
      return {
        text: 'مزاحم نشوید',
        style: 'bg-danger'
      };
    } else {
      return { text: 'آنلاین', style: 'bg-success' };
    }
  };

  const fixAllUsers = Object.values(main?.allUsers)?.map((user, index) => {
    const randomUserProfileBackground = (index) => {
      if (index % 5 === 0) {
        return 'bg-dark-subtle';
      } else if (index % 2 === 0) {
        return 'bg-success-subtle';
      } else if (index % 3 === 0) {
        return 'bg-danger-subtle';
      } else {
        return 'bg-dark-subtle';
      }
    };

    return (
      <div key={index} className="d-flex align-items-center pe-3 p-2 cursorPointer hover-element">
        <span className="position-relative">
          {user?.imagePath && user?.imagePath !== imageUrl ? (
            <img
              className="w-30px h-30px rounded-pill border"
              src={user.imagePath}
              alt={user.name}
            />
          ) : (
            <div
              className={`w-30px h-30px rounded-pill border shadow-sm d-flex justify-content-center align-items-center ${randomUserProfileBackground(index)}`}>
              <span className="font10">{user?.firstName}</span>
              <span>{user?.family}</span>
            </div>
          )}

          {/* user status */}
          <div className="w-100 d-flex justify-content-start position-absolute bottom-0">
            <span className={`p-1 rounded-pill border ${handleUserStatus(index).style}`}></span>
          </div>
        </span>

        {/* user data */}
        <div className="d-flex flex-column me-2">
          <span className="font15">{user?.fullName}</span>
          <span className="font12 text-dark-emphasis">{handleUserStatus(index).text}</span>
        </div>
      </div>
    );
  });

  return (
    <div style={{ height: '500px' }} className="w-100 overflow-auto no_scroll">
      {fixAllUsers}
    </div>
  );
};

export default Partners;
