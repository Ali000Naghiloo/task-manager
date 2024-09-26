import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Col, Collapse, Row } from 'react-bootstrap';
import Btn from './Btn';

const ColorPicker = ({ color, setColor }) => {
  const [showFieldCollapse, setShowFieldCollapse] = useState(false); // Default color is black

  const handleChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  return (
    <Col className="">
      <div className="d-flex align-items-center mt-4 justify-content-center ">
        <Btn
          xl={6}
          icon={<i className="d-flex align-items-center me-2 bi bi-caret-down" />}
          className=""
          variant="outline-secondary"
          title="انتخاب رنگ"
          onClick={() => setShowFieldCollapse(!showFieldCollapse)}
        />
      </div>
      <Collapse className="" in={showFieldCollapse}>
        <Row className="justify-content-center">
          <CirclePicker
            className="d-flex border mt-3 align-items-center ps-4 rounded-3 pt-3 justify-content-center"
            color={color}
            onChange={handleChange}
          />
        </Row>
      </Collapse>
    </Col>
  );
};

export default ColorPicker;
