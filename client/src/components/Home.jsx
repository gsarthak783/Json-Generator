import { Link } from "react-router-dom";

function Home() {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Welcome to the JSON Generator</h1>
        <p className="text-lg text-gray-700">
          Create dynamic JSON structures easily using our tool. Start by navigating to the JSON Generator page!
        </p>
        <div className="my-4">
        <Link
        className="bg-green-500 text-white text-3xl font-semibold px-16 py-2  rounded-lg"
        to='/json-generator'
        >
            JSON Generator</Link>
        </div>
        
      </div>
    );
  }
  
  export default Home;
  