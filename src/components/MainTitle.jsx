import React from 'react';
import { Col } from 'react-bootstrap';

const MainTitle = ({ className, Children, title, xxl = '3', xl = '5', md = '8', xs = '10' }) => {
  return (
    <Col
      className={`${className} w-100 d-flex align-items-center justify-content-between pt-5 rounded-start-pill py-4 `}
      xxl={xxl}
      xl={xl}
      md={md}
      xs={xs}>
      <h4 className="text-DarkPrimary fw-bold pe-5 my-0" style={{ textWrap: 'nowrap' }}>
        {title}
      </h4>

      {Children}
    </Col>
  );
};

export default MainTitle;
