import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Col } from 'react-bootstrap';

const GeneralLayout = ({ children }) => {
  return (
    <>
      <div className="d-flex">
        <Col className="position_relative bg-whit-100">
          <Header />
          {/* <Bords /> */}
          {children}
        </Col>
        <Col className="bg-white shadow-lg" md="2">
          <Sidebar />
        </Col>
      </div>
    </>
  );
};

export default GeneralLayout;
