import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.DEV
		? "http://localhost:5000/api"
		: "https://dashcart-production.up.railway.app/api",
	withCredentials: true,
});

export default axiosInstance;
