import React from 'react';
import { Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
// import { Col, Dropdown, DropdownButton } from 'react-bootstrap';

// const DropDown = ({ className, title, xl = 2, lg = 3, md = 4, sm = 5, xs = 6 }) => {
//   return (
//     <Col className={className} lg={lg} sm={sm} xs={xs} md={md} xl={xl}>
//       <DropdownButton id="dropdown-basic-button" title={title}>
//         <div>  </div>
//         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//       </DropdownButton>
//     </Col>
//   );
// };

// export default DropDown;

const DropDown = ({
  className,
  title,
  options,
  variant,
  xl = 2,
  lg = 3,
  md = 4,
  sm = 5,
  xs = 6
}) => {
  return (
    <>
      <Dropdown className={className}>
        <Dropdown.Toggle className="text-white" variant={variant}>
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: 'fit-content' }} className="p-0">
          {options &&
            options.map((op, index) => (
              <React.Fragment key={Math.random() * 100 * index}>
                <Dropdown.Item className={op.className} onClick={op.onclick}>
                  {op.title}
                </Dropdown.Item>
                <Dropdown.Divider className="m-0" />{' '}
              </React.Fragment>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DropDown;
