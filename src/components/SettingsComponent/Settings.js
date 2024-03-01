import React, { useState } from 'react';
import Logout from '../LogoutComponent/Logout';
import styles from './Settings.module.css';
import settings from '../../assets/images/settings.png';
import promanage from '../../assets/images/promanage.png';
import board from '../../assets/images/board.png';
import analytics from '../../assets/images/analytics.png';
import logout from '../../assets/images/Logout.png';
import { useNavigate } from 'react-router-dom';
import password from '../../assets/icons/password.png';
import view from '../../assets/icons/view.png';
import name from '../../assets/icons/name.png';
import toast, { Toaster } from 'react-hot-toast';
import { updateUser } from '../../apis/auth';

export default function Settings() {

  const navigate = useNavigate();
  let [buttonlogout , setbuttonlogout] = useState(false);

  const [showPassword , setShowPassword] = useState(view);
  const [data , setdata] = useState(true);

  const [showPassword2 , setShowPassword2] = useState(view);
  const [data2 , setdata2] = useState(true); 

  const ogpassword = localStorage.getItem('password');

  const logoutbox = () => {
    setbuttonlogout(true);
  }  

  const previousname = localStorage.getItem('username');
  const [formdata, setformdata] = useState({
    name: previousname,
    password: "",
    userid : localStorage.getItem('userid')
  })

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const old = document.getElementById('old').value;
    if (formdata.password){
      console.log(old);
      console.log(ogpassword);
    if (old !== ogpassword)
    {
      toast.error("Please enter your original password correctly to proceed!!" , { duration: 2000 });
      return;
    }
  }

    const response = await updateUser({ ...formdata });
    console.log(response);

    if (response == undefined) {
      toast.error('Please provide valid name and/or password!!' , { duration: 1000 });
      return;
  }
    
    if (response.success == 'false') {
        toast.error(response.message , { duration: 1000 });
        return;
    }
    if (response.success == 'p') {
      toast.success(response.message , { duration: 1000 });
      localStorage.setItem('password' , response.password);
      return;
    }

    if (response.success == 'n') {
      toast.success(response.message , { duration: 1000 });
      localStorage.setItem('username' , response.name);
      return;
    }

    if (response.success == 'np') {
      toast.success(response.message , { duration: 1000 });
      localStorage.setItem('username' , response.name);
      localStorage.setItem('password' , response.password);
      return;
    }

  }

  return (
    <>
    <div style={{display:'flex'}}>
      <div className={styles.menu}>
        <div style={{display:'flex' , marginTop:'3vh' , marginLeft:'3vw'}}>
          <img src={promanage} alt=''/>
          <div className={styles.promanage}>Pro Manage</div>
        </div>

        <div className={styles.board} onClick={()=>{navigate('/')}}>
          <img src={board} alt='' style={{marginLeft:'3vw'}}/>
          <div className={styles.promanage} style={{color:'#707070' , fontWeight:'500'}}>Board</div>
        </div>

        <div className={styles.board} onClick={()=>{navigate('/analytics')}}>
          <img src={analytics} alt='' style={{marginLeft:'3vw'}}/>
          <div className={styles.promanage} style={{color:'#707070' , fontWeight:'500'}}>Analytics</div>
        </div>

        <div className={styles.board} style={{background:'#EDF5FE'}}>
          <img src={settings} alt='' style={{marginLeft:'3vw'}}/>
          <div className={styles.promanage}>Settings</div>
        </div>

        <div style={{display:'flex' , marginLeft:'3.25vw' , marginTop:'60vh'}}>
          <img src={logout} alt='' />
          <div className={styles.logout} onClick={logoutbox}>Log out</div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.settings}>Settings</div>
        <div className={styles.namebox}>
                <img src={name} alt='' style={{ width: '1.5rem', height: '1.5rem' , padding:'0.5rem', paddingRight:'0rem'}} />
                <input type='text' placeholder='Name' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '25vw',
                    color: '#828282', paddingRight: '2rem', top: '0.5rem', outline: 'none'
                }} spellCheck='false' required onChange={handlechange} 
                name='name' value={formdata.name}>
                </input>&nbsp;&nbsp;
        </div>

        <div className={styles.namebox} style={{fontSize:'1.2rem'}}>
                <img src={password} alt='' style={{ width: '1.5rem', height: '1.5rem' , padding: '0.5rem', paddingRight:'0rem'}} />
                <input type = { data ? "password" : "text" } placeholder='Old Password' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '23.2vw',
                    color: '#828282', paddingRight: '2rem', outline: 'none'
                }} spellCheck='false' required id='old'>
                </input>
                <img src={showPassword} alt='' style={{ width: '1.5rem', height: '1.5rem' , padding: '0.5rem', paddingRight:'0rem'}} 
                onClick={() =>{
                    setdata((prev)=>!prev)
                    if(data == true)
                    setShowPassword(password);
                    else
                    setShowPassword(view);
                }
                }/>
        </div>

        <div className={styles.namebox} style={{fontSize:'1.2rem'}}>
                <img src={password} alt='' style={{ width: '1.5rem', height: '1.5rem' , padding: '0.5rem', paddingRight:'0rem'}} />
                <input type = { data2 ? "password" : "text" } placeholder='New Password' style={{
                    borderColor: 'white', borderStyle: 'solid', width: '23.2vw',
                    color: '#828282', paddingRight: '2rem', outline: 'none'
                }} spellCheck='false' required onChange={handlechange}
                name='password' value={formdata.password}>
                </input>
                <img src={showPassword2} alt='' style={{ width: '1.5rem', height: '1.5rem' , padding: '0.5rem', paddingRight:'0rem'}} 
                onClick={() =>{
                    setdata2((prev)=>!prev)
                    if(data2 == true)
                    setShowPassword2(password);
                    else
                    setShowPassword2(view);
                }
                }/>
        </div>

        <div className={styles.updatebtn} onClick={handlesubmit}>Update</div><Toaster/>
      </div>

      </div>
      <Logout trigger={buttonlogout} settrigger={setbuttonlogout} />
    </>

)
}
