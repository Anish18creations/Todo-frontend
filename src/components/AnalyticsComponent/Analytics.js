import React, { useEffect, useState } from 'react';
import styles from './Analytics.module.css';
import Logout from '../LogoutComponent/Logout';
import settings from '../../assets/images/settings.png';
import promanage from '../../assets/images/promanage.png';
import board from '../../assets/images/board.png';
import analytics from '../../assets/images/analytics.png';
import logout from '../../assets/images/Logout.png';
import { useNavigate } from 'react-router-dom';
import { AnalyticsofCards } from '../../apis/todo';

export default function Analytics() {

  const navigate = useNavigate();
  let [buttonlogout , setbuttonlogout] = useState(false);
  let [high,sethigh] = useState();
  let [moderate,setmoderate] = useState();
  let [low,setlow] = useState();
  let [noofbacklogtasks , setnoofbacklogtasks] = useState();
  let [nooftodotasks , setnooftodotasks] = useState();
  let [noofinprogresstasks , setnoofinprogresstasks] = useState();
  let response ;

  const logoutbox = () => {
    setbuttonlogout(true);
  } 

  useEffect(()=>{
    fetchnoofjobs();
  })

  const fetchnoofjobs = async() =>{
     response = await AnalyticsofCards();
    sethigh(response.highpriority);
    setmoderate(response.moderatepriority);
    setlow(response.lowpriority);
    if(localStorage.getItem('todotasks'))
    setnooftodotasks(JSON.parse(localStorage.getItem('todotasks')).length);
    if(localStorage.getItem('backlogtasks'))
    setnoofbacklogtasks(JSON.parse(localStorage.getItem('backlogtasks')).length);
    if(localStorage.getItem('inprogresstasks'))
    setnoofinprogresstasks(JSON.parse(localStorage.getItem('inprogresstasks')).length);

    console.log(noofbacklogtasks , noofinprogresstasks , nooftodotasks);
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

        <div className={styles.board} style={{background:'#EDF5FE'}}>
          <img src={analytics} alt='' style={{marginLeft:'3vw'}}/>
          <div className={styles.promanage}>Analytics</div>
        </div>

        <div className={styles.board} onClick={()=>{navigate('/settings')}}>
          <img src={settings} alt='' style={{marginLeft:'3vw'}}/>
          <div className={styles.promanage} style={{color:'#707070' , fontWeight:'500'}}>Settings</div>
        </div>

        <div style={{display:'flex' , marginLeft:'3.25vw' , marginTop:'60vh'}}>
          <img src={logout} alt='' />
          <div className={styles.logout} onClick={logoutbox}>Log out</div>
        </div>
      </div>

      <div className={styles.main}>
      <div className={styles.analytics}>Analytics</div>
      <div className={styles.twosections}>
        <div>
          <div style={{display:'flex'}}>
            <div style={{width:'0.5rem' , height:'0.5rem', background:'#90C4CC' , borderRadius:'50%'}}/>
            <div className={styles.title}>Backlog Tasks</div>
            <div className={styles.count}>{noofbacklogtasks}</div>
          </div>
          <br/>
          <div style={{display:'flex'}}>
            <div style={{width:'0.5rem' , height:'0.5rem', background:'#90C4CC' , borderRadius:'50%'}}/>
            <div className={styles.title}>To-do Tasks</div>
            <div className={styles.count}>{nooftodotasks}</div>
          </div>
          <br/>
          <div style={{display:'flex'}}>
            <div style={{width:'0.5rem' , height:'0.5rem', background:'#90C4CC' , borderRadius:'50%'}}/>
            <div className={styles.title}>In-Progress Tasks</div>
            <div className={styles.count}>{noofinprogresstasks}</div>
          </div>
          <br/>
          <div style={{display:'flex'}}>
            <div style={{width:'0.5rem' , height:'0.5rem', background:'#90C4CC' , borderRadius:'50%'}}/>
            <div className={styles.title}>Completed Tasks</div>
            <div className={styles.count}>15</div>
          </div>
        </div>

        <div style={{marginLeft:'5vw' , marginTop:'-0.3vh'}}>
          <div style={{display:'flex'}}>
            <div style={{width:'0.5rem' , height:'0.5rem', background:'#90C4CC' , borderRadius:'50%'}}/>
            <div className={styles.title}>Low Priority</div>
            <div className={styles.count}>{low}</div>
          </div>
          <br/>
          <div style={{display:'flex'}}>
            <div style={{width:'0.5rem' , height:'0.5rem', background:'#90C4CC' , borderRadius:'50%'}}/>
            <div className={styles.title}>Moderate Priority</div>
            <div className={styles.count}>{moderate}</div>
          </div>
          <br/>
          <div style={{display:'flex'}}>
            <div style={{width:'0.5rem' , height:'0.5rem', background:'#90C4CC' , borderRadius:'50%'}}/>
            <div className={styles.title}>High Priority</div>
            <div className={styles.count}>{high}</div>
          </div>
          <br/>
          <div style={{display:'flex'}}>
            <div style={{width:'0.5rem' , height:'0.5rem', background:'#90C4CC' , borderRadius:'50%'}}/>
            <div className={styles.title}>Due Date Tasks</div>
            <div className={styles.count}>15</div>
          </div>
        </div>
        
        </div>
        <div>

        </div>
      </div>
      </div>

      
      <Logout trigger={buttonlogout} settrigger={setbuttonlogout} />
      </>
  )
}
