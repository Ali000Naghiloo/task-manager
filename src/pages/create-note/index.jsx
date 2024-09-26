import React, { useState } from 'react';
import Btn from '../../components/Btn';
import { useDispatch } from 'react-redux';
import { RsetShowCreateModal } from '../../hooks/slices/boardSlice';
import CreateBoardModal from './CreateBoardModal';
import CreateProjectModal from './CreateProjectModal';
import CreateTasks from '../tasks/CreateTasks';
import { Form } from 'react-bootstrap';

const CreateNote = () => {
  const dispatch = useDispatch();
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  return (
    <div className="w-100 min_Height_100 d-flex flex-column align-items-center gap-4 flex-wrap p-4 pb-0">
      <div className="w-100 h-100 d-flex justify-content-center">
        <Form.Control placeholder="یادداشت خود را وارد کنید..." className="w-50" />
      </div>

      {showCreateBoardModal && (
        <CreateBoardModal
          showCreateBoardModal={showCreateBoardModal}
          setShowCreateBoardModal={setShowCreateBoardModal}
        />
      )}

      {showCreateIssuesModal && (
        <CreateTasks
          showCreateIssuesModal={showCreateIssuesModal}
          setShowCreateIssuesModal={setShowCreateIssuesModal}
        />
      )}

      {showCreateProjectModal && (
        <CreateProjectModal
          showCreateProjectModal={showCreateProjectModal}
          setShowCreateProjectModal={setShowCreateProjectModal}
          //debug
          setSprintNum={(value) => console.log(value)}
        />
      )}
    </div>
  );
};

export default CreateNote;
