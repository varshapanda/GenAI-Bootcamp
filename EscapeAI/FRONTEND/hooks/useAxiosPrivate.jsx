import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = () => {
  useEffect(() => {
    // Request interceptor: attach token if it exists in localStorage
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken"); // your token storage
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Optional: Response interceptor for logging or basic handling
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        // If 401: Unauthorized, you could redirect to login here
        if (error?.response?.status === 401) {
          console.warn("Unauthorized! Redirecting to login...");
        }

        // If 403: Forbidden
        if (error?.response?.status === 403) {
          console.warn(
            "Access Denied: You do not have permission for this resource."
          );
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
