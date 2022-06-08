import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTestsOfStudentService } from '../../services/testService';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserService } from '../../services/authService';
import { editUserService } from '../../services/userService';

const TestList = () => {
  const [test, setTest] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [student, setStudent] = useState<any>();

  useEffect(() => {
    getTestsOfStudentService().then((res) => {
      console.log('data ', res.data)
      setTest(res.data);
    });
    getUserService().then((res) => {
      setStudent(res.data)
    })
  }, []);

  const handleEditUser = () => {
    editUserService(student._id, {
      name: student.name,
      email: student.email,
      age: student.age,
      dob: student.dob,
    })
    .then(() => {
      getTestsOfStudentService().then((res) => {
        console.log('data ', res.data)
        setTest(res.data);
      });
      getUserService().then((res) => {
        setStudent(res.data)
      })
      setModalVisible(false)
    })
    .catch((err) => console.log('err: ', err))
  }
  
  return (
    <>
      <div className="admin-homepage">
        <div className="admin-homepage__header">

          <button className="btn" onClick={() => setModalVisible(true)}>
            <span className="btn-text">Hồ sơ</span>
          </button>

        </div>
        <div className="card-body">
          {test?.map((item: any) => {
            return (
              <div className="containerr">
                <div className="card">
                  <div className="card-header test-list"></div>
                  <article className="card-content">
                    {
                      item?.question?.title && (
                        <h2 className="secondary-title manager">
                          {item?.question?.title}
                        </h2>
                      )
                    }
                    {
                      item?.deadline && (
                        <div className="text">Thời hạn: {item?.deadline}</div>
                      )
                    }
                    <div className="text">Hệ số: {item?.factor}</div>
                  </article>
                  <footer className="card-footer">
                    {
                      item?.question && (
                        <Link
                          to="/do-test"
                          state={{
                            testId: item._id,
                            questions: item?.question
                          }}
                        >
                          <button className="btn">
                            <span className="btn-text">Chi tiết</span>
                          </button>
                        </Link>
                      )
                    }
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal title="Chỉnh sửa" visible={modalVisible} onOk={() => handleEditUser()} onCancel={() => setModalVisible(false)}>
      <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }} >Tên</label>
          <input value={student?.name} onChange={(e) => setStudent({ ...student, name: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }} >Email</label>
          <input value={student?.email} onChange={(e: any) => setStudent({ ...student, email: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }} >Ngày sinh</label>
          <input value={student?.dob} onChange={(e: any) => setStudent({ ...student, dob: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }} >Tuổi</label>
          <input value={student?.age} onChange={(e: any) => setStudent({ ...student, age: e.target.value})}></input>
        </div>
      </Modal>
    </>
  );
};

export default TestList;
