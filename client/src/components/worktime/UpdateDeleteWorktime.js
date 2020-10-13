import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button, Col, Spinner } from 'react-bootstrap';

import Modal from '../Modal';
import { hmToMS, periodSansPause } from '../../services/time';
import {
  updateWorktime,
  deleteWorktime
} from '../../store/worktime/worktimeAction';
import {
  updateWorktimeLoading,
  deleteWorktimeLoading
} from '../../store/worktime/worktimeSelector';

const UpdateDeleteWorktime = ({ close, open, worktime }) => {
  const dispatch = useDispatch();
  const [project, setProject] = useState('');
  const [start, setStart] = useState('00:00');
  const [pause, setPause] = useState('00:00');
  const [end, setEnd] = useState('00:00');
  const [comment, setComment] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const isFirstRun = useRef(false);

  useEffect(() => {
    if (isFirstRun.current) {
      setProject(worktime.project);
      setStart(worktime.start);
      setPause(worktime.pause);
      setEnd(worktime.end);
      setComment(worktime.comment);
    } else {
      isFirstRun.current = true;
    }
  }, [worktime]);

  const updateWorktimeLoadingSelector = useSelector(updateWorktimeLoading);
  const deleteWorktimeLoadingSelector = useSelector(deleteWorktimeLoading);

  const onSubmit = () => {
    dispatch(
      updateWorktime(
        {
          _id: worktime._id,
          date: worktime.date,
          project,
          start,
          pause,
          end,
          comment
        },
        close
      )
    );
  };

  const onDelete = () => {
    dispatch(deleteWorktime(worktime._id, close));
  };

  const onProjectChange = (e) => {
    setProject(e.target.value);
  };

  const onStartChange = (e) => {
    setStart(e.target.value);
  };

  const onPauseChange = (e) => {
    setPause(e.target.value);
  };

  const onEndChange = (e) => {
    setEnd(e.target.value);
  };

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const afterStart = () => hmToMS(end) > hmToMS(start);

  const smallerPeriod = () => {
    return !afterStart() ? true : periodSansPause(end, start, pause) > 59999;
  };

  return (
    <Modal open={open} close={close}>
      <Form>
        <Form.Group controlId="project">
          <Form.Label>Project</Form.Label>
          <Form.Control as="select" value={project} onChange={onProjectChange}>
            <option value="">Choose...</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </Form.Control>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="start">
            <Form.Label>Start</Form.Label>
            <Form.Control type="time" value={start} onChange={onStartChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="end">
            <Form.Label>End</Form.Label>
            <Form.Control
              type="time"
              value={end}
              onChange={onEndChange}
              name="end"
              ref={register({ validate: afterStart })}
            />
            {errors.end && <span className="text-danger">Must be later!</span>}
          </Form.Group>

          <Form.Group as={Col} controlId="pause">
            <Form.Label>Pause</Form.Label>
            <Form.Control
              type="time"
              value={pause}
              onChange={onPauseChange}
              name="pause"
              ref={register({ validate: smallerPeriod })}
            />
            {errors.pause && (
              <span className="text-danger">Must be shorter!</span>
            )}
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            value={comment}
            onChange={onCommentChange}
          />
        </Form.Group>

        <hr />

        <Button variant="primary" onClick={handleSubmit(onSubmit)} size="sm">
          {updateWorktimeLoadingSelector && (
            <Spinner animation="border" size="sm" />
          )}{' '}
          Update <span className="icon-spinner11"></span>
        </Button>

        <Button
          variant="danger"
          onClick={onDelete}
          size="sm"
          style={{ margin: '0 9px' }}
        >
          {deleteWorktimeLoadingSelector && (
            <Spinner animation="border" size="sm" />
          )}{' '}
          Delete <span className="icon-bin2"></span>
        </Button>

        <Button variant="secondary" onClick={close} size="sm">
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateDeleteWorktime;
