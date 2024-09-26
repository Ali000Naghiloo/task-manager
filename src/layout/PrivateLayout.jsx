import { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Col, Collapse } from 'react-bootstrap';
import { getAllUsers, getUserRole, serAllEnums } from '../services/masterServices';
import { useDispatch, useSelector } from 'react-redux';
import { RsetAllEnums, RsetAllUsers, RsetUserRole } from '../hooks/slices/main';
import StringHelpers from '../helpers/StringHelpers';
import asyncWrapper from '../utils/asyncWrapper';
import MessageAlert from '../components/MessageAlert';
import DeleteModal from '../common/DeleteModal';
import Btn from '../components/Btn';
import { useMediaQuery } from 'react-responsive';

const PrivateLayout = ({ children }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 900px)' });
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const { main } = useSelector((state) => state);
  const handleProjectRole = asyncWrapper(async () => {
    const resRole = await serAllEnums();
    if (resRole?.data?.code === 1) {
      const projectRole = StringHelpers?.convertComboBox(resRole?.data?.data?.ProjectRole);
      const projectStatus = StringHelpers?.convertComboBox(resRole?.data?.data?.ProjectStatus);
      const projectType = StringHelpers?.convertComboBox(resRole?.data?.data?.ProjectType);

      // const fixComboRole = StringHelpers?.convertComboBox(resRole?.data?.data);
      const priorityList = StringHelpers?.convertComboBox(resRole?.data?.data?.Priority);
      dispatch(RsetAllEnums({ priorityList, projectRole, projectStatus, projectType }));
    }
  });

  const handleGetUserRole = asyncWrapper(async () => {
    const res = await getUserRole();
    if (res?.data?.code === 1) {
      dispatch(RsetUserRole(res?.data?.data));
    }
  });

  const handleGetAllUsers = asyncWrapper(async () => {
    const res = await getAllUsers();
    if (res?.data?.code === 1) {
      dispatch(RsetAllUsers(res?.data?.data));
    }
  });

  useEffect(() => {
    handleGetUserRole();
    handleGetAllUsers();
    handleProjectRole();
  }, []);

  return (
    <>
      <div className="w-100 min_Height_100 h-auto d-flex position-relative">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="w-100 h-100 d-flex bg-light mt-8">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          <div className={`min_Height_100 overflow-auto w-100 ${isOpen ? 'main-content' : ''}`}>
            {children}
          </div>
        </div>
      </div>
      {!!main?.messageModal?.value && <MessageAlert />}
      {!!main?.deleteModal?.value && <DeleteModal title={main?.deleteModal?.title} />}
    </>
  );
};

export default PrivateLayout;

// {isSmallScreen && (
//   <>
//     <Col xl="5" className='showIcon sitShowSideIcon bg-success rounded-start-4 mt-4'>
//       <i onClick={() => setShowSide(!showSide)} className='px-2 py-4 bg-success cursorPointer bi bi-chevron-double-right text-white font20  rounded-start-4  ' />
//     </Col>
//   </>
// )}

// import React, { useState } from 'react'
// import { Button, Col, Collapse, Container, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useMediaQuery } from "react-responsive";

// const Header: React.FC = () => {
//   const [openBurger, setOpenBurger] = useState < boolean > (false)

//   const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });

