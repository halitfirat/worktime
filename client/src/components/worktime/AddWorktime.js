import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button, Col, Spinner } from 'react-bootstrap';

import Modal from '../Modal';
import { hmToMS, periodSansPause } from '../../services/time';
import { addWorktime } from '../../store/worktime/worktimeAction';
import { addWorktimeLoading } from '../../store/worktime/worktimeSelector';

const AddWorktime = ({ date, open, close }) => {
  const dispatch = useDispatch();
  const [project, setProject] = useState();
  const [start, setStart] = useState();
  const [pause, setPause] = useState();
  const [end, setEnd] = useState();
  const [comment, setComment] = useState();
  const { register, handleSubmit, errors } = useForm();

  const addWorktimeLoadingSelector = useSelector(addWorktimeLoading);

  useEffect(() => {
    setProject('');
    setStart('00:00');
    setPause('00:00');
    setEnd('00:00');
    setComment('');
  }, [close]);

  const onSubmit = () => {
    dispatch(
      addWorktime(
        {
          date,
          project,
          start,
          pause,
          end,
          comment
        },
        close
      )
    );
    setComment('');
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
    <Modal open={open} onClose={close}>
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

        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          size="sm"
          style={{ marginRight: '9px' }}
        >
          {addWorktimeLoadingSelector && (
            <Spinner animation="border" size="sm" />
          )}{' '}
          Add{' '}
          <span>
            <span style={{ fontSize: '2px' }}  className="icon-plus"></span>
          </span>
        </Button>

        <Button variant="secondary" onClick={close} size="sm">
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};

export default AddWorktime;
