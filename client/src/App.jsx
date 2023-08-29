import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import $ from "jquery";
import InsertModal from "./components/InsertModal";
import UpdateModal from "./components/UpdateModal";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [todoTitle, setTodoTitle] = useState("");
	const [todoContent, setTodoContent] = useState("");
	const [todoDate, setTodoDate] = useState("");
	const [todos, setTodos] = useState([]);
	const [todoId, setTodoId] = useState(0);
    const [showInsertModal, setShowInsertModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const insertTodo = (e) => {
        e.preventDefault();
        if(!todoTitle || !todoContent || !todoDate) 
            return alert("Please fill all the fields!");
		axios
			.post("http://localhost:3000/api/insertTodos", {
				todoTitle,
				todoContent,
				todoDate,
			})
			.then((res) => {
				fetchData();
				setShowInsertModal(false);
                $("#todo").val("");
				$("#todoContent").val("");
				$("#todoDate").val("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateTodo = (e) => {
        e.preventDefault();
        if (!todoTitle || !todoContent || !todoDate)
			return alert("Please fill all the fields!");
		axios
			.put(`http://localhost:3000/api/updateTodoById/${todoId}`, {
				todoTitle,
				todoContent,
				todoDate,
			})
			.then((res) => {
				fetchData();
                setShowUpdateModal(false);
                $("#todo").val("");
				$("#todoContent").val("");
				$("#todoDate").val("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

    const deleteTodo = (todoId) => {
        const confirmBox = window.confirm("Do you really want to delete this todo?");
        if (!confirmBox) return;
        axios
            .delete(`http://localhost:3000/api/deleteTodoById/${todoId}`)
            .then((res) => {
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    }

	const fetchData = () => {
		axios
			.get("http://localhost:3000/api/getTodos")
			.then((res) => {
				setTodos(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, [todos]);
    
	return (
		<div className="container p-5 mt-5" id="App">
			<InsertModal
				todoTitle={todoTitle}
				setTodoTitle={setTodoTitle}
				todoContent={todoContent}
				setTodoContent={setTodoContent}
				todoDate={todoDate}
				setTodoDate={setTodoDate}
				insertTodo={insertTodo}
				show={showInsertModal}
				setShow={setShowInsertModal}
			/>
			<UpdateModal
				todoTitle={todoTitle}
				setTodoTitle={setTodoTitle}
				todoContent={todoContent}
				setTodoContent={setTodoContent}
				todoDate={todoDate}
				setTodoDate={setTodoDate}
				todoId={todoId}
				updateTodo={updateTodo}
				show={showUpdateModal}
				setShow={setShowUpdateModal}
			/>
			<div className="row mb-3">
				<div className="col-md-6">
					<h1 id="header">To Do List</h1>
				</div>
				<div className="col-md-6 d-flex justify-content-end align-items-center">
					<button
						type="button"
						className="btn btn-success btn-sm w-25 h-75"
						onClick={() => setShowInsertModal(true)}
					>
						Insert
					</button>
				</div>
			</div>
			<table className="table table-sm table-dark table-bordered text-center">
				<thead>
					<tr>
                        <th>#</th>
						<th>Todo Title</th>
						<th>Todo Content</th>
						<th>Todo Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo, index) => (
						<tr key={index}>
                            <td>{index + 1}</td>
							<td>{todo.todoTitle}</td>
							<td>{todo.todoContent}</td>
							<td>{todo.todoDate}</td>
							<td>
								<div className="btn-group">
									<button
										className="btn btn-sm btn-primary"
										onClick={() => {
											setTodoId(todo._id);
											setShowUpdateModal(true);
										}}
									>
										Edit
									</button>
									<button 
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteTodo(todo._id)}
                                    >
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
