import React , {useState} from 'react';
import styles from './Register.module.css';
import bot from '../../assets/images/bot.png';
import name from '../../assets/icons/name.png';
import email from '../../assets/icons/email.png';
import password from '../../assets/icons/password.png';
import view from '../../assets/icons/view.png';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../../apis/auth';

export default function Register() {

    const [showPassword , setShowPassword] = useState(view);
    const [data , setdata] = useState(true);

    const [showPassword2 , setShowPassword2] = useState(view);
    const [data2 , setdata2] = useState(true); 
    
    const navigate = useNavigate();

    const [authname , setAuthname] = useState('');
    const [authconfirmpassword , setAuthconfirmpassword] = useState('');
    const [authemail , setAuthemail] = useState('');
    const [authpassword , setAuthpassword] = useState('');

    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: "",
      })
    
      const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
        setAuthemail('');
        setAuthpassword('');
        setAuthconfirmpassword('');
        setAuthname('');
      }

      const handlesubmit = async (e) => {
        e.preventDefault();
        let b = true;
        const box = document.getElementById('confirm').value;
        if (!formdata.name && !formdata.email && !formdata.password && !box) {
            setAuthemail('Please provide an email address');
            setAuthpassword('Please provide password');
            setAuthname('Please provide a name');
            setAuthconfirmpassword('Please confirm your password');
            b = false;
        }
        if(!formdata.email.trim()){
            setAuthemail('Please provide a valid email address');
            b = false;
        }
        if(!formdata.password.trim()){
            setAuthpassword('Please provide a valid password');
            b = false;
        }
        if(!formdata.name.trim()){
            setAuthname('Please provide a valid name');
            b = false;
        }

        if (!/^[A-Za-z\s]+$/.test(formdata.name)) {
            setAuthname('Please provide a valid name');
            b = false;
        }

        const gmail = formdata.email ;
        const gmail1 = gmail.replace(/\s/g, '');
        const regex3 = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!regex3.test(gmail1)) {
            setAuthemail('Please provide a valid email address');
            b = false;
        }

        if(box != formdata.password){
            toast.error('Password does not match with Confirm Password!!', { duration: 1000 });
            return;
        }
    
        if(b == true){
            const response = await registerUser({ ...formdata });
        if (response.success == 'false') {
            toast.error(response.message, { duration: 1000 });
            return;
        }
        else{
            localStorage.setItem("token", response.token);
            localStorage.setItem("username", response.name);
            localStorage.setItem("password",formdata.password);
            localStorage.setItem("userid" , response.userid);
            toast.success(response.message, { duration: 2000 });
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
            <div className={styles.register}>Register</div>
            <div className={styles.namebox}>
                <img src={name} alt='' style={{ width: '2rem', height: '2rem' }} />
                <input type='text' placeholder='Name' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '25vw',
                    color: '#828282', paddingRight: '2rem', top: '0.5rem', outline: 'none'
                }} spellCheck='false' required onChange={handlechange}
                name='name' value={formdata.name}>
                </input>&nbsp;&nbsp;
            </div>
            <div className={styles.customname}>{authname}</div>

            <div className={styles.namebox} style={{top:'29vh'}}>
                <img src={email} alt='' style={{ width: '2rem', height: '2rem' }} />
                <input type='text' placeholder='Email' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '24.5vw',
                    color: '#828282', paddingRight: '2rem', outline: 'none' , marginLeft:'0.5vw'
                }} spellCheck='false' required onChange={handlechange}
                name='email' value={formdata.email}>
                </input>&nbsp;&nbsp;
            </div>
            <div className={styles.customname} style={{top:'34.9vh' , right:'22.7vw'}}>{authemail}</div>

            <div className={styles.namebox} style={{top:'39vh' , fontSize:'1.2rem'}}>
                <img src={password} alt='' style={{ width: '1.7rem', height: '1.7rem' }} />
                <input type = { data ? "password" : "text" } placeholder='Confirm Password' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '23.5vw',
                    color: '#828282', paddingRight: '2rem', outline: 'none' , marginLeft:'0.5vw'
                }} spellCheck='false' required id='confirm'>
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
            <div className={styles.customname} style={{top:'44.3vh' , right:'25.37vw'}}>{authconfirmpassword}</div>

            <div className={styles.namebox} style={{top:'48vh' , fontSize:'1.2rem'}}>
                <img src={password} alt='' style={{ width: '1.7rem', height: '1.7rem' }} />
                <input type = { data2 ? "password" : "text" } placeholder='Password' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '23.5vw',
                    color: '#828282', paddingRight: '2rem', outline: 'none' , marginLeft:'0.5vw'
                }} spellCheck='false' required onChange={handlechange}
                name='password' value={formdata.password}>
                </input>
                <img src={showPassword2} alt='' style={{ width: '1.5rem', height: '1.5rem' }} 
                onClick={() =>{
                    setdata2((prev)=>!prev)
                    if(data2 == true)
                    setShowPassword2(password);
                    else
                    setShowPassword2(view);
                }
                }/>
            </div>
            <div className={styles.customname} style={{top:'53.3vh' , right:'24.4vw'}}>{authpassword}</div>

            <div className={styles.registerbtn} onClick={handlesubmit}>Register</div><Toaster/>
            <div className={styles.havenoacc}>Have an account ?</div>
            <div className={styles.loginbtn} onClick={()=>{navigate('/login')}}>Log in</div>
        </>
    )
}
