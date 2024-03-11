import React, { useState, useEffect } from 'react';
import styles from './Todocardinfo.module.css';
import { gettodocardinfo } from '../../apis/todo';
import toast, { Toaster } from 'react-hot-toast';
import promanage from '../../assets/images/promanage.png';
import { useNavigate } from 'react-router-dom';

export default function Todocardinfo() {

  const [todofetch, settodofetch] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchcarddetails();
  }, []);

  const fetchcarddetails = async () => {
    const todoid = window.location.pathname?.split("/").slice(-1)[0];
    if (!todoid) {
      toast.error('Wrong or invalid link!!', { duration: 1000 });
    }

    const response = await gettodocardinfo(todoid);
    if (!response) {
      toast.error('Oops , this card does not exist!!', { duration: 2000 });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    settodofetch(response);
  }

  return (
    <>
      <Toaster />
      <div className={styles.responsive}>
        <div className={styles.menu}>
          <div className={styles.heading}>
            <img src={promanage} alt='' />
            <div className={styles.promanage} onClick={() => { console.log(todofetch) }}>Pro Manage</div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.container}>
            {
              todofetch ?
                <>
                  <div className={styles.line1}>
                    <div style={{
                      width: '0.5rem', height: '0.5rem', borderRadius: '50%',
                      backgroundColor:
                        (todofetch.priority == 'HIGH PRIORITY')
                          ?
                          '#FF2473'
                          :
                          (todofetch.priority == 'LOW PRIORITY')
                            ?
                            '#63C05B'
                            :
                            '#18B0FF'
                    }}
                    />
                    <div className={styles.priority}>{todofetch.priority}</div>
                  </div>
                  <div className={styles.title}>{todofetch.title}</div>
                  <div className={styles.checklist}>Checklist (
                    {todofetch.checklists.filter((item) => item.done === true).length}
                    /{todofetch.checklists.length})
                  </div>
                  <div className={styles.checklistdisplay}>

                    {todofetch.checklists.map((item) => (
                      <>
                        <div className={styles.box}>
                          <input type='checkbox' checked={item.done} />
                          <div className={styles.taskname}>{item.taskname}</div>
                        </div>
                        <div style={{ height: '2vh' }} />
                      </>
                    )
                    )
                    }
                  </div>
                  {
                    todofetch.duedate ?
                      <>
                        <div className={styles.lastline}>
                          <div className={styles.duedate}>Due Date</div>
                          <div className={styles.display}>{todofetch.duedate}</div>
                        </div>
                      </>
                      :
                      <div style={{ marginTop: '4vh' }} />
                  }

                </>
                :
                ""
            }

          </div>
        </div>
      </div>
    </>
  )
}
