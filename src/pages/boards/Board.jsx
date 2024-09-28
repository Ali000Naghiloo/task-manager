import React, { Suspense, lazy, useState } from 'react';
import Group from './board components/Group';
import Loading from '../../components/Loading';
import Tasks from './board components/Tasks';
import Boards from './board components/Boards';
import { Col, Nav, Row, Tab } from 'react-bootstrap';

const Board = () => {
  // dynamic imports
  // const Tasks = lazy(() => import('./board components/Tasks'));
  // const Boards = lazy(() => import('./board components/Boards'));
  // const Group = lazy(() => import('./board components/Group'));

  const [tab, setTab] = useState('boards');

  return (
    <>
      <div className="w-100 d-flex flex-column overflow-hidden">
        <Tab.Container justify activeKey={tab} onSelect={(t) => setTab(t)}>
          <Row className="w-100 board_tabs pt-2 px-4 border-bottom">
            <Col
              className={`d-flex text-dark-emphasis rounded-top-2 opacity opacity-50 hover-opacity p-0 h-100 ${tab === 'group' ? 'border border-bottom-0 fw-bold text-dark opacity-100 bg-white' : ''}`}>
              <Nav.Item className="flex-grow-1 text-center p-0">
                <Nav.Link
                  className="d-flex p-2 justify-content-center align-items-center gap-1 h-100"
                  eventKey="group">
                  <i
                    class="bi bi-chat-left-dots-fill fs-5"
                    style={{ transform: 'translate(0 , 10%)' }}></i>
                  <span className="fs-5 fw-bold">گروه </span>
                </Nav.Link>
              </Nav.Item>
            </Col>
            <Col
              className={`d-flex text-dark-emphasis rounded-top-2 opacity opacity-50 hover-opacity p-0 h-100 ${tab === 'tasks' ? 'border border-bottom-0 fw-bold text-dark opacity-100 bg-white' : ''}`}>
              <Nav.Item className="flex-grow-1 text-center p-0">
                <Nav.Link
                  className="d-flex p-2 justify-content-center align-items-center gap-1 h-100"
                  eventKey="tasks">
                  <i class="bi bi-list-task fs-5" style={{ transform: 'translate(0 , 10%)' }}></i>
                  <span className="fs-5 fw-bold">وظیفه ها </span>
                </Nav.Link>
              </Nav.Item>
            </Col>
            <Col
              className={`d-flex text-dark-emphasis rounded-top-2 opacity opacity-50 hover-opacity p-0 h-100 ${tab === 'boards' ? 'border border-bottom-0 fw-bold text-dark opacity-100 bg-white' : ''}`}>
              <Nav.Item className="flex-grow-1 text-center p-0">
                <Nav.Link
                  className="d-flex p-2 justify-content-center align-items-center gap-1 h-100"
                  eventKey="boards">
                  <i class="bi bi-columns-gap" style={{ transform: 'translate(0 , 10%)' }}></i>
                  <span className="fs-5 fw-bold">ستون ها </span>
                </Nav.Link>
              </Nav.Item>
            </Col>
          </Row>

          <Tab.Content>
            <Tab.Pane eventKey="group">
              <Group />
            </Tab.Pane>

            <Tab.Pane eventKey="tasks">
              <Tasks />
            </Tab.Pane>

            <Tab.Pane eventKey="boards">
              <Boards />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};

export default Board;
