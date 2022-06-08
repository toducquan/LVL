import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteTestService, editTestService, getTestsService } from '../../services/testService';
import { Button, Modal } from 'antd';

const ListTest = () => {
  const [test, setTest] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>();


  useEffect(() => {
    getTestsService().then((res) => {
      setTest(res.data);
    })
      .catch((err) => console.log('err: ', err));
  }, []);

  const handleSelectTest = (id: any) => {
    const testtt = test.find((item: any) => {
      return item._id == id;
    })
    setSelectedTest(testtt);
  }

  const handleEditTest = () => {
    editTestService(selectedTest._id, {
      deadline: selectedTest.deadline,
      factor: Number(selectedTest.factor)
    })
      .then(() => {
        getTestsService().then((res) => {
          setTest(res.data);
        })
          .catch((err) => console.log('err: ', err));
        setModalVisible(false)
      })
      .catch((err) => console.log('err: ', err));
  }
  const handleDeleteTest = () => {
    deleteTestService(selectedTest._id)
    .then(() => {
      getTestsService().then((res) => {
        setTest(res.data);
      })
        .catch((err) => console.log('err: ', err));
    })
    .catch((err) => console.log('err: ', err))
  }

  return (
    <>
      <div className="admin-homepage">
        <div className="admin-homepage__header">
          <Link to="/">
            <button className="btn">
              <span className="btn-text">Quay lại</span>
            </button>
          </Link>
          <Link to="/new-test">
            <button className="btn">
              <span className="btn-text">Tạo test mới</span>
            </button>
          </Link>
        </div>
        <div className="card-body">
          {test?.map((item: any) => {
            return (
              <div className="containerr">
                <div className="card">
                  <div className="card-header test-list"></div>

                  <article className="card-content">
                    <h2 className="secondary-title manager">
                      {item.question.title}
                    </h2>
                    <div className="text">Thời hạn: {item.deadline}</div>
                    <div className="text">Hệ số: {item.factor}</div>
                  </article>
                  <footer className="card-footer">
                    <Link
                      to="/view-test"
                      state={{
                        testId: item._id,
                      }}
                    >
                      <button className="btn">
                        <span className="btn-text">Chi tiết</span>
                      </button>
                    </Link>
                    <div style={{marginTop: 10}}>
                      <Button type="primary" onClick={() => { handleSelectTest(item._id); setModalVisible(true) }}>Sửa</Button>
                      <Button type="primary" danger onClick={() => { handleSelectTest(item._id); handleDeleteTest() }}>
                        Xóa
                      </Button>
                    </div>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal title="Chỉnh sửa" visible={modalVisible} onOk={() => handleEditTest()} onCancel={() => setModalVisible(false)}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "inline-block", width: 215 }}>Thời hạn</label>
          <input value={selectedTest?.deadline} onChange={(e) => setSelectedTest({ ...selectedTest, deadline: e.target.value })}></input>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "inline-block", width: 215 }}>Hệ số</label>
          <input value={selectedTest?.factor} onChange={(e) => setSelectedTest({ ...selectedTest, factor: e.target.value })}></input>
        </div>
      </Modal>
    </>
  );;
};

export default ListTest;
