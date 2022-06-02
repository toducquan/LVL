import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTestsService } from '../../services/testService';

const ListTest = () => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    getTestsService().then((res) => {
      setTest(res.data);
    })
    .catch((err) => console.log('err: ', err));
  }, []);
  console.log('test list: ', test)
  return (
    <>
      <div className="admin-homepage">
        <div className="admin-homepage__header">
          <Link to="/">
            <button className="btn">
              <span className="btn-text">Back</span>
            </button>
          </Link>
          <Link to="/new-test">
            <button className="btn">
              <span className="btn-text">New Test</span>
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
                    <div className="text">Deadline: {item.deadline}</div>
                    <div className="text">Factor: {item.factor}</div>
                  </article>
                  <footer className="card-footer">
                    <Link
                      to="/view-test"
                      state={{
                        testId: item._id,
                      }}
                    >
                      <button className="btn">
                        <span className="btn-text">View test</span>
                      </button>
                    </Link>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );;
};

export default ListTest;