//   return (
//     <header className=''>
//       <Container fluid className='fitHeader bg-white justify-content-between shadow py-3 mb-4 w-100 '>
//         <Container className='' >
//           {/* <ul className='dropdown-menu'>
//                             <li> <a className='dropdown-item' >  </a> </li>
//                         </ul> */}
//           {isSmallScreen ? (
//             <>
//               <Row className='d-flex' >
//                 <Col className=''>
//                   <i aria-expanded={openBurger} aria-controls="example-collapse-text" className="bi cursorPointer me-4 bi-justify font25" onClick={() => setOpenBurger(!openBurger)} />
//                 </Col>
//                 <Col xs="6" sm="4" md="3" lg="2" className=''>
//                   <Link to="/logIn" >
//                     <button className='signUpBtn rounded-3 ' > ورود / ثبت نام </button>
//                   </Link>
//                 </Col>
//               </Row>
//             </>
//           ) :
//             <>
//               <Row className=' d-flex justify-content-between'>
//                 <Col sm="8" md="6" xl="5" className='ms-4 d-flex justify-content-start'>
//                   <Link
//                     className="py-2 textPrimary headerHover navbar-brand"
//                     to="/"
//                   >
//                     صفحه اصلی
//                   </Link >
//                   <Link
//                     className="p-2 textPrimary headerHover me-4 navbar-brand  "
//                     to="/tax"
//                   >
//                     خدمات
//                   </Link>
//                   <Link
//                     className="p-2 textPrimary headerHover me-4 navbar-brand  "
//                     to="/"
//                   >
//                     راهنما
//                   </Link>
//                   <Link
//                     className="p-2 textPrimary headerHover me-4 navbar-brand "
//                     to="/aboutUs"
//                   >
//                     درباره ما
//                   </Link>
//                   <Link
//                     className="p-2 textPrimary headerHover me-4 navbar-brand "
//                     to="/overTime"
//                   >
//                     تماس با ما
//                   </Link>
//                   <Link
//                     className="p-2 textPrimary headerHover me-4 navbar-brand "
//                     to='/questions'
//                   >
//                     سوالات متداول
//                   </Link>

//                 </Col>
//                 <Col sm="4" md="6" xl="3" className=' d-flex justify-content-end'>
//                   <Link to="/logIn" >
//                     <button className='signUpBtn rounded-3 ' > ورود / ثبت نام </button>
//                   </Link>
//                 </Col>
//               </Row>
//             </>
//           }
//           {isSmallScreen && openBurger ? (
//             <>
//               <Col sm="6" >
//                 <Collapse in={openBurger}>
//                   <Row className="d-flex row  rounded-4 mx-2 pb-4" >
//                     <Col sm="6" md="6" id="example-collapse-text" className='d-flex p-2  rounded-4 justify-content-sm-start justify-content-xl-center justify-content-md-center'>
//                       <Link
//                         id="example-collapse-text"
//                         className="textPrimary navbar-brand"
//                         to="/"
//                       >
//                         صفحه اصلی
//                       </Link >
//                     </Col>
//                     <hr className='text-success' />
//                     <Col sm="6" md="6" id="example-collapse-text" className=' d-flex p-2 rounded-4 justify-content-sm-start justify-content-xl-center justify-content-md-center'>
//                       <Link
//                         id="example-collapse-text"
//                         className="textPrimary navbar-brand  "
//                         to="/tax"
//                       >
//                         خدمات
//                       </Link>
//                     </Col>
//                     <hr className='text-success' />
//                     <Col sm="6" md="6" id="example-collapse-text" className=' d-flex p-2 rounded-4 justify-content-sm-start justify-content-xl-center justify-content-md-center'>
//                       <Link
//                         id="example-collapse-text"
//                         className="textPrimary navbar-brand  "
//                         to="/tax"
//                       >
//                         درباره ما
//                       </Link>
//                     </Col>
//                     <hr className='text-success' />
//                     <Col sm="6" md="6" id="example-collapse-text" className=' d-flex p-2 rounded-4 justify-content-sm-start justify-content-xl-center justify-content-md-center'>
//                       <Link
//                         id="example-collapse-text"
//                         className="textPrimary navbar-brand  "
//                         to="/tax"
//                       >
//                         تماس با ما
//                       </Link>
//                     </Col>
//                     <hr className='text-success' />
//                   </Row>
//                 </Collapse>
//               </Col>
//             </>
//           ) : null}

//         </Container>
//       </Container>

//     </header >
//   )
// };

// export default Header;
