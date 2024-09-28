import { Col, Collapse, Form, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RsetShowCreateModal } from '../hooks/slices/boardSlice';
import Partners from './Partners';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { board, main } = useSelector((state) => state);
  const [notifPermission, setNotifPermission] = useState(false);
  const dispatch = useDispatch();
  const size = useWindowSize();

  const handleRenderTasksDetails = () => {
    const renderMyTasks = ({ ref, ...triggerHandler }) => (
      <span
        {...triggerHandler}
        ref={ref}
        className="rounded-1 bg-success px-2 text-white position-relative">
        0
      </span>
    );
    const renderPassTimeTask = ({ ref, ...triggerHandler }) => (
      <span
        {...triggerHandler}
        ref={ref}
        className="rounded-1 bg-danger px-2 text-white position-relative">
        0
      </span>
    );

    return (
      <div className="d-flex gap-1 me-auto">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip className="bg-dark-subtle">وظیفه های من</Tooltip>}>
          {renderMyTasks}
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip className="bg-dark-subtle">وظیفه های تاخیر دار</Tooltip>}>
          {renderPassTimeTask}
        </OverlayTrigger>
      </div>
    );
  };

  const handleRenderChatDetails = ({ notifColor }) => {
    const renderMessages = ({ ref, ...triggerHandler }) => (
      <span
        style={{ background: `${notifColor}` }}
        {...triggerHandler}
        ref={ref}
        className="rounded-1 px-2 text-white position-relative">
        0
      </span>
    );

    return (
      <div className="d-flex gap-1 me-auto">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip className="bg-dark-subtle">پیام جدید</Tooltip>}>
          {renderMessages}
        </OverlayTrigger>
      </div>
    );
  };

  const handleGetPermission = () => {
    Notification.requestPermission().then((res) => {
      if (res === 'granted') {
        setNotifPermission(true);
      } else {
        setNotifPermission(false);
        handleGetPermission();
      }
    });
  };

  const handleTogglePermission = () => {
    navigator.permissions.query({ name: 'notifications' }).then((pr) => {
      if (pr.state === 'granted') {
        setNotifPermission(true);
      } else {
        handleGetPermission();
      }
    });
  };

  useEffect(() => {
    navigator.permissions.query({ name: 'notifications' }).then((pr) => {
      if (pr.state === 'granted') {
        setNotifPermission(true);
      } else {
        setNotifPermission(false);
      }
    });
  }, []);

  if (size && size.width > 900) {
    return (
      <Collapse in={isOpen} dimension={'width'}>
        <div className="bg-white overflow-y-auto no_scroll sidebar">
          <div style={{ maxWidth: '100%' }} className="w-100 p-2">
            <br />

            {/* home */}
            <div className="w-100">
              <NavLink
                to="./home"
                className={({ isActive }) =>
                  isActive
                    ? 'w-100 flex gap-2 bg-selected fw-bold text-black text-decoration-none cursorPointer py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                    : 'w-100 flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                }>
                <i style={{ color: '#EE1731' }} className="font24 bi bi-house-door-fill" />
                <span className="font18 pe-2">خانه</span>
              </NavLink>
            </div>
            {/* chat */}
            <div className="w-100">
              <NavLink
                to="./chat"
                className={({ isActive }) =>
                  isActive
                    ? 'flex gap-2 bg-selected fw-bold text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                    : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                }>
                <i style={{ color: '#EE5717' }} className="font24 bi bi-chat-left-text-fill" />
                <span className="font18 me-2 ">گفتگو </span>
                {handleRenderChatDetails({ notifColor: '#EE5717' })}
              </NavLink>
            </div>
            {/* projects */}
            <div className="w-100">
              <NavLink
                to="./projects"
                className={({ isActive }) =>
                  isActive
                    ? 'flex gap-2 bg-selected fw-bold text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                    : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                }>
                <i style={{ color: '#6FA8FF' }} className="font24 fw-bold bi bi-trello" />
                <span className="font18 me-2 ">پروژه ها</span>
              </NavLink>
            </div>
            {/* tasks */}
            <div className="w-100">
              <NavLink
                to={'./my-tasks'}
                className={({ isActive }) =>
                  isActive
                    ? 'flex gap-2 bg-selected fw-bold text-black text-decoration-none cursorPointer py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                    : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                }>
                <i style={{ color: '#169B23' }} className="font24 fw-bold bi bi-list-check" />
                <span className="font18 me-2">وظیفه ها</span>
                {handleRenderTasksDetails()}
              </NavLink>
            </div>
            {/* create-note */}
            <div className="w-100">
              <NavLink
                to="./create-note"
                className={({ isActive }) =>
                  isActive
                    ? 'flex gap-2 bg-selected fw-bold text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                    : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                }>
                <i style={{ color: '#fb0' }} className="font24 fw-bold bi bi-plus-square-fill" />
                <span className="font18 me-2">یادداشت های من</span>
              </NavLink>
            </div>

            <hr />
          </div>

          <div className="w-100 d-flex justify-content-between p-3 py-1">
            <span>دسترسی ارسال اعلان</span>
            <span className="cursorPointer">
              <Form.Check checked={notifPermission} onChange={handleTogglePermission} />
            </span>
          </div>

          <div className="w-100 p-2  pt-4">
            <div className="w-100 px-3 p-1 rounded-1 bgDarkPrimary text-white">
              <span>همکارانم</span>
            </div>
          </div>

          <Partners />
        </div>
      </Collapse>
    );
  } else {
    return (
      <Offcanvas
        placement="end"
        show={isOpen}
        onHide={() => {
          setIsOpen(false);
        }}>
        <Offcanvas.Header closeButton>
          <h1 className="w-100">تسک منیجر</h1>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="z-3 w-100 bg-white">
            <div className="p-2">
              <br />

              {/* home */}
              <div className="">
                <NavLink
                  to="./home"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex gap-2 bg-selected fw-bold text-black text-decoration-none cursorPointer py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                      : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                  }>
                  <i style={{ color: '#EE1731' }} className="font24 bi bi-house-door-fill" />
                  <span className="font18 me-2">خانه</span>
                </NavLink>
              </div>
              {/* chat */}
              <div className="">
                <NavLink
                  to="./chat"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex gap-2 bg-selected fw-bold text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                      : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                  }>
                  <i style={{ color: '#EE5717' }} className="font24 bi bi-chat-left-text-fill" />
                  <span className="font18 me-2 ">گفتگو </span>
                  {handleRenderChatDetails({ notifColor: '#EE5717' })}
                </NavLink>
              </div>
              {/* projects */}
              <div className="">
                <NavLink
                  to="./projects"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex gap-2 bg-selected fw-bold text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                      : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                  }>
                  <i style={{ color: '#6FA8FF' }} className="font24 fw-bold bi bi-trello" />
                  <span className="font18 me-2 ">پروژه ها</span>
                </NavLink>
              </div>
              {/* tasks */}
              <div className="">
                <NavLink
                  to={'./my-tasks'}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex gap-2 bg-selected fw-bold text-black text-decoration-none cursorPointer py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                      : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                  }>
                  <i style={{ color: '#169B23' }} className="font24 fw-bold bi bi-list-check" />
                  <span className="font18 me-2">وظیفه ها</span>
                  {handleRenderTasksDetails()}
                </NavLink>
              </div>
              {/* create-note */}
              <div className="">
                <NavLink
                  to="./create-note"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex gap-2 bg-selected fw-bold text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center rounded-2 fw-sm text-start'
                      : 'flex gap-2 hover-element text-decoration-none cursorPointer text-DarkPrimary py-2 px-2 d-flex justify-content-start align-items-center fw-sm rounded-2 text-start'
                  }>
                  <i style={{ color: '#fb0' }} className="font24 fw-bold bi bi-plus-square-fill" />
                  <span className="font18 me-2">یادداشت های من</span>
                </NavLink>
              </div>

              <hr className="" />
            </div>

            <div className="w-100 d-flex justify-content-between p-3 py-1">
              <span>دسترسی ارسال اعلان</span>
              <span className="cursorPointer">
                <Form.Check checked={notifPermission} onChange={handleTogglePermission} />
              </span>
            </div>

            <Partners />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
};

export default Sidebar;
