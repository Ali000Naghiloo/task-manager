import React, { ChangeEvent, ChangeEventHandler, FC, FormEvent, useEffect, useState } from 'react';
import { Button, Container, Card, Form, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input';
import Btn from '../../components/Btn';
import logo from '../../assets/hostcolor2000-300x300.jpg';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import { handleGetUserToken } from '../../hooks/functions';

const Auth = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState('login');

  const setLogin = () => {
    setCurrentForm('login');
  };
  const setSignup = () => {
    setCurrentForm('signup');
  };
  const setForgotPassword = () => {
    setCurrentForm('forgotPassword');
  };

  // useEffect(() => {
  //   if (isMobile) {
  //     setOpratingSystem(osName);
  //   } else if (isTablet) {
  //     setOpratingSystem(isTablet);
  //   } else {
  //     setOpratingSystem(window.navigator.platform);
  //   }
  // }, []);

  useEffect(() => {
    if (handleGetUserToken()) {
      return navigate('/users/home');
    }
  }, [location]);

  if (currentForm === 'login') {
    return <Login setSignup={setSignup} setForgotPassword={setForgotPassword} />;
  } else if (currentForm === 'signup') {
    return <Signup setLogin={setLogin} setForgotPassword={setForgotPassword} />;
  } else if (currentForm === 'forgotPassword') {
    return <ForgotPassword setLogin={setLogin} setSignup={setSignup} />;
  } else {
    return <Login />;
  }
};

export default Auth;
