import React from 'react';
import styles from './Deletecard.module.css';
import { carddelete } from '../../apis/todo';

export default function Deletecard(props) {

    const deletecard = async() => {
        const todoid = localStorage.getItem('delid');
        const response = await carddelete(todoid);
        props.settrigger(false);
    }

  return (props.trigger) ?
  (
    <>
    <div className={styles.popupcontainer}>
      <div className={styles.popup}>
          <div className={styles.asklogout}>Are you sure you want to Delete?</div>
          <div className={styles.yeslogout} onClick={deletecard}>Yes,  Delete</div>
          <div className={styles.cancel} onClick={()=>{props.settrigger(false);}}>Cancel</div>
      </div>
      </div>
    </>
) 
: 
"";
}
