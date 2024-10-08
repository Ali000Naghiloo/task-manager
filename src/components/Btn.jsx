import React from 'react';
import { Button, Col, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Btn = ({
  title = '',
  name = '',
  loadingName = null,
  xl = 2,
  lg = 3,
  md = 4,
  sm = 5,
  xs = 6,
  className = '',
  icon,
  onClick,
  variant
}) => {
  const { main } = useSelector((state) => state);

  return (
    <>
      <Col lg={lg} sm={sm} xs={xs} md={md} xl={xl}>
        {variant ? (
          <Button
            name={name}
            className={`${className} d-flex w-100 align-items-center justify-content-center`}
            variant={variant}
            onClick={onClick}>
            {main.showLoading?.btnName === loadingName ? (
              <Spinner className="my-1" animation="border" size="sm" role="status" />
            ) : (
              title
            )}
            {icon}
          </Button>
        ) : (
          <button
            name={name}
            className={`${className} d-flex w-100  px-4 py-2 justify-content-center`}
            onClick={onClick}>
            {icon}
            {main.showLoading?.btnName === loadingName ? (
              <Spinner className="my-1" animation="border" size="sm" role="status" />
            ) : (
              title
            )}
          </button>
        )}
      </Col>
    </>
  );
};

export default Btn;
