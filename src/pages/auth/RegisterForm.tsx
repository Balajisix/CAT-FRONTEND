import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/util';
import CaterpillarLogo from '../../assets/cat-login.jpg';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register({ username, email, password });
      
      if(res.status === 201) {
        navigate('/');
      } else {
        const data = res.data;
        setError(data.message || 'Register Failed');
      }
    } catch (err) {
      console.error("Error: ", err);
      setError("Something went wrong. Please try again")
    }
  }

  return(
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 px-4">
      <form 
        onSubmit={handleRegister} 
        className='bg-white rounded-2xl shadow-lg p-10 w-full max-w-md hover:shadow-2xl transition-all duration-300'
      >
        <div className="flex justify-center mb-6">
          <img 
            src={CaterpillarLogo} 
            alt="Caterpillar" 
            className="h-16 w-auto object-contain" 
          />
        </div>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register to Caterpillar</h2>

        {error && <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>}

        <input 
          type="text" 
          value={username}
          placeholder='Enter the username'
          onChange={(e) => setUsername(e.target.value)}
          className='w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
          required
        />
        <input 
          type="email"
          value={email}
          placeholder='Enter the email' 
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
          required
        />
        <input 
          type="password"
          value={password}
          placeholder='Enter the password'
          onChange={(e) => setPassword(e.target.value)}
          className='w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
          required
        />

        <button type='submit' className='w-full bg-black text-yellow-400 font-semibold py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors duration-200'>Register</button>

        <p className='mt-6 text-center text-sm text-gray-600'>
          Have an account?{" "}
          <span className='text-yellow-700 hover:underline cursor-pointer' onClick={() => navigate('/')}>Login</span> 
        </p>
      </form>
    </div>
  );
} 

export default RegisterForm;