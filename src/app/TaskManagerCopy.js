import React, { useState } from "react";
import "./style.css";
function TaskManagerCopy() {
    const [tasks, setTasks] = useState([]);
    const [inputvalue, SetInputValue] = useState("");

    function addTask() {
        if (inputvalue.length === 0) {
            return false;
        }
        setTasks([
            ...tasks,
            {
                content: inputvalue,
                isComplete: false,
                isEditing: false,
            },
        ]);
        SetInputValue("");
    }

    function deleteTask(indexTasks) {
        setTasks(tasks.filter((e) => indexTasks !== tasks.indexOf(e)));
    }

    function markCompleted(taskIndex, event) {
        tasks[taskIndex].isComplete = event.target.checked;
        setTasks([...tasks]);
    }

    function editTask(taskIndex) {
        tasks[taskIndex].isEditing = true;
        setTasks([...tasks]);
    }

    function updateValue(taskIndex, value) {
        tasks[taskIndex].content = value;
        setTasks([...tasks]);
    }
    function saveTask(taskIndex) {
        tasks[taskIndex].isEditing = false;
        setTasks([...tasks]);
    }

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            <div className="tasks">
                {tasks
                    .sort((a) => (a.isComplete ? 1 : -1))
                    .map((e, index) => (
                        <div key={index} className={"task " + (e.isComplete ? "completed" : "inComplete")}>
                            <input
                                checked={e.isComplete}
                                onChange={(event) => markCompleted(index, event)}
                                type="checkbox"
                            />
                            {e.isEditing ? (
                                <input
                                    className="edit-input"
                                    value={e.content}
                                    onChange={(event) => updateValue(index, event.target.value)}
                                />
                            ) : (
                                <span className="content">{e.isComplete ? <del>{e.content}</del> : e.content}</span>
                            )}
                            {e.isEditing ? (
                                <button className="save" onClick={() => saveTask(index)}>
                                    Save
                                </button>
                            ) : (
                                <button className="edit" onClick={() => editTask(index)}>
                                    Edit
                                </button>
                            )}
                            <button className="delete" onClick={() => deleteTask(index)}>
                                Delete
                            </button>
                        </div>
                    ))}
            </div>
            <div className="add-task-container">
                <input
                    value={inputvalue}
                    onChange={(event) => SetInputValue(event.target.value)}
                    placeholder="Enter a task"
                />
                <button onClick={addTask}>Add Tasks</button>
            </div>
        </div>
    );
}

export default TaskManagerCopy;
