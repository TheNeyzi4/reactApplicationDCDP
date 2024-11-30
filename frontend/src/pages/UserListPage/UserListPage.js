import { useEffect, useState } from 'react';
import { useAuth } from '../../context/DataContext';
import axios from 'axios'
import Cookies from 'js-cookie';

const UserListPage = () => {
	const { users, giveAll, userr } = useAuth();
	const [error, setError] = useState()

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				await giveAll();
			} catch (err) {
				setError('Щось пішло не так' + err);
			}
		};

		fetchUsers()
	}, [])


	if (error) {
		return <h1>{error}</h1>;
	}

	return (
		<div>
			<h1>Welcome, asd</h1>
			<h2>User List:</h2>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.email}</li>
				))}
			</ul>
		</div>
	);
};

export default UserListPage;
