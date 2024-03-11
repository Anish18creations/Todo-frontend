import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const AnalyticsofCards = async () => {
    try {
        const requestUrl = `${backendUrl}/todo/analytics`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(requestUrl);
        return response?.data;
    } catch (error) {
        return;
    }
}

export const gettodocardinfo = async (todoid) => {
    try {
        const t = todoid;
        const requestUrl = `${backendUrl}/todo/todo-description/${t}`;
        console.log(requestUrl);
        const response = await axios.get(requestUrl);
        console.log(response);
        return response?.data?.data;
    } catch (error) {
        return;
    }
}

export const checkallcheckboxes = async (todoid) => {
    try {
        const t = todoid;
        const requestUrl = `${backendUrl}/todo/movetodonesection/${t}`;
        const response = await axios.get(requestUrl);
        console.log(response.data.data);
        return response?.data?.data;
    } catch (error) {
        return;
    }
}

export const cardinfo = async () => {
    try {
        const requestUrl = `${backendUrl}/todo/alltasks`;
        const response = await axios.get(requestUrl);
        return response?.data?.data;
    } catch (error) {
        return;
    }
}

export const carddelete = async (todoid) => {
    try {
        const requestUrl = `${backendUrl}/todo/todo-delete/${todoid}`;
        console.log(requestUrl);
        const response = await axios.get(requestUrl);
        console.log(response?.data);
        return response?.data;
    } catch (error) {
        return;
    }
}

export const addTodoTask = async ({ taskTitle, taskPriority, subTasks, dueDate }) => {


    try {

        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        /*const response = await axios.post(${BACKEND_URL}/addTodo, todoData, {
          headers,
        });
  
        return response.data;*/

        const requestUrl = `${backendUrl}/todo/createcard`;

        const requestPayload = { taskTitle, taskPriority, subTasks, dueDate };
        const response = await axios.post(requestUrl, requestPayload);
        console.log(response);
        //return response.data;
    } catch (error) {
        //throw new Error(error.response.data.message);
        console.log(error);
    }
};