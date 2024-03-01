import React, { useState } from 'react';
import styles from './Login.module.css';
import bot from '../../assets/images/bot.png';
import view from '../../assets/icons/view.png';
import email from '../../assets/icons/email.png';
import password from '../../assets/icons/password.png';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { loginUser } from '../../apis/auth';

export default function Login() {

  const [showPassword , setShowPassword] = useState(view);
  const [data , setdata] = useState(true);  
  const [authemail , setAuthemail] = useState('');
  const [authpassword , setAuthpassword] = useState('');
    
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  })

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    setAuthemail('');
    setAuthpassword('');
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email && !formdata.password) {
      setAuthemail('Please provide an email address');
      setAuthpassword('Please provide password');
    }
    else if(!formdata.email){
      setAuthemail('Please provide an email address');
    }
    else if(!formdata.password){
      setAuthpassword('Please provide password');
    }
    else{
      const response = await loginUser({ ...formdata });
    if (response.success == 'false') {
        toast.error('Invalid credentials!!', { duration: 1000 });
        return;
    }
    else{
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.name);
        localStorage.setItem("password" , formdata.password);
        localStorage.setItem("userid" , response.userid);
        toast.success('You have been logged in!!', { duration: 2000 });
        setTimeout(success, 3000);
    }
    }
  }
  
  const success = () => {
    navigate("/");
  }

  return (
    <>
        <div className={styles.bg}></div>
            <div className={styles.circle}></div>
            <img src={bot} alt='' className={styles.bot} />
            <div className={styles.welcometext}>
                Welcome aboard my friend
                <p style={{ fontSize: '1rem', fontWeight: '400', marginLeft: '2.3vw' }}>
                    just a couple of clicks and we start
                </p>
            </div>
            <div className={styles.login}>Login</div>
            <div className={styles.namebox} style={{top:'33vh'}}>
                <img src={email} alt='' style={{ width: '2rem', height: '2rem' }} />
                <input type='text' placeholder='Email' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '24.5vw',
                    color: '#828282', paddingRight: '2rem', outline: 'none' , marginLeft:'0.5vw'
                }} spellCheck='false' required onChange={handlechange}
                name='email' value={formdata.email}>
                </input>&nbsp;&nbsp;
            </div>
            <div className={styles.customemail}>{authemail}</div>

            <div className={styles.namebox} style={{top:'42vh' , fontSize:'1.2rem'}}>
                <img src={password} alt='' style={{ width: '1.7rem', height: '1.7rem' }} />
                <input type = { data ? "password" : "text" } placeholder='Password' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '23.5vw',
                    color: '#828282', paddingRight: '2rem', outline: 'none' , marginLeft:'0.5vw'
                }} spellCheck='false' required onChange={handlechange}
                name='password' value={formdata.password}>
                </input>
                <img src={showPassword} alt='' style={{ width: '1.5rem', height: '1.5rem' }} 
                onClick={() =>{
                    setdata((prev)=>!prev)
                    if(data == true)
                    setShowPassword(password);
                    else
                    setShowPassword(view);
                }
                }/>
            </div>
            <div className={styles.customemail} style={{top:'47vh' , right:'27.6vw'}}>{authpassword}</div>

            <div className={styles.loginbtn} onClick={handlesubmit}>Log in</div><Toaster/>
            <div className={styles.havenoacc}>Have no account yet?</div>
            <div className={styles.registerbtn} onClick={()=>{navigate('/register')}}>Register</div>
    </>
  )
}
