import React from 'react';
import styles from './Logout.module.css';
import { useNavigate } from 'react-router-dom';

export default function Logout(props) {

    const navigate = useNavigate();
    const logout = () =>{
        localStorage.clear();
        navigate('/login');
        props.settrigger(false);
    }

    return (props.trigger) ?
    (
      <>
      <div className={styles.popupcontainer}>
        <div className={styles.popup}>
            <div className={styles.asklogout}>Are you sure you want to Logout?</div>
            <div className={styles.yeslogout} onClick={logout}>Yes,  Logout</div>
            <div className={styles.cancel} onClick={()=>{props.settrigger(false);}}>Cancel</div>
        </div>
        </div>
      </>
  ) 
  : 
  "";
}
