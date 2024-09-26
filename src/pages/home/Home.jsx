import React, { useEffect } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'jalali-moment';
import { imageUrl } from '../../services/masterServices';

const Home = () => {
  const { main } = useSelector((state) => state);
  const usersList = useSelector((state) => state?.main?.users?.allUsers);

  const m = moment().locale('fa');

  const myTaskList = [
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'my task', tasks: { all: 12, done: 10 } },
    { title: 'test', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } }
  ];
  const tasksToFollowUp = [
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } },
    { title: 'تسک من', tasks: { all: 12, done: 10 } }
  ];

  const currentFullDate = () => {
    return (
      <>
        {m.format('dddd')} {m.format('d')} {m.format('MMMM')} {m.format('yyyy')}
      </>
    );
  };

  useEffect(() => {}, [main]);

  return (
    <>
      <Container fluid className="home-page">
        <Row className="d-flex flex-row-reverse justify-content-around">
          <Col xs="12" xxl="2" xl="2" className="rounded-4 p-0">
            <div className="d-flex justify-content-center justify-content-center p-4 rounded-bottom-3 border shadow-sm bg-white">
              <div className="d-flex justify-content-center">
                {main?.showLoading ? (
                  main?.userRole?.imagePath && main?.userRole?.imagePath !== imageUrl ? (
                    <img
                      style={{ maxWidth: '120px' }}
                      className="w-100 h-100 rounded-pill"
                      src={main?.userRole?.imagePath}
                      alt=""
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center p-5 h-100 w-100 bg-dark-subtle text-light rounded-pill">
                      <span className="font20">{main?.userRole?.firstName[0]}</span>
                      <span className="font20">{main?.userRole?.family[0]}</span>
                    </div>
                  )
                ) : (
                  <div className="placeholder p-5 rounded-pill"></div>
                )}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-2">
              <span className="fw-bold font18">{main?.userRole?.fullName}</span>
              <div>{currentFullDate()}</div>
            </div>
          </Col>

          <Col xs="12" xxl="9" xl="10" className="d-flex flex-column gap-3 p-0">
            <div className="my-4">
              <h3 className="fw-bold"> میزکار {}</h3>
            </div>

            <Col className="dataCard d-flex flex-wrap gap-3 px-2">
              <Col xl="2" xxl="2" className="rounded-4">
                <div className="p-3 rounded-3 border shadow-sm bg-white">
                  <span className="d-flex justify-content-center">
                    <i className="d-flex align-items-center text-success bi bi-check-all p-2 font20 rounded-pill  bg-light" />
                  </span>
                  <div className="fw-bold my-2 justify-content-center d-flex col text-center">
                    کارهای امروز من
                  </div>
                  <div className="fw-bold d-flex justify-content-center col text-center">0</div>
                </div>
              </Col>

              <Col xl="2" xxl="2" className="dataCard rounded-4">
                <div className="p-3 rounded-3 border shadow-sm bg-white">
                  <span className="d-flex justify-content-center">
                    <i className="d-flex align-items-center text-success bi bi-calendar2-week p-2 font20 rounded-pill  bg-light" />
                  </span>
                  <div className=" fw-bold my-2 justify-content-center d-flex col text-center">
                    کارهای دارای تاخیر
                  </div>
                  <div className="fw-bold d-flex justify-content-center col text-center">0</div>
                </div>
              </Col>

              <Col xl="2" xxl="2" className="dataCard rounded-4">
                <div className="p-3 rounded-3 border shadow-sm bg-white">
                  <span className="d-flex justify-content-center">
                    <i className="d-flex align-items-center text-success bi bi-alarm p-2 font20 rounded-pill bg-light" />
                  </span>
                  <div className=" fw-bold my-2 justify-content-center d-flex col text-center">
                    کارهای قبل از پیگیری
                  </div>
                  <div className="fw-bold d-flex justify-content-center col text-center">0</div>
                </div>
              </Col>
            </Col>

            <div className="taskCards d-flex">
              {/* tasks */}
              <div className="p-1 w-50 h-100">
                <div className="h-100 d-flex flex-column justify-content-start rounded-3 align-items-center bg-white border">
                  <div className="w-100 d-flex justify-content-center rounded-top-3 shadow-sm py-2 fw-bold bgDarkPrimary text-white border">
                    وظایف من
                  </div>
                  <div className="w-100 overflow-auto scroll_Master">
                    {myTaskList.length !== 0 ? (
                      myTaskList.map((task, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-lg-start gap-2 w-100 border-bottom py-2 px-4 cursorPointer hover-element">
                          <Form.Check />

                          <span>{task.title}</span>

                          <div className="me-auto d-flex align-items-center gap-1 font12 border rounded p-1">
                            <i class="d-flex align-items-center bi bi-list-check"></i>
                            {task.tasks.done}/{task.tasks.all}{' '}
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="w-100 text-center fw-bold px-2 pt-4">
                        وظیفه ای برای شما وجود ندارد
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* tasks to follow up */}
              <div className="p-1 w-50 h-100">
                <div className="h-100 d-flex flex-column justify-content-start rounded-3 align-items-center bg-white border">
                  <div className="w-100 d-flex justify-content-center rounded-top-3 shadow-sm py-2 fw-bold bgDarkPrimary text-white border">
                    پیگیری از دیگران
                  </div>
                  <div className="w-100 overflow-auto scroll_Master">
                    {tasksToFollowUp.length !== 0 ? (
                      tasksToFollowUp.map((task, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-lg-start gap-2 w-100 border-bottom py-2 px-4 cursorPointer hover-element">
                          <Form.Check />

                          <span>{task.title}</span>

                          <div className="me-auto d-flex align-items-center gap-1 font12 border rounded p-1">
                            <i class="d-flex align-items-center bi bi-list-check"></i>
                            {task.tasks.done}/{task.tasks.all}{' '}
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="w-100 text-center fw-bold px-2 pt-4">
                        وظیفه ای برای شما وجود ندارد
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
