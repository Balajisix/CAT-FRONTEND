import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/util";
import CaterpillarLogo from "../../assets/cat-login.jpg"; 

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });

      if (res.status === 200) {
        const data = res.data;
        localStorage.setItem('token', data.token); 
        navigate("/home");
      } else {
        const errorData = await res.data;
        setError(errorData.message || 'Login Failed');
      }
    } catch (err) {
      console.error("Login error: ", err);
      setError("Something went wrong. Please try again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 px-4">
      <form 
        onSubmit={handleLogin} 
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex justify-center mb-6">
          <img 
            src={CaterpillarLogo} 
            alt="Caterpillar" 
            className="h-16 w-auto object-contain" 
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Caterpillar</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-yellow-400 font-semibold py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors duration-200"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-yellow-700 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
