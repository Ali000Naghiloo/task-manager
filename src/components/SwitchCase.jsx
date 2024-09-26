import { Container, Row } from 'react-bootstrap';
import FormRange from 'react-bootstrap/FormRange';
import React, { ChangeEvent, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

const SwitchCase = ({
  range,
  normal = true,
  label,
  name,
  checked,
  onChecked,
  className,
  control,
  onChange,
  value,
  radioType = false,
  min,
  max,
  disabled
}) => {
  return (
    <>
      {range ? (
        <>
          <label htmlFor={name} className="my-2 font15 me-2 px-2">
            {label}
            {value}
          </label>
          <Col className=" d-flex align-items-end">
            <Controller
              disabled={disabled}
              name={name}
              control={control}
              render={({ field }) => <FormRange name={name} min={min} max={max} {...field} />}
            />
          </Col>
        </>
      ) : radioType ? (
        <Col className=" d-flex align-items-end">
          <label className="">{label} </label>
          <Form.Check type="radio" aria-label="radio 1" checked={checked} onChange={onChecked} />
        </Col>
      ) : control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Col className=" d-flex align-items-end">
              <Form.Check
                className={`d-flex justify-content-center mb-1 cursorPointer ${className}`}
                color="#00000"
                width={400}
                {...field}
                id={name}
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <label htmlFor={name} className="px-2">
                {label}
              </label>
            </Col>
          )}
        />
      ) : (
        <Col className=" d-flex align-items-end">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Form.Check
                {...field}
                className={className}
                inline
                label={label}
                name="group1"
                type="checkbox"
              />
            )}
          />
        </Col>
      )}
    </>
  );
};

export default SwitchCase;
