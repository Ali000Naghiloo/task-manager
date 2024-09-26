import Select from 'react-select';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

const ComboBox = ({
  validate,
  errValueMin = false,
  validTrue = false,
  errmsgmin = '',
  errmsg = '',
  name = '',
  xs = 12,
  md = 6,
  xl = 6,
  label = '',
  options,
  onKeyDown,
  onBlur = () => { },
  defaultValue = {},
  onChange = () => { },
  validation,
  control = true,
  important = false,
  normal = true,
  isDisabled = false,
  isClearable = false,
  loading = false,
  selectedOption,
  optionValue = (option) => option.id,
  optionLabel = (option) => option.title,
  className = '',
  isMulti,
  placeHolder = 'انتخاب کنید . . .',
  errors,
  field
}) => {
  const { main } = useSelector((state) => state);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          validate,
          required: { value: validTrue, message: errmsg },
          minLength: { message: errmsgmin, value: errValueMin },
          ...validation
        }}
        render={({ field }) => (
          <>
            <Col className="" xs={xs} md={md} xl={xl}>
              <label
                className={`ms-3 mb-2 ${important && 'star'
                  }  align-items-center input-label input-label-sm lg:input-label-base`}>
                {label}
              </label>
              <div className="position-relative">
                <Select
                  isRtl
                  {...field}
                  placeholder={placeHolder}
                  isMulti={isMulti}
                  isLoading={loading || main?.showLoading?.value}
                  onKeyDown={onKeyDown}
                  isDisabled={isDisabled}
                  options={options}
                  isClearable={isClearable}
                  getOptionLabel={optionLabel}
                  getOptionValue={optionValue}
                  menuPortalTarget={document.body}
                  className={`${errors?.[name] ? 'border rounded border-danger' : ''}  select ${className}`}
                  loadingMessage={() => 'درحال بارگذاری'}
                  noOptionsMessage={() => 'موجود نیست'}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 })
                  }}
                />
                {errors?.[name] && (
                  <span className="position-absolute text-danger font12">
                    {errors?.[name]?.message}
                  </span>
                )}
              </div>
            </Col>
          </>
        )}
      />
    </>
  );
};

export default ComboBox;
