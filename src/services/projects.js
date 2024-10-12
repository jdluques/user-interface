import axios from "axios";

const BACKEND_URL = process.env.REACT_BACKEND_URL;

export const fetchCreateProject = async (body, userId) => {
    try {
        const response = await axios.post(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/proyectos`, body, {
            params: { usuarioId: userId },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Project creation failed");
    }
};

export const fetchUserProjects = async (userId, page) => {
    try {
        const response = await axios.get(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/proyectos`, {
            params: { usuarioId: userId, page: page },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch user projects");
    }
};

export const fetchProjectById = async (id) => {
    try {
        const response = await axios.get(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/proyectos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch project by ID");
    }
};

export const updateProjectById = async (id, body) => {
    try {
        const response = await axios.put(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/proyectos/${id}`, body);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to update project");
    }
};

export const deleteProjectById = async (id) => {
    try {
        await axios.delete(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/proyectos/${id}`);
        console.log("Project deleted successfully");
    } catch (error) {
        throw new Error(error.message || "Failed to delete project");
    }
};

export const completeProjectById = async (id) => {
    try {
        await axios.put(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/proyectos/${id}`, { fechaFin: new Date().toISOString() });
        console.log("Project marked as completed");
    } catch (error) {
        throw new Error(error.message || "Failed to complete project");
    }
};
