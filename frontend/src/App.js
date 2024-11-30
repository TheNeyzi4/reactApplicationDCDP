import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import UserListPage from './pages/UserListPage/UserListPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import { AuthProvider } from './context/DataContext';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/users" element={<UserListPage />} />
					<Route path="/users/:id" element={<UserProfilePage />} />
					<Route path="/users/:id/edit" element={<EditProfilePage />} />
				</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
