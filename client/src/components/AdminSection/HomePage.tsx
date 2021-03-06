import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteClassService, editClassService, getAllClassService } from '../../services/classService';
import { getTeachersService } from '../../services/userService';
import '../css/adminHomePage.css';

const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>();

  useEffect(() => {
    getAllClassService().then((res) => {
      setClasses(res.data);
    });
    getTeachersService().then((res) => {
      setTeachers(res.data);
    });
  }, []);
  console.log("hehe", teachers)

  const handleSelectClass = (id: any) => {
    const classs = classes.find((item: any) => {
      return item._id == id;
    })
    setSelectedClass(classs);
  }

  const handleEditClass = () => {
    editClassService(selectedClass._id, selectedClass)
    .then(() => {
      getAllClassService().then((res) => {
        setClasses(res.data);
      });
      setModalVisible(false)
    })
    .catch((err) => console.log('err: ', err))
  }

  const handleDeleteClass = () => {
    console.log(selectedClass?._id);
    deleteClassService(selectedClass._id)
    .then(() => {
      getAllClassService().then((res) => {
        setClasses(res.data);
      });
    })
    .catch((err) => console.log('err: ', err))
  }

  const getNameViaId = (id: any) => {
    const teacher: any = teachers.find((item: any) => item?._id == id);
    return teacher?.name;
  };

  const classWithTacherName = classes.map((item: any) => {
    return {
      _id: item._id,
      name: item?.name,
      hrm: getNameViaId(item?.hrm_id),
      math: getNameViaId(item?.math_id),
      english: getNameViaId(item?.english_id),
      literature: getNameViaId(item?.literature_id),
    };
  });

  console.log(classWithTacherName);

  return (
    <>
      <div className="admin-homepage">
        <div className="admin-homepage__header">
          <Link to="/add-class">
            <button className="btn">
              <span className="btn-text">Th??m l???p</span>
            </button>
          </Link>
          <Link to="/teacher">
            <button className="btn">
              <span className="btn-text">D/s gi??o vi??n</span>
            </button>
          </Link>
        </div>
        <div className="card-body">
          {classWithTacherName.map((item) => {
            return (
              <div className="containerr">
                <div className="card">
                  <div className="card-header"></div>

                  <article className="card-content">
                    <h2 className="secondary-title">L???p: {item.name}</h2>
                    <div className="text">GV ch??? nhi???m: {item.hrm}</div>
                    <div className="text">GV to??n: {item.math}</div>
                    <div className="text">GV ti???ng anh: {item.english}</div>
                    <div className="text">
                      GV v??n: {item.literature}
                    </div>
                  </article>
                  <footer className="card-footer">
                    <Button type="primary" style={{ marginRight: 5 }} onClick={() => {handleSelectClass(item._id); setModalVisible(true) }}>S???a</Button>
                    <Button type="primary" danger onClick={() => {handleSelectClass(item._id); handleDeleteClass()}}>
                      X??a
                    </Button>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal title="Ch???nh s???a" visible={modalVisible} onOk={() => handleEditClass()} onCancel={() => setModalVisible(false)}>
        <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>T??n l???p:</label>
          <input value={selectedClass?.name} onChange={(e) => setSelectedClass({ ...selectedClass, name: e.target.value})}></input>
        </div>
        
      </Modal>
    </>
  );
};

export default HomePage;
