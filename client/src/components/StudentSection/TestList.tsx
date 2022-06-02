import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTestsOfStudentService } from '../../services/testService';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const TestList = () => {
  const [test, setTest] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    getTestsOfStudentService().then((res) => {
      console.log('data ', res.data)
      setTest(res.data);
    });
  }, []);
  return (
    <>
      <div className="admin-homepage">
        <div className="admin-homepage__header">

          <button className="btn" onClick={() => setModalVisible(true)}>
            <span className="btn-text">Student Information</span>
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
                        <div className="text">Deadline: {item?.deadline}</div>
                      )
                    }
                    <div className="text">Factor: {item?.factor}</div>
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
                            <span className="btn-text">View test</span>
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
      <Modal title="Add grade" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "inline-block", width: 215 }}>Name</label>
          <input value={user.name}></input>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "inline-block", width: 215 }}>Email</label>
          <input value={user.email}></input>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "inline-block", width: 215 }}>Dob</label>
          <input value={user.dob}></input>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "inline-block", width: 215 }}>Age</label>
          <input value={user.age}></input>
        </div>
      </Modal>
    </>
  );
};

export default TestList;
