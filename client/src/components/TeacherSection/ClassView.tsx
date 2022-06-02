import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStudentInClassService } from '../../services/userService';
import { createGradeService } from '../../services/testService'
import { Modal } from 'antd';
const ClassView = () => {
  const [students, setStudents] = useState([]);
  const [factor, setFactor] = useState();
  const [data, setData] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const location = useLocation();
  const { isManager, classId }: any = location.state;

  const [count, setCount] = useState({
    excellent: 0,
    fairly: 0,
    medium: 0,
    weak: 0
  })
  console.log(students)
  useEffect(() => {
    getStudentInClassService(classId).then((res) => {
      console.log(res.data)
      setStudents(res.data.data);
      setCount({
        excellent: res.data.excellent,
        fairly: res.data.fairly,
        medium: res.data.medium,
        weak: res.data.weak
      })
    });
  }, []);

  const handleOk = () => {
    createGradeService({
      class_id: classId,
      factor: Number(factor),
      data: data
    }).then(() => {
      getStudentInClassService(classId).then((res) => {
        setStudents(res.data.data);
        setCount({
          excellent: res.data.excellent,
          fairly: res.data.fairly,
          medium: res.data.medium,
          weak: res.data.weak
        })
        setModalVisible(false)
      });
    })
  }

  const handleData = (id: any, value: any) => {
    setData([...data, {
      id: id,
      grade: Number(value)
    }])
  }

  return (
    <>
      <div className="admin-homepage__header">
        <Link to="/">
          <button className="btn">
            <span className="btn-text">Back</span>
          </button>
        </Link>
        {isManager && (
          <Link to="/add-student" state={{ classId: classId }}>
            <button className="btn">
              <span className="btn-text">Add Student</span>
            </button>
          </Link>
        )}
      </div>
      <table>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Dob</th>
          <th>Total point</th>
        </thead>
        <tbody>
          {students?.map((item: any) => {
            return (
              <tr>
                <td data-label="name">{item.name}</td>
                <td data-label="war">{item.email}</td>
                <td data-label="ba">{item.age}</td>
                <td data-label="obp">{item.dob}</td>
                <td data-label="slg">{item.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="admin-homepage__header">
        <button className="btn" onClick={() => setModalVisible(true)}>
          <span className="btn-text">Add grade</span>
        </button>
        <button className="btn" onClick={() => setModalDetailVisible(true)}>
          <span className="btn-text">View Detail</span>
        </button>
      </div>
      <Modal title="Add grade" visible={modalVisible} onOk={handleOk} onCancel={() => setModalVisible(false)}>
        <p>Name</p>
        <input></input>
        <p>Factor</p>
        <input onChange={(e: any) => setFactor(e.target.value)}></input>
        {
          students.map((item: any) => {
            return (
              <div className='grade-div'>
                <label style={{ display: "inline-block", width: 215 }}>{item.name}</label>
                <input onChange={(e) => handleData(item._id, e.target.value)}></input>
              </div>
            )
          })
        }
      </Modal>
      <Modal title="Detail" visible={modalDetailVisible} onOk={() => setModalDetailVisible(false)} onCancel={() => setModalDetailVisible(false)}>
        <p>Excellent: {Math.ceil(count.excellent * 100 / (count.excellent + count.medium + count.fairly + count.weak))}%</p>
        <p>Fairy: {Math.ceil(count.fairly * 100 / (count.excellent + count.medium + count.fairly + count.weak))}%</p>
        <p>Medium: {Math.ceil(count.medium * 100 / (count.excellent + count.medium + count.fairly + count.weak))}%</p>
        <p>Weak: {Math.ceil(count.weak * 100 / (count.excellent + count.medium + count.fairly + count.weak))}%</p>
      </Modal>
    </>
  );
};

export default ClassView;
