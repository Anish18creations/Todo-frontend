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
import moment from 'moment';

export default function Analytics() {

  const navigate = useNavigate();
  let [buttonlogout, setbuttonlogout] = useState(false);
  let [high, sethigh] = useState();
  let [moderate, setmoderate] = useState();
  let [low, setlow] = useState();
  let [noofbacklogtasks, setnoofbacklogtasks] = useState();
  let [nooftodotasks, setnooftodotasks] = useState();
  let [noofinprogresstasks, setnoofinprogresstasks] = useState();
  let [noofdonetasks, setnoofdonetasks] = useState();
  let [duedatetasks, setduedatetasks] = useState();
  let response;

  const logoutbox = () => {
    setbuttonlogout(true);
  }

  useEffect(() => {
    fetchnoofjobs();
  }, []);

  const fetchnoofjobs = async () => {
    response = await AnalyticsofCards();
    let count = 0;
    sethigh(response.highpriority);
    setmoderate(response.moderatepriority);
    setlow(response.lowpriority);
    const today = localStorage.getItem('today');
    if (localStorage.getItem('todotasks')) {
      setnooftodotasks(JSON.parse(localStorage.getItem('todotasks')).length);
      const todotasks = JSON.parse(localStorage.getItem('todotasks'));
      todotasks.map((item) => {
        if (item.duedateunformatted) {
          if (moment(item.duedateunformatted, "MM/DD/YYYY").diff(moment(today, "MM/DD/YYYY"), "days") > 0)
            count++;
        }
      })
    }
    else
      setnooftodotasks(0);

    if (localStorage.getItem('backlogtasks')) {
      setnoofbacklogtasks(JSON.parse(localStorage.getItem('backlogtasks')).length);
      const backlogtasks = JSON.parse(localStorage.getItem('backlogtasks'));
      backlogtasks.map((item) => {
        if (item.duedateunformatted) {
          if (moment(item.duedateunformatted, "MM/DD/YYYY").diff(moment(today, "MM/DD/YYYY"), "days") > 0)
            count++;
        }
      })
    }
    else
      setnoofbacklogtasks(0);

    if (localStorage.getItem('inprogresstasks')) {
      setnoofinprogresstasks(JSON.parse(localStorage.getItem('inprogresstasks')).length);
      const inprogresstasks = JSON.parse(localStorage.getItem('inprogresstasks'));
      inprogresstasks.map((item) => {
        if (item.duedateunformatted) {
          if (moment(item.duedateunformatted, "MM/DD/YYYY").diff(moment(today, "MM/DD/YYYY"), "days") > 0)
            count++;
        }
      })
    }
    else
      setnoofinprogresstasks(0);

    if (localStorage.getItem('donetasks'))
      setnoofdonetasks(JSON.parse(localStorage.getItem('donetasks')).length);
    else
      setnoofdonetasks(0);

    setduedatetasks(count);
  }


  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className={styles.menu}>
          <div style={{ display: 'flex', marginTop: '3vh', marginLeft: '3vw' }}>
            <img src={promanage} alt='' />
            <div className={styles.promanage}>Pro Manage</div>
          </div>

          <div className={styles.board} onClick={() => { navigate('/') }}>
            <img src={board} alt='' style={{ marginLeft: '3vw' }} />
            <div className={styles.promanage} style={{ color: '#707070', fontWeight: '500' }}>Board</div>
          </div>

          <div className={styles.board} style={{ background: '#EDF5FE' }}>
            <img src={analytics} alt='' style={{ marginLeft: '3vw' }} />
            <div className={styles.promanage}>Analytics</div>
          </div>

          <div className={styles.board} onClick={() => { navigate('/settings') }}>
            <img src={settings} alt='' style={{ marginLeft: '3vw' }} />
            <div className={styles.promanage} style={{ color: '#707070', fontWeight: '500' }}>Settings</div>
          </div>

          <div style={{ display: 'flex', marginLeft: '3.25vw', marginTop: '60vh' }}>
            <img src={logout} alt='' />
            <div className={styles.logout} onClick={logoutbox}>Log out</div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.analytics}>Analytics</div>
          <div className={styles.twosections}>
            <div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', background: '#90C4CC', borderRadius: '50%' }} />
                <div className={styles.title}>Backlog Tasks</div>
                <div className={styles.count}>{noofbacklogtasks}</div>
              </div>
              <br />
              <div style={{ display: 'flex' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', background: '#90C4CC', borderRadius: '50%' }} />
                <div className={styles.title}>To-do Tasks</div>
                <div className={styles.count}>{nooftodotasks}</div>
              </div>
              <br />
              <div style={{ display: 'flex' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', background: '#90C4CC', borderRadius: '50%' }} />
                <div className={styles.title}>In-Progress Tasks</div>
                <div className={styles.count}>{noofinprogresstasks}</div>
              </div>
              <br />
              <div style={{ display: 'flex' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', background: '#90C4CC', borderRadius: '50%' }} />
                <div className={styles.title}>Completed Tasks</div>
                <div className={styles.count}>{noofdonetasks}</div>
              </div>
            </div>

            <div style={{ marginLeft: '5vw', marginTop: '-0.3vh' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', background: '#90C4CC', borderRadius: '50%' }} />
                <div className={styles.title}>Low Priority</div>
                <div className={styles.count}>{low}</div>
              </div>
              <br />
              <div style={{ display: 'flex' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', background: '#90C4CC', borderRadius: '50%' }} />
                <div className={styles.title}>Moderate Priority</div>
                <div className={styles.count}>{moderate}</div>
              </div>
              <br />
              <div style={{ display: 'flex' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', background: '#90C4CC', borderRadius: '50%' }} />
                <div className={styles.title}>High Priority</div>
                <div className={styles.count}>{high}</div>
              </div>
              <br />
              <div style={{ display: 'flex' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', background: '#90C4CC', borderRadius: '50%' }} />
                <div className={styles.title}>Due Date Tasks</div>
                <div className={styles.count}>{duedatetasks}</div>
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
