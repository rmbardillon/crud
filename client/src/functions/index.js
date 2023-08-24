import axios from "axios";

export const insertTodo = (todoTitle, todoContent, todoDate, fetchData, setShowInsertModal) => {
	axios
		.post("http://localhost:3000/api/insertTodos", {
			todoTitle,
			todoContent,
			todoDate,
		})
		.then((res) => {
			console.log(res);
			fetchData();
			setShowInsertModal(false);
		})
		.catch((err) => {
			console.log(err);
		});
};
