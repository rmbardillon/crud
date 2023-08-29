import React from 'react'

const InsertModal = ({
	todoTitle,
	setTodoTitle,
	todoContent,
	setTodoContent,
	todoDate,
	setTodoDate,
	insertTodo,
	show,
	setShow,
}) => {
	return (
		<div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }} id='insertModal'>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add To Do</h5>
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
									onChange={(e) =>
										setTodoTitle(e.target.value)
									}
                                    required
								/>
								<label htmlFor="todo">To Do Title</label>
							</div>
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control"
									id="todoContent"
									placeholder="To Do Content"
									onChange={(e) =>
										setTodoContent(e.target.value)
									}
                                    required
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
									onChange={(e) =>
										setTodoDate(e.target.value)
									}
                                    required
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
							type="submit"
							className="btn btn-primary"
							onClick={insertTodo}
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InsertModal;