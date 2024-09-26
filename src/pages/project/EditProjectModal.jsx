import React from 'react';
import { Container, Form, Modal, Row } from 'react-bootstrap';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import Btn from '../../components/Btn';
import { RsetShowCreateModal } from '../../hooks/slices/boardSlice';
import { useDispatch, useSelector } from 'react-redux';

const EditProjectModal = ({ showEditProject, setShowEditProject, itemEditProject }) => {
  const { board } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });

  const handleAcceptEditProject = async (data) => {
    console.log(data);
    setShowEditProject(false);
    const postData = {
      id: itemEditProject?.item?.id,
      name: data?.projectName,
      description: '',
      dueDateTime: 'time',
      projectPriority: 0,
      projectStatus: 0,
      projectType: 0,
      sprintNumber: 0,
      projectAssignedUsersViewModel: [
        {
          userId: '',
          projectRoles: [
            {
              projectRole: 0
            }
          ]
        }
      ],
      attachmentEditViewModels: [
        {
          id: '',
          fileName: '',
          filePath: '',
          uploadDate: '',
          attachCreatorId: ''
        }
      ]
    };
  };

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showEditProject}
        onHide={() => setShowEditProject(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-white text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ویرایش پروژه
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Datepicker name="dueDateTime" label="تاریخ شروع:" control={control} />
                <Datepicker name="endDateTime" label="تاریخ پایان:" control={control} />
                <ComboBox name="projectPriority" control={control} label="اولویت:" />
                <ComboBox name="projectStatus" control={control} label="وضعیت:" />
                <ComboBox name="projectType" control={control} label="نوع:" />
                <Row className="mt-4">
                  <SwitchCase name="sprintNumber" range label="سرعت پروژه:" />
                </Row>
                <Row>
                  <ComboBox xl={6} control={control} label="اختصاص به:" />
                </Row>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Form.Label className="mt-4 d-flex ">توضیحات:</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </>
                  )}
                />
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="outline-warning" title="لغو" onClick={() => setShowEditProject(false)} />
          <Btn
            variant="outline-primary"
            title="تایید"
            onClick={handleSubmit((data) => handleAcceptEditProject(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProjectModal;
