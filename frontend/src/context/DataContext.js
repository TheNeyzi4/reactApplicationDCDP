import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate()

	const put = useCallback(async (email, id) => {
		try {
			if (email && id) {
				const response = await axiosInstance.put(`http://localhost:4000/api/user/${id}`, { email });
				console.log(`Response Put: ${response}`)
				setUser(response.data);
			}
		} catch (error) {
			setError("Put failed: " + error.message);
		}
	}, []);

	const login = useCallback(async (email, password) => {
		try {
			const response = await axiosInstance.post('http://localhost:4000/api/auth/login', { email, password });
			const { token } = response.data;
			localStorage.setItem('token', token);
			const decoded = jwtDecode(token);
			setUser(decoded);
		} catch (error) {
			setError("Login failed: " + error.message);
		}
	}, []);

	const register = useCallback(async (email, password) => {
		try {
			const response = await axiosInstance.post('http://localhost:4000/api/auth/register', { email, password });
			const { token } = response.data;

			localStorage.setItem('token', token);
			const decoded = jwtDecode(token);
			setUser(decoded);
		} catch (error) {
			setError("Registration failed: " + error.message);
		}
	}, []);

	const giveAll = useCallback(async () => {
		try {
			const response = await axiosInstance.get('http://localhost:4000/api/user/getAll');
			console.log(response)
			setUsers(response.data);
		} catch (error) {
			console.log(error.message)
		}
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		setUser(null);
		navigate('/login')
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, register, logout, users, giveAll, put }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);