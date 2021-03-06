import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { editUserService, getTeachersService } from '../../services/userService';
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

  const handleEditUser = () => {
    editUserService(teacher._id, {
      name: teacher.name,
      email: teacher.email,
      age: teacher.age,
      dob: teacher.dob,
    })
    .then(() => {
      getAllClassOfTeacher().then((res) => {
        setClasses(res.data);
      });
      getTeachersService().then((res) => {
        setTeachers(res.data);
      });
      getUserService().then((res) => {
        setTeacher(res.data)
      })
      setModalVisible(false)
    })
    .catch((err) => console.log('err: ', err))
  }


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
            <span className="btn-text">H??? s??</span>
          </button>

          <Link to="/test-list">
            <button className="btn">
              <span className="btn-text">Danh s??ch b??i test</span>
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
                      T??n l???p: {item.name}
                    </h2>
                    <div className="text">GV ch??? nhi???m: {item.hrm}</div>
                    <div className="text">GV to??n: {item.math}</div>
                    <div className="text">GV ti???ng anh: {item.english}</div>
                    <div className="text">
                    GV v??n: {item.literature}
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
                        <span className="btn-text">Chi ti???t</span>
                      </button>
                    </Link>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal title="Ch???nh s???a" visible={modalVisible} onOk={() => handleEditUser()} onCancel={() => setModalVisible(false)}>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }} >T??n</label>
          <input value={teacher?.name} onChange={(e) => setTeacher({ ...teacher, name: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }} >Email</label>
          <input value={teacher?.email} onChange={(e: any) => setTeacher({ ...teacher, email: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }} >Ng??y sinh</label>
          <input value={teacher?.dob} onChange={(e: any) => setTeacher({ ...teacher, dob: e.target.value})}></input>
        </div>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }} >Tu???i</label>
          <input value={teacher?.age} onChange={(e: any) => setTeacher({ ...teacher, age: e.target.value})}></input>
        </div>
      </Modal>
    </>
  );
};

export default HomePageTeacher;
