import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UpdateModal = ({
	todoTitle,
	setTodoTitle,
	todoContent,
	setTodoContent,
	todoDate,
	setTodoDate,
	todoId,
	updateTodo,
    show,
    setShow
}) => {
	useEffect(() => {
		if (todoId !== 0) {
			axios
				.get(`http://localhost:3000/api/getTodoById/${todoId}`)
				.then((res) => {
					setTodoTitle(res.data.todoTitle);
					setTodoContent(res.data.todoContent);
					setTodoDate(res.data.todoDate);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [todoId]);
	return (
		<div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Update To Do</h5>
						<button
							type="button"
							className="btn-close"
                            aria-label="Close"
							onClick={() => setShow(false)}
						></button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control"
									id="todo"
									placeholder="To Do Title"
									value={todoTitle}
									onChange={(e) =>
										setTodoTitle(e.target.value)
									}
								/>
								<label htmlFor="todo">To Do Title</label>
							</div>
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control"
									id="todoContent"
									placeholder="To Do Content"
									value={todoContent}
									onChange={(e) =>
										setTodoContent(e.target.value)
									}
								/>
								<label htmlFor="todoContent">
									To Do Content
								</label>
							</div>
							<div className="form-floating">
								<input
									type="date"
									className="form-control"
									id="todoDate"
									placeholder="To Do Date"
									value={todoDate}
									onChange={(e) =>
										setTodoDate(e.target.value)
									}
								/>
								<label htmlFor="todoDate">To Do Date</label>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							onClick={() => setShow(false)}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={updateTodo}
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateModal;