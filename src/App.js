import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import './App.css';


function App() {
  const [toDo, setToDo] = useState(JSON.parse(localStorage.getItem("toDos")) || []);
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpadateData] = useState('')
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      let newTasks = setToDo([...toDo, newEntry])

      setNewTask('');
      localStorage.setItem("toDo", JSON.stringify(newTasks))
    }
  }


  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks);
    localStorage.setItem("toDo", JSON.stringify(newTasks))
  }


  const markAsDone = (id) => {
    let newTasks = toDo.map((task) => {
      if (task.id === id) {
        return ({
          ...task, status: !task.status
        })
      }
      return task
    })
    setToDo(newTasks);
    localStorage.setItem("toDo", JSON.stringify(newTasks))
  }

  const updateTask = async (id) => {
    const { value: editedTask } = await Swal.fire({
      title: "Edit Task",
      input: "text",
      inputValue: toDo.find((task) => task.id === id).title,
      inputPlaceholder: "Enter Here",
    });

    if (editedTask) {
      let newTodos = toDo.filter((task) => {
        if (task.id === id) {
          task.title = editedTask;
        }
        return task;
      })
      setToDo(newTodos);
      localStorage.setItem("toDo", JSON.stringify(newTodos))


    }
  }


  return (
    <div className="container App" style={{ maxWidth: 600 }}>
      <br></br>
      <h1>TO DO  LISTS</h1>
      <br></br>



      <div className="row">
        <div className="col">
          <input value={newTask} onChange={(e) => {
            setNewTask(e.target.value)
          }} className="form-control form-control-lg" />
      
        </div>
        <div className="col-auto">  
          <button onClick={addTask} className="btn btn-lg btn-outline-success">Add Task</button>
        </div>
      </div>



      {toDo && toDo.length ? "" : <h4 className="mt-4">No Task</h4>}

      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? 'done' : ""}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconsWrap">
                  <span onClick={(e) => { markAsDone(task.id) }}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {task.status ? null : (
                    <span onClick={() => { updateTask(task.id) }}>
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}
                  <span onClick={() => { deleteTask(task.id) }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>

                </div>

              </div>
            </React.Fragment>
          )

        })
      }
    </div>
  );
}

export default App;
