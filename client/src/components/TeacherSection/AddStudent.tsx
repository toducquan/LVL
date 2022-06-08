import React, { useState } from 'react';
import { addTeachersService } from '../../services/userService';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AddStudent = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const { classId }: any = location.state;
  console.log('vao: ', classId)
  const handleSubmitForm = () => {
    addTeachersService({
      name: name,
      email: email,
      password: password,
      age: age,
      role: 3,
      dob: dob,
      classId: classId,
    })
      .then(() => {
        return navigate('/');
      })
      .catch((err) => console.log('err ', err));
  };

  return (
    <div className="add-teacher">
      <form id="survey-form">
        <div className="form-group">
          <label id="name-label" >
            Họ và tên <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id="email-label" >
            Email<span>*</span>
          </label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label id="email-label" >
            Mật khẩu<span>*</span>
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label id="email-label">
            Tuổi<span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label id="email-label" >
            Ngày sinh<span>*</span>
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
          Gửi
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
