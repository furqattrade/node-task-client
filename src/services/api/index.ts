import axios, { AxiosInstance } from "axios";

export const request = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API 
});

const generateInterceptor = (req: AxiosInstance) => {
	req.interceptors.request.use(
		function (config) {
			config.headers.Authorization = localStorage.getItem("token");
			return config;
		},
		(error) => Promise.reject(error)
	);
	req.interceptors.response.use(
		(config) => config,
		(error) => {
			if (error?.response?.status === 401) {
				console.log(error)
			}
			return Promise.reject(error);
		}
	);
};

generateInterceptor(request);
