// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import SignupImage from '../assets/SignupImage.png'
import LoginImage from '../assets/LoginImage.png'
import Logo from '../components/Logo'

const AuthPage = () => {
  const location = useLocation(); // To get the current URL
  const [isLogin, setIsLogin] = useState(true); // Default to true (Login)
  const [fadeIn, setFadeIn] = useState(true); // For fade effect

  const backImage = isLogin?LoginImage:SignupImage;

  // Extract query params using URLSearchParams
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'signup') {
      setIsLogin(false); // Show signup form
    } else {
      setIsLogin(true); // Show login form by default
    }
  }, [location.search]); // Re-run when query param changes

  const handleSwitch = () => {
    setFadeIn(false); // Start fade-out
    setTimeout(() => {
      setIsLogin((prev) => !prev); // Switch form
      setFadeIn(true); // Start fade-in
      const newPath = isLogin ? '?type=signup' : '?type=login';
      window.history.pushState({}, '', newPath); // Update the query parameter in the URL without reloading the page
    }, 500); // Match the timeout to the CSS duration
  };

  return (
    <div className="relative h-screen flex ">
      {/* Background Section */}
      <div className='absolute top-4 left-4 z-20'>
        <Logo/>
      </div>
      <div style={{ backgroundImage: `url(${backImage})` }}
        className={`absolute top-0 ${isLogin ? 'left-0' : 'left-1/2'} transition-all ease-in-out duration-[1500ms] w-1/2 h-full bg-cover bg-center `}>
      </div>

      {/* Form Section */}
      <div className={`relative z-10 w-11/12 h-full flex ${isLogin ? 'flex-row-reverse' : 'flex-row'} transition-all ease-in-out duration-[1500ms]`}>
        {/* Fade-in and fade-out effect for form */}
        <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          {isLogin ? (
            <Login onSwitch={handleSwitch} />
          ) : (
            <Signup onSwitch={handleSwitch} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
