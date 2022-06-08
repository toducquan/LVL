import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { editGradeService, getAllGradeWithTestId } from '../../services/testService';

const TestView = () => {
  const [grades, setGrades] = useState([]);
  const location = useLocation();
  const { testId }: any = location.state;
  const [selectedGrade, setSelectedGrade] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllGradeWithTestId(testId).then((res) => {
      console.log('data ', res.data)
      setGrades(res.data);
    }).catch((err) => console.log('err ', err));
  }, []);

  const handleSelectGrade = (id: any) => {
    const grade = grades.find((item: any) => {
      return item._id == id;
    })
    setSelectedGrade(grade);
  }
  const handleEditGrade = () => {
    editGradeService(selectedGrade._id, {
      grade: Number(selectedGrade.grade)
    })
      .then(() => {
        getAllGradeWithTestId(testId).then((res) => {
          console.log('data ', res.data)
          setGrades(res.data);
        }).catch((err) => console.log('err ', err));
        setModalVisible(false)
      })
      .catch((err) => console.log('err: ', err))
  }

  return (
    <>
      <div className="admin-homepage__header">
        <Link to="/test-list">
          <button className="btn">
            <span className="btn-text">Quay lại</span>
          </button>
        </Link>
      </div>
      <table>
        <thead>
          <th>Tên học sinh</th>
          <th>Điểm số</th>
          <th>Hành động</th>
        </thead>
        <tbody>
          {grades.map((item: any) => {
            return (
              <tr>
                <td data-label="name">{item.student_name}</td>
                <td data-label="war">{item.grade}</td>
                <td data-label="slg">
                  <Button type="primary" onClick={() => { handleSelectGrade(item._id); setModalVisible(true) }}>Sửa</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal title="Thêm điểm" visible={modalVisible} onOk={handleEditGrade} onCancel={() => setModalVisible(false)}>
      <div style={{ marginBottom: 10}}>
          <label style={{ display: "inline-block", width: 215 }}>Nhập điểm:</label>
          <input value={selectedGrade?.grade} onChange={(e) => setSelectedGrade({ ...selectedGrade, grade: e.target.value})}></input>
        </div>
      </Modal>
    </>
  );
};

export default TestView;
