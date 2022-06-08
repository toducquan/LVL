import React, { useState, useEffect } from 'react';
import { getTeachersService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { addClassService } from '../../services/classService';

const AddClass = () => {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [hrm, setHrm] = useState();
  const [math, setMath] = useState();
  const [english, setEnglish] = useState();
  const [literature, setLiterature] = useState();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getTeachersService().then((res) => {
      setTeachers(res.data);
    });
  }, []);

  const handleSubmitForm = () => {
    console.log(name, hrm, math, english, literature)
    addClassService({
      name: name,
      hrm_id: hrm,
      math_id: math,
      english_id: english,
      literature_id: literature
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
            Tên lớp <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <p>Chọn giáo viên chủ nhiệm?</p>
          <select id="dropdown" name="role" className="form-control" onChange={(e: any) => setHrm(e.target.value)}>
            <option disabled selected hidden>Vui lòng chọn</option>
            {teachers.map((item: any) => {
              return <option value={item._id}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Chọn giáo viên toán?</p>
          <select id="dropdown" name="role" className="form-control" onChange={(e: any) => setMath(e.target.value)}>
            <option disabled selected hidden>Vui lòng chọn</option>
            {teachers.map((item: any) => {
              return <option value={item._id}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Chọn giáo viên tiếng anh?</p>
          <select id="dropdown" name="role" className="form-control" onChange={(e: any) => setEnglish(e.target.value)}>
            <option disabled selected hidden>Vui lòng chọn</option>
            {teachers.map((item: any) => {
              return <option value={item._id}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Chọn giáo viên văn?</p>
          <select id="dropdown" name="role" className="form-control" onChange={(e: any) => setLiterature(e.target.value)}>
            <option disabled selected hidden>Vui lòng chọn</option>
            {teachers.map((item: any) => {
              return <option value={item._id}>{item.name}</option>
            })}
          </select>
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

export default AddClass;
