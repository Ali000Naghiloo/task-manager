import React, { useState } from 'react';
import { Button, Container, Card, Form, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input';
import Btn from '../../components/Btn';
import { login } from '../../services/masterServices';
import logo from '../../assets/hostcolor2000-300x300.jpg';
import { RsetShowLoading } from '../../hooks/slices/main';
import asyncWrapper from '../../utils/asyncWrapper';

export default function Login({ setSignup, setForgotPassword }) {
  const [showPass, setShowPass] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isMobile) {
  //     setOpratingSystem(osName);
  //   } else if (isTablet) {
  //     setOpratingSystem(isTablet);
  //   } else {
  //     setOpratingSystem(window.navigator.platform);
  //   }
  // }, []);

  const submitData = asyncWrapper(async (data) => {
    const postData = {
      userName: data?.userName,
      password: data?.password
    };
    dispatch(RsetShowLoading({ value: true, btnName: 'login' }));
    const res = await login(postData);
    console.log(res);
    dispatch(RsetShowLoading({ value: false }));
    if (res?.data?.code === 1) {
      localStorage.setItem('tokenId', res?.data?.jwtToken);
      navigate('/users/home');
    }
  });

  return (
    <Container fluid className="vh-100">
      <Row className="vh-100">
        <div className="d-flex  bg-white  justify-content-center align-items-center">
          <Col
            xs="12"
            sm="9"
            md="7"
            lg="6"
            xl="4"
            className="bg_transe shadow  mx-auto my-auto p-4 rounded-4 ">
            <form className="justify-content-center">
              <title className="w-100 d-flex justify-content-center my-3">
                <h3>ورود</h3>
              </title>

              <div className="d-flex flex-column gap-3">
                {/* <div className="d-flex  justify-content-center">
                  <Link className="" to="/">
                    <img
                      width={100}
                      height={100}
                      className="cursorPointer imageLogin"
                      src={String(logo)}
                    />
                  </Link>
                </div> */}
                <Input
                  errors={errors}
                  xxl={12}
                  xl={12}
                  errmsg="لطفا نام کاربری خود را وارد کنید"
                  label=":نام کاربری"
                  validation={{
                    required: 'لطفا نام کاربری را وارد کنید',
                    minLength: {
                      message: 'نام کاربری باید بیشتر از 2 حرف باشد',
                      value: 2
                    }
                  }}
                  control={control}
                  name="userName"
                  // // errors={errors}
                  important
                  className="py-2"
                  length_num={20}
                />
                <Input
                  errmsg="لطفا رمز عبور خود را وارد کنید"
                  // setEditStyle={() => {
                  //   setShowPass(!showPass);
                  // }}
                  // showCharacter
                  errors={errors}
                  label=":رمز عبور"
                  xxl={12}
                  xl={12}
                  important
                  validation={{
                    required: 'لطفا رمز عبور خود را وارد کنید',
                    minLength: {
                      message: 'رمز عبور خود باید بیشتر از 4 حرف باشد',
                      value: 4
                    }
                  }}
                  name="password"
                  control={control}
                  type={showPass ? 'text' : 'password'}
                  className="py-2"
                />
              </div>
              <Col sm="12" md="12" xl="12">
                <Btn
                  xl={12}
                  title="ورود"
                  onClick={handleSubmit((data) => submitData(data))}
                  loadingName="login"
                  className="mt-4 border bgDarkPrimary border-none text-white  py-2 fs-6  rounded-4 w-100 p-2"
                />
              </Col>
              <Row className="mt-4">
                <Col sm="12" md="12" xl="12">
                  <p className="">
                    <div
                      className="text-primary cursorPointer font12 d-flex justify-content-end  text-decoration-none"
                      onClick={setForgotPassword}>
                      رمز خود را فراموش کرده اید؟
                    </div>
                  </p>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col sm="12" md="12" xl="12" className="">
                  <p className="font12 d-flex align-items-center justify-content-center">
                    هنوز ثبت نام نکرده اید؟
                    <div className="text-decoration-none">
                      <span
                        className="cursorPointer text-primary me-1 text-primary"
                        onClick={setSignup}>
                        ثبت نام{' '}
                      </span>
                    </div>
                  </p>
                </Col>
              </Row>
            </form>
          </Col>
        </div>
      </Row>
    </Container>
  );
}
