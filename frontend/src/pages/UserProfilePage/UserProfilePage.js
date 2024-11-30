import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const UserProfilePage = () => {
	const [user, setUser] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		const giveUser = () => {
			try {
				const token = localStorage.getItem('token')
				const decoded = jwtDecode(token);
				console.log(decoded)
				setUser(decoded);
			} catch (error) {
				setError("giveAll failed: " + error.message);
			}
		};

		giveUser()
	}, [])


	return (
		<div>
			<h1>Профіль користувача</h1>
			{user && (
				<div>
					<p><strong>Id:</strong> {user.userId}</p>
					<p><strong>Email:</strong> {user.email}</p>
					<Link to={`/users/${user.userId}/edit`}>Редагувати профіль</Link>
				</div>
			)}
		</div>
	);
};

export default UserProfilePage;