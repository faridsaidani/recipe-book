import React from "react";
import { Button } from "@/components/ui/button";
import "./Home.css";

const Login: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
          Login <span className="text-customLime">Anissati, Placetek</span>
        </h1>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 text-black rounded-lg"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 text-black rounded-lg"
              type="password"
              placeholder="Password"
            />
          </div>
          <Button className="bg-customGreen1 hover:bg-customGreen2 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
