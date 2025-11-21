import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-dark text-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-light">Contacts</span>
				</Link>
			</div>
		</nav>
	);
};