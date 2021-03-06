import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { deleteUserService, editUserService, getStudentInClassService } from '../../services/userService';
import { createGradeService } from '../../services/testService'
import { Button, Modal } from 'antd';
const ClassView = () => {
  const [students, setStudents] = useState([]);
  const [factor, setFactor] = useState();
  const [data, setData] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditStudent, setModalEditStudent] = useState(false);
  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const location = useLocation();
  const { isManager, classId }: any = location.state;
  const [selectedStudent, setSelectedStudent] = useState<any>();

  const [count, setCount] = useState({
    excellent: 0,
    fairly: 0,
    medium: 0,
    weak: 0
  })
  console.log(students)
  useEffect(() => {
    getStudentInClassService(classId).then((res) => {
      setStudents(res.data.data);
      setCount({
        excellent: res.data.excellent,
        fairly: res.data.fairly,
        medium: res.data.medium,
        weak: res.data.weak
      })
    });
  }, []);

  const handleSelectUser = (id: any) => {
    const student = students.find((item: any) => {
      return item._id == id;
    })
    setSelectedStudent(student);
  }
  const handleEditUser = () => {
    editUserService(selectedStudent._id, selectedStudent)
    .then(() => {
      getStudentInClassService(classId).then((res) => {
        setStudents(res.data.data);
        setCount({
          excellent: res.data.excellent,
          fairly: res.data.fairly,
          medium: res.data.medium,
          weak: res.data.weak
        })
      });
      setModalEditStudent(false)
    })
    .catch((err) => console.log('err: ', err))
  }

  const handleDeleteUser = () => {
    console.log('vao: ', selectedStudent);
    deleteUserService(selectedStudent._id)
    .then(() => {
      getStudentInClassService(classId).then((res) => {
        setStudents(res.data.data);
        setCount({
          excellent: res.data.excellent,
          fairly: res.data.fairly,
          medium: res.data.medium,
          weak: res.data.weak
        })
      });
    })
    .catch((err) => console.log('err: ', err))
  }

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
            <span className="btn-text">Quay l???i</span>
          </button>
        </Link>
        {isManager && (
          <Link to="/add-student" state={{ classId: classId }}>
            <button className="btn">
              <span className="btn-text">Th??m h???c sinh</span>
            </button>
          </Link>
        )}
      </div>
      <table>
        <thead>
          <th>H??? t??n</th>
          <th>Email</th>
          <th>Tu???i</th>
          <th>Ng??y sinh</th>
          <th>??i???m trung b??nh</th>
          <th>H??nh ?????ng</th>
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
                <td data-label="slg">
                  <Button type="primary" onClick={() => { handleSelectUser(item._id); setModalEditStudent(true) }}>S???a</Button>
                  <Button type="primary" danger onClick={() => { handleSelectUser(item._id); handleDeleteUser()}}>
                    X??a
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="admin-homepage__header">
        <button className="btn" onClick={() => setModalVisible(true)}>
          <span className="btn-text">Nh???p ??i???m</span>
        </button>
        <button className="btn" onClick={() => setModalDetailVisible(true)}>
          <span className="btn-text">Th???ng k??</span>
        </button>
      </div>
      <Modal title="Th??m ??i???m" visible={modalVisible} onOk={handleOk} onCancel={() => setModalVisible(false)}>
        <p>M??n h???c</p>
        <input></input>
        <p>H??? s???</p>
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
        <p>T??? l??? h???c sinh gi???i: {Math.ceil(count.excellent * 100 / (count.excellent + count.medium + count.fairly + count.weak))}%</p>
        <p>T??? l??? h???c sinh kh??: {Math.ceil(count.fairly * 100 / (count.excellent + count.medium + count.fairly + count.weak))}%</p>
        <p>T??? l??? h???c sinh trung b??nh: {Math.ceil(count.medium * 100 / (count.excellent + count.medium + count.fairly + count.weak))}%</p>
        <p>T??? l??? h???c sinh y???u: {Math.ceil(count.weak * 100 / (count.excellent + count.medium + count.fairly + count.weak))}%</p>
      </Modal>
      <Modal title="Ch???nh s???a" visible={modalEditStudent} onOk={() => handleEditUser()} onCancel={() => setModalVisible(false)}>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>T??n</label>
          <input value={selectedStudent?.name} onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Email</label>
          <input value={selectedStudent?.email} onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Ng??y sinh</label>
          <input value={selectedStudent?.dob} onChange={(e) => setSelectedStudent({ ...selectedStudent, dob: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Tu???i</label>
          <input value={selectedStudent?.age} onChange={(e) => setSelectedStudent({ ...selectedStudent, age: e.target.value})}></input>
        </div>
      </Modal>
    </>
  );
};

export default ClassView;
