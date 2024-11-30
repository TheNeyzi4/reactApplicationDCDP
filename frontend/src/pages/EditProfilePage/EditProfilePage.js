import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/DataContext';

const EditProfilePage = () => {
	const navigate = useNavigate();
	const { put } = useAuth()
	const [email, setEmail] = useState('');
	const [user, setUser] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		const giveUser = () => {
			try {
				const token = localStorage.getItem('token')
				const decoded = jwtDecode(token);
				setUser(decoded);
			} catch (error) {
				setError("giveAll failed: " + error.message);
			}
		};

		giveUser()
	}, [])

	const fetchPut = async (e) => {
		try {
			await put(email, user.userId);
		} catch (err) {
			setError('Щось пішло не так' + err);
		}
	};

	if (error) {
		return <div>Error: {error}</div>
	}


	return (
		<form onSubmit={fetchPut}>
			<h1>Редагувати профіль</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<button type="submit">Зберегти</button>
			<div>Після зберігання перелогіньтесь</div>
		</form>
	);
};

export default EditProfilePage;
