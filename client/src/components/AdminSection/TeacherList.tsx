import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUserService, editUserService, getTeachersService } from '../../services/userService';
import { Button, Modal } from 'antd';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>();

  useEffect(() => {
    getTeachersService().then((res) => {
      setTeachers(res.data);
    });
  }, []);
  console.log(teachers)

  const handleSelectUser = (id: any) => {
    const teacher = teachers.find((item: any) => {
      return item._id == id;
    })
    setSelectedTeacher(teacher);
  }
  const handleEditUser = () => {
    editUserService(selectedTeacher._id, selectedTeacher)
    .then(() => {
      getTeachersService().then((res) => {
        setTeachers(res.data);
      });
      setModalVisible(false)
    })
    .catch((err) => console.log('err: ', err))
  }

  const handleDeleteUser = () => {
    deleteUserService(selectedTeacher._id)
    .then(() => {
      getTeachersService().then((res) => {
        setTeachers(res.data);
      });
    })
    .catch((err) => console.log('err: ', err))
  }
  return (
    <>
      <div className="admin-homepage__header">
        <Link to="/">
          <button className="btn">
            <span className="btn-text">Quay lại</span>
          </button>
        </Link>
        <Link to="/add-teacher">
          <button className="btn">
            <span className="btn-text">Thêm giáo viên</span>
          </button>
        </Link>
      </div>
      <table>
        <thead>
          <th>Mã</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Tuổi</th>
          <th>Ngày sinh</th>
          <th>Hành động</th>
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
                <td data-label="slg">
                  <Button type="primary" onClick={() => { handleSelectUser(item._id); setModalVisible(true) }}>Sửa</Button>
                  <Button type="primary" danger onClick={() => { handleSelectUser(item._id); handleDeleteUser()}}>
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal title="Chỉnh sửa" visible={modalVisible} onOk={() => handleEditUser()} onCancel={() => setModalVisible(false)}>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Tên</label>
          <input value={selectedTeacher?.name} onChange={(e) => setSelectedTeacher({ ...selectedTeacher, name: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Email</label>
          <input value={selectedTeacher?.email} onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Ngày sinh</label>
          <input value={selectedTeacher?.dob} onChange={(e) => setSelectedTeacher({ ...selectedTeacher, dob: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Tuổi</label>
          <input value={selectedTeacher?.age} onChange={(e) => setSelectedTeacher({ ...selectedTeacher, age: e.target.value})}></input>
        </div>
      </Modal>
    </>
  );
};

export default TeacherList;
