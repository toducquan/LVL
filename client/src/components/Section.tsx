import React from 'react';
import './css/section.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './section/Login';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './AdminSection/HomePage';
import TeacherList from './AdminSection/TeacherList';
import AddTeacher from './AdminSection/AddTeacher';
import AddClass from './AdminSection/AddClass';
import HomePageTeacher from './TeacherSection/HomePageTeacher';
import ClassView from './TeacherSection/ClassView';
import ListTest from './TeacherSection/ListTest';
import TestView from './TeacherSection/TestView';
import CreateTest from './TeacherSection/CreateTest';
import TestList from './StudentSection/TestList';
import DoTest from './StudentSection/DoTest';
import AddStudent from './TeacherSection/AddStudent';

const Section = ({ role }: any) => {
  
  return (
    <div className="section">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
         {role == 1 && (
          <>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/teacher" element={<TeacherList/>}></Route>
            <Route path="/add-teacher" element={<AddTeacher/>}></Route>
            <Route path="/add-class" element={<AddClass/>}></Route>
          </>
        )}
        {role == 2 && (
          <>
            <Route path="/" element={<HomePageTeacher/>}></Route>
            <Route path="/view-class" element={<ClassView/>}></Route>
            <Route path="/test-list" element={<ListTest/>}></Route>
            <Route path="/view-test" element={<TestView/>}></Route>
            <Route path="/new-test" element={<CreateTest/>}></Route>
            <Route path="/add-student" element={<AddStudent/>}></Route>
          </>
        )}
        {role == 3 && (
          <>
            <Route path="/" element={<TestList/>}></Route>
            <Route path="/do-test" element={<DoTest/>}></Route>
          </>
        )}
      </Routes>
    </div>
  );
};

export default Section;
