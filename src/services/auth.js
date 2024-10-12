
import axios from "axios";
import { setTokenAndId } from "./tokenService.js";

const BACKEND_URL = process.env.REACT_BACKEND_URL; 

export const fetchLogin = async (body) => {
  try {
    const response = await axios.post(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/users/login`, body);
    setTokenAndId(response.data.token, response.data.createdUser.id);
    console.log("Successful login");
  } catch (error) {
    throw new Error(error.message || "Unsuccessful login");
  }
};

export const fetchRegister = async (body) => {
  try {
    const response = await axios.post(`http://ABLProduccion-143083708.us-east-1.elb.amazonaws.com/orchestrator/users`, body);
    setTokenAndId(response.data.token, response.data.createdUser.id);
    console.log("Successful register");
  } catch (error) {
    throw new Error(error.message || "Unsuccessful register");
  }
};
