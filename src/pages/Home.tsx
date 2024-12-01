import React from "react";
import { Button } from "@/components/ui/button";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to <span className="text-customLime">Anissati Placetek</span>
        </h1>
        <p className="text-2xl mb-8 drop-shadow-md">
          Discover and share your favorite recipes
        </p>
        <div className="flex space-x-4">
          <Button
            className="bg-customGreen1 hover:bg-customGray text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:drop-shadow-lg text-shadow"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </Button>
          <Button
            className="bg-customLime hover:bg-customGreen2 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:drop-shadow-lg text-shadow"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
