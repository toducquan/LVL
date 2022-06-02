import React, { useState } from 'react';
import { addTeachersService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmitForm = () => {
    addTeachersService({
      name: name,
      email: email,
      password: password,
      age: 23,
      role: 2,
      dob: dob,
    })
      .then(() => {
        return navigate('/teacher');
      })
      .catch((err) => console.log('err ', err));
  };

  return (
    <div className="add-teacher">
      <form id="survey-form">
        <div className="form-group">
          <label id="name-label">
            Name <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id="email-label">
            Email<span>*</span>
          </label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label id="email-label">
            Password<span>*</span>
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label id="email-label">
            Age<span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label id="email-label">
            Date of birth<span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div
          className="form-group submit-button"
          onClick={() => handleSubmitForm()}
        >
          Submit
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
