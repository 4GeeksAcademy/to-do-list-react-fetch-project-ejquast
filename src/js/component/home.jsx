import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([
	  "Make the bed",
	  "Wash my hands",
	  "Eat",
	  "Walk the dog"
	]);
	const [newTask, setNewTask] = useState("");
  
	const handleInputChange = (e) => {
	  setNewTask(e.target.value);
	};
  
	const addTask = () => {
	  if (newTask.trim() !== "") {
		setTasks([...tasks, newTask.trim()]);
		setNewTask("");
	  }
	};
  
	const deleteTask = (index) => {
	  const updatedTasks = [...tasks];
	  updatedTasks.splice(index, 1);
	  setTasks(updatedTasks);
	};
  
	const handleKeyPress = (e) => {
	  if (e.key === "Enter") {
		addTask();
	  }
	};
  
	return (
	  <div>
		<div className="text-center">
		  <p className="mt-5 large-title">To Do List</p>
		</div>
		<div className="bg-white text-dark align-items-center justify-contents-center m-auto w-25 border border-opacity-25 shadow">
		  <input
			className="form-control fs-4 square-input"
			type="text"
			placeholder="What needs to be done?"
			value={newTask}
			onChange={handleInputChange}
			onKeyPress={handleKeyPress}
		  />
		  <ul className="list-group fs-4 square-input">
			{tasks.map((task, index) => (
			  <li key={index} className="border-bottom list-group-item d-flex align-items-center justify-content-between">
				{task}
				<span onClick={() => deleteTask(index)}>
				  <i className="fa-solid fa-x"></i>
				</span>
			  </li>
			))}
		  </ul>
		  <p className="ps-3 pt-2 fs-6 square-input">Items Left: {tasks.length}</p>
		</div>
		<div className="post-it1 border-bottom"></div>
		<div className="post-it2 border-bottom"></div>
	  </div>
	);
  };
  
  export default Home;
