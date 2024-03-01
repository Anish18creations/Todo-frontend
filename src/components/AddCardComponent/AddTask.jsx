import React, { useState } from "react";
import styles from "./Styles/AddTodo.module.css";
import delteSubtask from "/Icons/DeleteIcon.svg";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { addTodoTask } from "../../../API/TodoApi";
import addSubtaskIcon from "/Icons/Addsubtask.svg";

const AddTask = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [checkedCount, setCheckedCount] = useState(0);

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, { title: subTaskTitle, isChecked: false }]);
    setSubTaskTitle("");
  };

  const handleRemoveSubTask = (index) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks.splice(index, 1);
    setSubTasks(updatedSubTasks);
    setCheckedCount(updatedSubTasks.filter((task) => task.isChecked).length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = { taskTitle, taskPriority, subTasks , dueDate};
   
      const response = await addTodoTask(todoData);
      setTaskTitle("");
      setTaskPriority("");
      setDueDate("");
      setSubTasks([]);
      setSubTaskTitle("");
      setCheckedCount(0);
      toast.success(response.message);
    /*} catch (error) {
      toast.error(error.message);
    }*/
  };

  const handlePrioritySelection = (priority) => {
    setTaskPriority(priority);
  };

  const handleSubTaskCheck = (index) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index].isChecked = !updatedSubTasks[index].isChecked;
    setSubTasks(updatedSubTasks);
    setCheckedCount(
      updatedSubTasks.filter((subTask) => subTask.isChecked).length
    );
  };
  const handleSubTaskTitleChange = (value, index) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index].title = value;
    setSubTasks(updatedSubTasks);
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <form>
          <div className={styles.titleContainer}>
            <label htmlFor="taskTitle">
              Title <span className={styles.astric}>*</span>
            </label>
            <input
              type="text"
              id="taskTitle"
              placeholder="Enter Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className={styles.titlebox}
              required
            />
          </div>
          <div className={styles.priorityContainer}>
            <label>
              Select Priority <span className={styles.astric}>*</span>
            </label>
            <div className={styles.priorityBtns}>
              <button
                type="button"
                className={`${styles.priorityButton} ${
                  taskPriority === "high" ? styles.selected : ""
                }`}
                onClick={() => handlePrioritySelection("high")}
              >
                <span
                  className={`${styles.radio} ${styles.highPriority}`}
                ></span>{" "}
                HIGH PRIORITY
              </button>
              <button
                type="button"
                className={`${styles.priorityButton} ${
                  taskPriority === "moderate" ? styles.selected : ""
                }`}
                onClick={() => handlePrioritySelection("moderate")}
              >
                <span
                  className={`${styles.radio} ${styles.moderatePriority}`}
                ></span>{" "}
                MODERATE PRIORITY
              </button>
              <button
                type="button"
                className={`${styles.priorityButton} ${
                  taskPriority === "low" ? styles.selected : ""
                }`}
                onClick={() => handlePrioritySelection("low")}
              >
                <span
                  className={`${styles.radio} ${styles.lowPriority}`}
                ></span>{" "}
                LOW PRIORITY
              </button>
            </div>
          </div>
          <div className={styles.checklistTitleContainer}>
            <label htmlFor="subTaskTitle">
              Checklist ({checkedCount}/{subTasks.length})
              <span className={styles.astric}> *</span>
            </label>
          </div>

          <div className={styles.sublistContainer}>
            {subTasks.map((subTask, index) => (
              <div key={index} className={styles.subtaskContainer}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={subTask.isChecked}
                  onChange={() => handleSubTaskCheck(index)}
                />
                <input
                  type="text"
                  className={styles.titleInput}
                  id={`subTaskTitle-${index}`}
                  placeholder="Add a Task"
                  value={subTask.title}
                  onChange={(e) =>
                    handleSubTaskTitleChange(e.target.value, index)
                  }
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveSubTask(index)}
                >
                  <img src={delteSubtask} alt="" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubTask}
              className={styles.addsubtaskbtn}
            >
              <img src={addSubtaskIcon} alt="" />
              Add New
            </button>
          </div>

          <div className={styles.buttonContainer}>
            <div>
              <input
                className={styles.dateBtn}
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className={styles.actionHere}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className={styles.saveBtn}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
