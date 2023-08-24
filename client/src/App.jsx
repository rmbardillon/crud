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

	const insertTodo = () => {
        if(!todoTitle || !todoContent || !todoDate) 
            return alert("Please fill all the fields");
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

	const updateTodo = () => {
        if (!todoTitle || !todoContent || !todoDate)
			return alert("Please fill all the fields");
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
		<div className="container p-5">
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
			<div className="row">
				<div className="col-md-6">
					<h1 id="header">To Do List</h1>
				</div>
				<div className="col-md-6 d-flex justify-content-end">
					<button
						type="button"
						className="btn btn-success w-25"
						onClick={() => setShowInsertModal(true)}
					>
						Insert
					</button>
				</div>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th>Firstname</th>
						<th>Lastname</th>
						<th>Email</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo, index) => (
						<tr key={index}>
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
