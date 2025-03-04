import React, { useState, useEffect, useRef, useReducer } from "react";
import "./App.css";

const studentReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "EDIT":
      return state.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
    case "DELETE":
      return state.filter((student) => student.id !== action.payload);
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const App = () => {
  const [students, dispatch] = useReducer(studentReducer, []);
  const [name, setName] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [error, setError] = useState(""); // Biến lưu lỗi
  const [editingStudent, setEditingStudent] = useState(null);
  const nameRef = useRef();

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
      dispatch({ type: "SET", payload: storedStudents });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Hàm tính điểm trung bình cho từng sinh viên
  const calculateAverage = (score1, score2) => {
    return ((score1 + score2) / 2).toFixed(2);
  };

  // Kiểm tra điều kiện hợp lệ của dữ liệu nhập
  const validateInput = () => {
    if (!name.trim()) {
      setError("Tên sinh viên không được để trống!");
      return false;
    }
    if (score1 === "" || score2 === "" || isNaN(score1) || isNaN(score2)) {
      setError("Điểm phải là số!");
      return false;
    }
    if (score1 < 0 || score1 > 10 || score2 < 0 || score2 > 10) {
      setError("Điểm phải nằm trong khoảng từ 0 đến 10!");
      return false;
    }
    setError(""); // Xoá lỗi nếu hợp lệ
    return true;
  };

  const handleAddStudent = () => {
    if (!validateInput()) return; // Kiểm tra điều kiện trước khi thêm

    const newStudent = {
      id: Date.now(),
      name,
      score1: parseFloat(score1),
      score2: parseFloat(score2),
    };

    dispatch({ type: "ADD", payload: newStudent });
    setName("");
    setScore1("");
    setScore2("");
    nameRef.current.focus();
  };

  const handleEditStudent = () => {
    if (!validateInput()) return; // Kiểm tra điều kiện trước khi sửa

    dispatch({
      type: "EDIT",
      payload: { ...editingStudent, name, score1: parseFloat(score1), score2: parseFloat(score2) },
    });

    setName("");
    setScore1("");
    setScore2("");
    setEditingStudent(null);
    nameRef.current.focus();
  };

  const handleDeleteStudent = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const startEditing = (student) => {
    setEditingStudent(student);
    setName(student.name);
    setScore1(student.score1);
    setScore2(student.score2);
    nameRef.current.focus();
  };

  return (
    <div className="App">
      <h1>Quản lý Sinh viên</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Hiển thị lỗi nếu có */}

      <input
        ref={nameRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập tên sinh viên"
      />
      <input
        type="number"
        value={score1}
        onChange={(e) => setScore1(e.target.value)}
        placeholder="Nhập điểm 1"
      />
      <input
        type="number"
        value={score2}
        onChange={(e) => setScore2(e.target.value)}
        placeholder="Nhập điểm 2"
      />

      {editingStudent ? (
        <button onClick={handleEditStudent}>Sửa sinh viên</button>
      ) : (
        <button onClick={handleAddStudent}>Thêm sinh viên</button>
      )}

      <h2>Danh sách sinh viên</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Điểm 1</th>
            <th>Điểm 2</th>
            <th>Trung bình</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.score1}</td>
              <td>{student.score2}</td>
              <td>{calculateAverage(student.score1, student.score2)}</td>
              <td>
                <button onClick={() => startEditing(student)}>Sửa</button>
                <button onClick={() => handleDeleteStudent(student.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
