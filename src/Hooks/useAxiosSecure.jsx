import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_uri,
});

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user?.accessToken;
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;

        if (status === 403) {
          navigate("/forbidden");
        } else if (status === 401) {
          logOut()
            .then(() => navigate("/login"))
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
