import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeachersService } from '../../services/userService';
import { getAllClassOfTeacher } from '../../services/classService';
import { getUserService } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';

const HomePageTeacher = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllClassOfTeacher().then((res) => {
      setClasses(res.data);
    });
    getTeachersService().then((res) => {
      setTeachers(res.data);
    });
    getUserService().then((res) => {
      setTeacher(res.data)
    })
  }, []);

  console.log(user)

  const getNameViaId = (id: any) => {
    const teacher: any = teachers.find((item: any) => item?._id == id);
    return teacher?.name;
  };

  const classWithTacherName = classes.map((item: any) => {
    return {
      _id: item?._id,
      name: item?.name,
      hrm_id: item?.hrm_id,
      hrm: getNameViaId(item?.hrm_id),
      math: getNameViaId(item?.math_id),
      english: getNameViaId(item?.english_id),
      literature: getNameViaId(item?.literature_id),
    };
  });

  return (
    <>
      <div className="admin-homepage">
        <div className="admin-homepage__header">

          <button className="btn" onClick={() => setModalVisible(true)}>
            <span className="btn-text">Teacher Information</span>
          </button>

          <Link to="/test-list">
            <button className="btn">
              <span className="btn-text">Test List</span>
            </button>
          </Link>
        </div>
        <div className="card-body">
          {classWithTacherName.map((item: any) => {
            return (
              <div className="containerr">
                <div className="card">
                  <div className="card-header"></div>

                  <article className="card-content">
                    <h2 className="secondary-title manager">
                      Class: {item.name}
                      {teacher._id = item.hrm_id && (<span>(Manager)</span>)}
                    </h2>
                    <div className="text">Manager Teacher: {item.hrm}</div>
                    <div className="text">Math Teacher: {item.math}</div>
                    <div className="text">English Teacher: {item.english}</div>
                    <div className="text">
                      Literature Teacher: {item.literature}
                    </div>
                  </article>
                  <footer className="card-footer">
                    <Link
                      to="/view-class"
                      state={{
                        isManager: true,
                        classId: item._id,
                      }}
                    >
                      <button className="btn">
                        <span className="btn-text">View class</span>
                      </button>
                    </Link>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal title="Add grade" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Name</label>
          <input value={user.name}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Email</label>
          <input value={user.email}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Dob</label>
          <input value={user.dob}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Age</label>
          <input value={user.age}></input>
        </div>
      </Modal>
    </>
  );
};

export default HomePageTeacher;
