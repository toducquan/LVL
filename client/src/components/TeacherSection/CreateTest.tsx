import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClassService } from '../../services/classService';
import { addTestService } from '../../services/testService';

const CreateTest = () => {
  let navigate = useNavigate();
  const [questions, setQuestions] = useState<any>([]);
  const [ans, setAns] = useState<any>([]);

  const [title, setTitle] = useState();
  const [ques, setQues] = useState();
  const [firstAns, setFirstAns] = useState();
  const [sencondAns, setSecondAns] = useState();
  const [thirdAns, setThirdAns] = useState();
  const [fourthAns, setFourthAns] = useState();
  const [correctAns, setCorrectAns] = useState<any>();
  const [classes, setClasses] = useState([]);
  const [deadline, setDeadline] = useState();
  const [factor, setFactor] = useState<any>();
  const [classId, setClassId] = useState();

  const questionData = [...questions];
  const conrrectData = [...ans];

  useEffect(() => {
    getAllClassService().then((res) => {
      setClasses(res.data);
    });
  }, []);

  const handleSubmitTest = () => {
    const test = {
      class_id: classId,
      deadline: deadline,
      factor: parseInt(factor),
      question: {
        title: title,
        content: questions,
        correct_ans: ans,
      },
    };
    addTestService(test)
      .then(() => {
        return navigate('/test-list');
      })
      .catch((err) => console.log('err: ', err));
  };

  const handleAddNewQuestion = () => {
    const newQues = {
      ques: ques,
      ans: [firstAns, sencondAns, thirdAns, fourthAns],
    };
    console.log(conrrectData);
    questionData.push(newQues);
    setQuestions(questionData);
    conrrectData.push(parseInt(correctAns));
    setAns(conrrectData);
  };

  return (
    <div>
      <form id="survey-form">
        <div className="form-group">
          <label id="name-label" >
            Title <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id="name-label" >
            Deadline <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id="name-label">
            Faftor <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFactor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <p>Select class?</p>
          <select
            id="dropdown"
            name="role"
            className="form-control"
            onChange={(e: any) => setClassId(e.target.value)}
          >
            <option disabled selected hidden>Select class</option>
            {classes.map((item: any) => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </select>
        </div>
        {questions.map((item: any) => {
          return (
            <div className="form-group">
              <p>{item.ques}</p>
              {item.ans.map((ans: any) => {
                return (
                  <p>
                    <input
                      name="user-recommend"
                      value="definitely"
                      type="radio"
                      className="input-radio"
                      checked
                    />
                    {ans}
                  </p>
                );
              })}
            </div>
          );
        })}

        <div className="form-group">
          <p>
            <input
              className="question"
              onChange={(e: any) => setQues(e.target.value)}
            />
          </p>
          <p>
            <input
              name="user-recommendd"
              value={0}
              type="radio"
              defaultChecked
              className="input-radio"
              onChange={(e) => setCorrectAns(e.target.value)}
            />
            <input
              className="question"
              onChange={(e: any) => setFirstAns(e.target.value)}
            />
          </p>
          <p>
            <input
              name="user-recommendd"
              value={1}
              type="radio"
              className="input-radio"
              onChange={(e) => setCorrectAns(e.target.value)}
            />
            <input
              className="question"
              onChange={(e: any) => setSecondAns(e.target.value)}
            />
          </p>
          <p>
            <input
              name="user-recommendd"
              value={2}
              type="radio"
              className="input-radio"
              onChange={(e) => setCorrectAns(e.target.value)}
            />
            <input
              className="question"
              onChange={(e: any) => setThirdAns(e.target.value)}
            />
          </p>
          <p>
            <input
              name="user-recommendd"
              value={3}
              type="radio"
              className="input-radio"
              onChange={(e) => setCorrectAns(e.target.value)}
            />
            <input
              className="question"
              onChange={(e: any) => setFourthAns(e.target.value)}
            />
          </p>
        </div>
        <div
          className="form-group submit-button submit-button__ques"
          onClick={() => handleAddNewQuestion()}
        >
          Create
        </div>
        <div
          className="form-group submit-button"
          onClick={() => handleSubmitTest()}
        >
          Submit
        </div>
      </form>
    </div>
  );
};

export default CreateTest;
