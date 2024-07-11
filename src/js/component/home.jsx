import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
  
	useEffect(() => {
		fetchTasks();
	}, []);	  
  
	const fetchTasks = async () => {
		try {
		  const response = await fetch("https://playground.4geeks.com/todo/users/ejquast");
		  if (!response.ok) {
			throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
		  }
		  const data = await response.json();
		  setTasks(data.todos);
		} catch (error) {
		  console.log("Error fetching tasks:", error.message);
		}
	  };
  
	const handleInputChange = (e) => {
	  setNewTask(e.target.value);
	};
  
	const addTask = async () => {
		if (newTask.trim() !== "") {
		  try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/ejquast`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({ 
				label: newTask.trim(),
				is_done: false
			  }),
			});
			if (!response.ok) {
			  throw new Error("Failed to add task");
			}
			fetchTasks();
			setNewTask("");
		  } catch (error) {
			console.error("Error adding task:", error);
		  }
		}
	  };	  
  
	  const deleteTask = async (id) => {
		try {
		  const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		  });
		  if (!response.ok) {
			throw new Error("Failed to delete task");
		  }
		  fetchTasks();
		} catch (error) {
		  console.error("Error deleting task:", error);
		}
	  };	  
  
	  const updateTask = async (id, updatedTaskName, isDone) => {
		try {
		  const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "PUT",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({ 
			  label: updatedTaskName,
			  is_done: isDone
			}),
		  });
		  if (!response.ok) {
			throw new Error("Failed to update task");
		  }
		  fetchTasks();
		} catch (error) {
		  console.error("Error updating task:", error);
		}
	  };	  
  
	const handleTaskUpdate = (id, updatedTaskName) => {
	  updateTask(id, updatedTaskName);
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
		  {tasks.map((task) => (
			<li
				key={task.id}
				className="border-bottom list-group-item d-flex align-items-center justify-content-between"
			>
				<input
				type="text"
				value={task.label}
				onChange={(e) => handleTaskUpdate(task.id, e.target.value)}
				className="invisible-border"
				/>
				<span onClick={() => deleteTask(task.id)}>
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