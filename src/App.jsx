import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";




function App() {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [todo, setTodo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleAdd = () => {
        if (todo.trim() === "") {
            return;
        }
        setTodos([...todos, { id: uuidv4(), text: todo, isCompleted: false }]);
        setTodo("");
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((item) => item.id !== id));
    };

    const handleCheckbox = (id) => {
        setTodos(
            todos.map((item) =>
                item.id === id
                    ? { ...item, isCompleted: !item.isCompleted }
                    : item
            )
        );
    };

    const handleEdit = (id) => {
        const todoToEdit = todos.find((item) => item.id === id);
        if (todoToEdit) {
            setEditingId(id);
            setEditText(todoToEdit.text);
        }
    };

    const handleEditSave = () => {
        if (editText.trim() === "") {
            alert("Task cannot be empty.");
            return;
        }
        setTodos(
            todos.map((item) =>
                item.id === editingId ? { ...item, text: editText } : item
            )
        );
        setEditingId(null);
        setEditText("");
    };
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-5 rounded-xl p-5 bg-gradient-to-br from-sky-200 to-sky-300">
                <div className="flex flex-col ">
                    <div className="flex flex-col justify-center items-center bg-sky-600 text-white rounded-xl p-6 shadow-lg mb-6">
                        <h1 className="text-xl">Add Todo</h1>
                        <div className="flex gap-4 justify-center items-center">
                            <input
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAdd();
                                    }
                                }}
                                type="text"
                                className="w-full max-w-md p-3 rounded-lg mt-3 bg-sky-100 text-black outline-none text-lg"
                                placeholder="Enter your task here..."
                            />
                            <button
                                onClick={handleAdd}
                                className="bg-sky-700 text-white px-4 py-2 rounded-lg mt-3 hover:bg-sky-800 duration-200 font-bold shadow"
                            >
                                <MdAddToPhotos />
                            </button>
                        </div>
                    </div>
                    <h1 className="text-center mb-5">
                        <span className="text-4xl font-bold text-sky-700">
                            Your ToDo's
                        </span>
                    </h1>
                    {todos.length === 0 && (
                        <div className="text-center text-gray-500">
                            <p className="text-xl">
                                No tasks available. Please add a task.
                            </p>
                        </div>
                    )}
                    {todos.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col justify-center items-center m-2"
                        >
                            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-5 transition hover:shadow-2xl">
                                <ul className="list-none">
                                    <li className="flex justify-between items-center mb-3">
                                        <div
                                            className={
                                                item.isCompleted
                                                    ? "line-through text-gray-800"
                                                    : ""
                                            }
                                        >
                                            <span className="text-base text-sky-800">
                                                <input
                                                    type="checkbox"
                                                    name={item.id}
                                                    className="m-3 accent-sky-700"
                                                    checked={item.isCompleted}
                                                    onChange={() =>
                                                        handleCheckbox(item.id)
                                                    }
                                                />
                                                {editingId === item.id ? (
                                                    <input
                                                        type="text"
                                                        value={editText}
                                                        onChange={(e) =>
                                                            setEditText(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border p-1 rounded"
                                                    />
                                                ) : (
                                                    item.text
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {editingId === item.id ? (
                                                <button
                                                    onClick={handleEditSave}
                                                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 duration-200"
                                                >
                                                    <FaSave />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleEdit(item.id)
                                                    }
                                                    className="bg-sky-700 text-white px-3 py-1 rounded-lg hover:bg-sky-800 duration-200"
                                                >
                                                    <FaEdit />
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 duration-200"
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
