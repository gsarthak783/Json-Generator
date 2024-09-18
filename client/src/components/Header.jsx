import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/" className="text-white text-lg font-semibold">Home</Link>
        </li>
        <li>
          <Link to="/json-generator" className="text-white text-lg font-semibold">JSON Generator</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
