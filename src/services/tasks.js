import axios from "axios";

const BACKEND_URL = process.env.REACT_BACKEND_URL;

export const fetchCreateTask = async (body) => {
    try {
        const response = await axios.post(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/tasks`, body);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Task creation failed");
    }
};

export const fetchTasksByProjectId = async (projectId, skip = 0, limit = 10) => {
    try {
        const response = await axios.get(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/tasks`, {
            params: { proyectoId: projectId, skip, limit },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch tasks for project");
    }
};

export const fetchTaskById = async (taskId) => {
    try {
        const response = await axios.get(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch task by ID");
    }
};

export const updateTaskById = async (taskId, body) => {
    try {
        const response = await axios.put(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/tasks/${taskId}`, body);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to update task");
    }
};

export const completeTaskById = async (taskId) => {
    try {
        await axios.put(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/tasks/${taskId}`, { estado: 'completada' });
        console.log("Task marked as completed");
    } catch (error) {
        throw new Error(error.message || "Failed to complete task");
    }
};

export const deleteTaskById = async (taskId) => {
    try {
        await axios.delete(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/tasks/${taskId}`);
        console.log("Task deleted successfully");
    } catch (error) {
        throw new Error(error.message || "Failed to delete task");
    }
};
