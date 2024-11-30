import { useState, useEffect } from 'react';
import { useAuth } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
	const { logout } = useAuth();
	const [user, setUser] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		const giveUser = async () => {
			try {
				const token = await localStorage.getItem('token')
				if (token) {
					const decoded = jwtDecode(token);
					setUser(decoded);
				} else {
					console.log('Ви не зареєструвалися будь ласка зареєструйтесь')
				}
			} catch (error) {
				console.log(error.message)
			}
		};

		giveUser()
	}, [])

	if (error) {
		return <div>Error: {error}</div>
	}


	return (
		<nav>
			<h1>My App</h1>
			{user ? (
				<>
					<span>Welcome, {user.email}!</span>
					<button onClick={logout}>Logout</button>
					<Link to={`/users/${user.userId}`}>Profile</Link>
				</>
			) : (
				<></>
			)}
		</nav>
	);
};

export default Navbar;