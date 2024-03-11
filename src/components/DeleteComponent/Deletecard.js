import React from 'react';
import styles from './Deletecard.module.css';
import { carddelete } from '../../apis/todo';
import toast, { Toaster } from 'react-hot-toast';

export default function Deletecard(props) {

    const deletecard = async() => {
        const todoid = localStorage.getItem('delid');
        const response = await carddelete(todoid);
        
        if(localStorage.getItem('todotasks')){

          const todo = JSON.parse(localStorage.getItem('todotasks'));
          const todotasks = todo.filter(item => item._id !== todoid);
          localStorage.setItem('todotasks',JSON.stringify(todotasks));

        }

        if(localStorage.getItem('backlogtasks')){

          const backlog = JSON.parse(localStorage.getItem('backlogtasks'));
          const backlogtasks = backlog.filter(item => item._id !== todoid);
          localStorage.setItem('backlogtasks',JSON.stringify(backlogtasks));

        }

        if(localStorage.getItem('inprogresstasks')){

          const inprogress = JSON.parse(localStorage.getItem('inprogresstasks'));
          const inprogresstasks = inprogress.filter(item => item._id !== todoid);
          localStorage.setItem('inprogresstasks',JSON.stringify(inprogresstasks));

        }

        if(localStorage.getItem('donetasks')){

          const done = JSON.parse(localStorage.getItem('donetasks'));
          const donetasks = done.filter(item => item._id !== todoid);
          localStorage.setItem('donetasks',JSON.stringify(donetasks));

        }

        toast.success(response.message , {duration:2000});
        setTimeout(popupremove , 3000);
          
    }

    const popupremove = () => {
        props.settrigger(false);
        props.setchangecard(!(props.changecard));
    }

  return (props.trigger) ?
  (
    <>
    <div className={styles.popupcontainer}>
      <div className={styles.popup}>
          <div className={styles.asklogout}>Are you sure you want to Delete?</div>
          <div className={styles.yeslogout} onClick={deletecard}>Yes,  Delete</div><Toaster/>
          <div className={styles.cancel} onClick={()=>{props.settrigger(false);}}>Cancel</div>
      </div>
      </div>
    </>
) 
: 
"";
}
