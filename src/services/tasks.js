import axios from "axios";

const BACKEND_URL = process.env.REACT_BACKEND_URL;

export const fetchCreateTask = async (body) => {
    try {
        const response = await axios.post(`54.234.150.200:8081/orchestrator/tasks`, body);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Task creation failed");
    }
};

export const fetchTasksByProjectId = async (projectId, skip = 0, limit = 10) => {
    try {
        const response = await axios.get(`54.234.150.200:8081/orchestrator/tasks`, {
            params: { proyectoId: projectId, skip, limit },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch tasks for project");
    }
};

export const fetchTaskById = async (taskId) => {
    try {
        const response = await axios.get(`54.234.150.200:8081/orchestrator/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch task by ID");
    }
};

export const updateTaskById = async (taskId, body) => {
    try {
        const response = await axios.put(`54.234.150.200:8081/orchestrator/tasks/${taskId}`, body);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to update task");
    }
};

export const completeTaskById = async (taskId) => {
    try {
        await axios.put(`54.234.150.200:8081/orchestrator/tasks/${taskId}`, { estado: 'completada' });
        console.log("Task marked as completed");
    } catch (error) {
        throw new Error(error.message || "Failed to complete task");
    }
};

export const deleteTaskById = async (taskId) => {
    try {
        await axios.delete(`54.234.150.200:8081/orchestrator/tasks/${taskId}`);
        console.log("Task deleted successfully");
    } catch (error) {
        throw new Error(error.message || "Failed to delete task");
    }
};
