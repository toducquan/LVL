import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeachersService } from '../../services/userService';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    getTeachersService().then((res) => {
      setTeachers(res.data);
    });
  }, []);
  console.log(teachers)
  return (
    <>
      <div className="admin-homepage__header">
        <Link to="/">
          <button className="btn">
            <span className="btn-text">Back</span>
          </button>
        </Link>
        <Link to="/add-teacher">
          <button className="btn">
            <span className="btn-text">Add Teacher</span>
          </button>
        </Link>
      </div>
      <table>
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Dob</th>
        </thead>
        <tbody>
          {teachers.map((item: any) => {
            return (
              <tr>
                <td data-label="name">{item._id}</td>
                <td data-label="war">{item.name}</td>
                <td data-label="ba">{item.email}</td>
                <td data-label="obp">{item.age}</td>
                <td data-label="slg">{item.dob}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TeacherList;
