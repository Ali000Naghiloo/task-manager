import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { handleCheckAuth } from '../hooks/functions';
import Home from '../pages/home/Home';
import ShowProjects from '../pages/project/ShowProjects';
import CreateNote from '../pages/create-note/index';
import AllBoard from '../pages/boards/AllBoard';
import Board from '../pages/boards/Board';
import MyTasks from '../pages/tasks/MyTasks';
import Chat from '../pages/chat/Chat';

const PrivateRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let currentRoute = location?.pathname?.includes('/login');

    if (!handleCheckAuth() && !currentRoute) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<ShowProjects />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/allBoardForm/:id" element={<AllBoard />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/create-note" element={<CreateNote />} />
        {/* <Route  path='/reports' element={}/> */}
        {/* <Route
          path="/baseSubmitTaxReq"
          element={<BaseSubmitTaxReq keyState={key} reloadRoute={reloadRoute} pattern={pattern} />}
        />
        <Route path="/batchEntry" element={<BatchEntryPage />} /> */}
      </Routes>
    </>
  );
};

export default PrivateRoutes;
