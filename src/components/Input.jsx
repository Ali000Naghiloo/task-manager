import { ChangeEvent, EventHandler, FormEvent, useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

const Input = ({
  label = '',
  maxLength,
  checkedClickToShow = false,
  onChangeClickToShow = () => {},
  clickToShow = false,
  validTrue = false,
  showCharacter,
  validate,
  percent = false,
  editStyle = {},
  deleteStyle = {},
  setDeleteStyle,
  setEditStyle,
  isAbsentField,
  xs = 12,
  md = 12,
  xl = 6,
  xxl = 6,
  rest,
  errors,
  addProps = false,
  placeholder = '',
  ltr = false,
  control,
  defaultValue,
  format,
  ref,
  onChange,
  minLength = 1,
  length_num = 50,
  value,
  type = 'text',
  name = '',
  pattern = '',
  className = '',
  // id = "",
  validation,
  currency = false,
  disabled = false,
  important = false,
  normal = true,
  dotCount = 11,
  errmsg = '',
  errmsgmin = '',
  isREQtest,
  errminimum
}) => {
  return (
    <>
      <Col xxl={xxl} xs={xs} md={md} xl={xl}>
        <Controller
          name={name}
          control={control ? control : null}
          rules={{
            validate,
            required: { value: validTrue, message: errmsg },
            minLength: { message: errmsgmin, value: errminimum },
            ...validation
          }}
          render={({ field }) => (
            <>
              {/* <div className={`positionRelative`}> */}
              <Form.Label
                className={`d-flex ms-3 text-start justify-content-start ${important && 'star'}  align-items-center`}>
                {label}
              </Form.Label>
              <div className="position-relative">
                <span className="bg-danger">
                  <Form.Control
                    placeholder={placeholder}
                    errmsgmin={errmsgmin}
                    errminimum={errminimum}
                    errmsg={errmsg}
                    minLength={minLength}
                    type={type === 'password' ? 'password' : 'text'}
                    value={field.value}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    name={field.name}
                    maxLength={maxLength}
                    disabled={disabled}
                    {...rest}
                    //   onKeyDown={handleKeyPress}
                    onChange={(e) =>
                      currency || type === 'number' || type === 'character'
                        ? handleChange(e, field)
                        : field.onChange(e)
                    }
                    onInput={(e) => {
                      type === 'number' &&
                        !currency &&
                        (e.target.value = e.target.value.replace(/[^\d.]/g, ''));
                    }}
                    className={`input-form ${ltr ? ' dir-ltr ' : ''} ${className} ${
                      errors?.[name] && 'border border-danger'
                    } `}
                  />
                  {addProps && (
                    <span className="fitShowPass d-flex">
                      <i
                        className={` ms-2 ${
                          deleteStyle
                            ? ' test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill fa-disabled'
                            : 'cursorPointer'
                        }  test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill `}
                        onClick={setDeleteStyle}
                        aria-disabled
                      />
                      <i
                        onClick={setEditStyle}
                        className={` ms-2 ${
                          editStyle
                            ? ' test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill bi bi-plus-circle-fill '
                            : 'bi bi-pencil-square cursorPointer'
                        } test-white d-flex  align-items-center justify-content-start font20 fw-bold cursorPointer  rounded-pill`}
                      />
                    </span>
                  )}
                  {percent && <span className="fitShowPass d-flex">%</span>}
                  {clickToShow && (
                    <span className="fitShowPass d-flex">
                      <Form.Check
                        className="cursorPointer"
                        checked={checkedClickToShow}
                        onChange={onChangeClickToShow}
                      />
                    </span>
                  )}
                  {showCharacter && (
                    <>
                      <span className="fitShowPass d-flex">
                        <i
                          className={` ms-2 ${
                            editStyle
                              ? ' test-white bi bi-eye-fill d-flex align-items-center justify-content-start font20 cursorPointer fw-bold  rounded-pill'
                              : 'cursorPointer'
                          }  test-white d-flex align-items-center justify-content-start font20 fw-bold rounded-pill `}
                          onClick={setEditStyle}
                        />
                      </span>
                    </>
                  )}
                </span>
                {errors?.[name] && (
                  <div className="position-absolute text-danger font12">
                    {errors?.[name]?.message}
                  </div>
                )}
              </div>
            </>
          )}
        />
      </Col>
    </>
  );
};

export default Input;
