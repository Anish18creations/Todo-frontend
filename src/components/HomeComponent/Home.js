import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import settings from '../../assets/images/settings.png';
import promanage from '../../assets/images/promanage.png';
import board from '../../assets/images/board.png';
import analytics from '../../assets/images/analytics.png';
import expand from '../../assets/images/expand.png';
import add from '../../assets/images/add.png';
import logout from '../../assets/images/Logout.png';
import AddCard from '../AddCardComponent/AddCard';
import Logout from '../LogoutComponent/Logout';
import { useNavigate } from 'react-router-dom';
import { cardinfo } from '../../apis/todo';
import expandforone from '../../assets/images/expandone.png';

export default function Home() {

  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const today = new Date();
  const day = today.getDate();
  const shortmonth = today.toLocaleString('en-US', { month: 'short' }) + ", ";
  const year = today.getFullYear();
  let v;
  if (day == 1 || day == 21 || day == 31)
    v = "st ";
  else if (day == 2 || day == 22)
    v = "nd ";
  else if (day == 3 || day == 23)
    v = "rd ";
  else
    v = "th ";

  const formattedDate = `${day}${v}${shortmonth}${year}`;

  let [buttonpopup, setbuttonpopup] = useState(false);
  let [buttonlogout, setbuttonlogout] = useState(false);
  let [todotasks, settodotasks] = useState([]);
  let [inprogresstasks, setinprogresstasks] = useState([]);
  let [backlogtasks, setbacklogtasks] = useState([]);
  let [cardmove , setcardmove] = useState(false);

  const addcard = () => {
    setbuttonpopup(true);
  }

  const logoutbox = () => {
    setbuttonlogout(true);
  }

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    
    fetchcarddetails();
    }, [cardmove])

  const fetchcarddetails = async () => {
    const response = await cardinfo();
    if(!localStorage.getItem('todotasks')){
      settodotasks(response);
      localStorage.setItem('todotasks' , JSON.stringify(response));
      console.log(JSON.parse(localStorage.getItem('todotasks')));
    }
    else
    settodotasks(JSON.parse(localStorage.getItem('todotasks')));
    
    if(localStorage.getItem('inprogresstasks'))
    setinprogresstasks(JSON.parse(localStorage.getItem('inprogresstasks')));

    if(localStorage.getItem('backlogtasks'))
    setbacklogtasks(JSON.parse(localStorage.getItem('backlogtasks')));
  }

  const todotoProgress = (i) => {
    
    const newItems = todotasks.splice(i, 1);
    inprogresstasks.push(newItems[0]);
    setinprogresstasks(inprogresstasks);
    localStorage.setItem('todotasks' , JSON.stringify(todotasks));
    localStorage.setItem('inprogresstasks' , JSON.stringify(inprogresstasks));
    setcardmove((prev) => !prev);
  }

  const todotoBacklog = (i) => {

    const newItems = todotasks.splice(i, 1);
    backlogtasks.push(newItems[0]);
    setbacklogtasks(backlogtasks);
    localStorage.setItem('todotasks' , JSON.stringify(todotasks));
    localStorage.setItem('backlogtasks' , JSON.stringify(backlogtasks));
    setcardmove((prev) => !prev);
  }

  const inprogresstoBacklog = (i) => {

    const newItems = inprogresstasks.splice(i, 1);
    backlogtasks.push(newItems[0]);
    setbacklogtasks(backlogtasks);
    localStorage.setItem('inprogresstasks' , JSON.stringify(inprogresstasks));
    localStorage.setItem('backlogtasks' , JSON.stringify(backlogtasks));
    setcardmove((prev) => !prev);
  }

  const inprogresstoTodo = (i) => {

    const newItems = inprogresstasks.splice(i, 1);
    todotasks.push(newItems[0]);
    settodotasks(todotasks);
    localStorage.setItem('inprogresstasks' , JSON.stringify(inprogresstasks));
    localStorage.setItem('todotasks' , JSON.stringify(todotasks));
    setcardmove((prev) => !prev);
  }

  const backlogtoTodo = (i) => {

    const newItems = backlogtasks.splice(i, 1);
    todotasks.push(newItems[0]);
    settodotasks(todotasks);
    localStorage.setItem('backlogtasks' , JSON.stringify(backlogtasks));
    localStorage.setItem('todotasks' , JSON.stringify(todotasks));
    setcardmove((prev) => !prev);  
  }

  const backlogtoInprogress = (i) => {

    const newItems = backlogtasks.splice(i, 1);
    inprogresstasks.push(newItems[0]);
    setinprogresstasks(inprogresstasks);
    localStorage.setItem('backlogtasks' , JSON.stringify(backlogtasks));
    localStorage.setItem('inprogresstasks' , JSON.stringify(inprogresstasks));
    setcardmove((prev) => !prev); 
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className={styles.menu}>
          <div style={{ display: 'flex', marginTop: '3vh', marginLeft: '3vw' }}>
            <img src={promanage} alt='' />
            <div className={styles.promanage} onClick={()=>{console.log(todotasks)}}>Pro Manage</div>
          </div>

          <div className={styles.board} style={{ background: '#EDF5FE' }}>
            <img src={board} alt='' style={{ marginLeft: '3vw' }} />
            <div className={styles.promanage}>Board</div>
          </div>

          <div className={styles.board} onClick={() => { navigate('/analytics') }}>
            <img src={analytics} alt='' style={{ marginLeft: '3vw' }} />
            <div className={styles.promanage} style={{ color: '#707070', fontWeight: '500' }}>Analytics</div>
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

          <div style={{ display: 'flex' }}>
            <div className={styles.welcome}>
              Welcome! {username}
            </div>
            <div className={styles.todaysdate}>{formattedDate}</div>
          </div>

          <div className={styles.boardtxt}>Board</div>

          <div style={{ display: 'flex' }}>

            <div className={styles.cards}>

              <div style={{ display: 'flex' }}>
                <div className={styles.back}>Backlog</div>
                <img src={expand} className={styles.expand} alt='' />
              </div>

              <div className={styles.displaytodotasks}>
                {
                  backlogtasks ?
                    <>
                      {
                        backlogtasks.map((task , index) => (
                          <>
                            <div className={styles.container}>
                              <div style={{ display: 'flex', marginLeft: '1vw' }}>
                                <div style={{
                                  width: '0.5rem', height: '0.5rem', borderRadius: '50%', marginTop: '2vh',
                                  backgroundColor:
                                    (task.priority == 'HIGH PRIORITY')
                                      ?
                                      '#FF2473'
                                      :
                                      (task.priority == 'LOW PRIORITY')
                                        ?
                                        '#63C05B'
                                        :
                                        '#18B0FF'
                                }}
                                />
                                <div className={styles.priority}>{task.priority}</div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '7vw', marginTop: '2.5vh'
                                }}></div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '0.2vw', marginTop: '2.5vh'
                                }}></div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '0.2vw', marginTop: '2.5vh'
                                }}></div>
                              </div>
                              <div className={styles.title}>{task.title}</div>
                              <div style={{ display: 'flex' }}>
                                <div className={styles.checklist}>Checklist (
                                  {task.checklists.filter((item) => item.done === true).length}
                                  /{task.checklists.length})
                                </div>
                                <img src={expandforone} style={{ marginLeft: '7vw' }} alt='' />
                              </div>
                              <div className={styles.checklistdisplay}>

                                {task.checklists.map((item) => (
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
                                task.duedate ?
                                  <>
                                    <div className={styles.lastline}>
                                      <div className={styles.display}>{task.duedate}</div>
                                      <div className={styles.backlog} style={{ marginLeft: '3.5vw' }} onClick={()=>backlogtoTodo(index)}>TO-DO</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }} onClick={()=>backlogtoInprogress(index)}>PROGRESS</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }}>DONE</div>
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div className={styles.lastline}>
                                      <div className={styles.backlog} style={{ marginLeft: '7.5vw' }} onClick={()=>backlogtoTodo(index)}>TO-DO</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }} onClick={()=>backlogtoInprogress(index)}>PROGRESS</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }}>DONE</div>
                                    </div>
                                  </>
                              }
                            </div>
                            <div style={{ height: '2.5vh' }}></div>
                          </>
                        ))
                      }
                    </>
                    :
                    ""
                }
                </div>
            </div>

            <div className={styles.cards}>

              <div style={{ display: 'flex' }}>
                <div className={styles.back}>To do</div>
                <img src={add} className={styles.expand} style={{ marginLeft: '13vw' }} onClick={addcard} alt='' />
                <img src={expand} className={styles.expand} style={{ marginLeft: '1.5vw' }} alt='' />
              </div>

              <div className={styles.displaytodotasks}>
                {
                  todotasks ?
                    <>
                      {
                        todotasks.map((task , index) => (
                          <>
                            <div className={styles.container}>
                              <div style={{ display: 'flex', marginLeft: '1vw' }}>
                                <div style={{
                                  width: '0.5rem', height: '0.5rem', borderRadius: '50%', marginTop: '2vh',
                                  backgroundColor:
                                    (task.priority == 'HIGH PRIORITY')
                                      ?
                                      '#FF2473'
                                      :
                                      (task.priority == 'LOW PRIORITY')
                                        ?
                                        '#63C05B'
                                        :
                                        '#18B0FF'
                                }}
                                />
                                <div className={styles.priority}>{task.priority}</div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '7vw', marginTop: '2.5vh'
                                }}></div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '0.2vw', marginTop: '2.5vh'
                                }}></div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '0.2vw', marginTop: '2.5vh'
                                }}></div>
                              </div>
                              <div className={styles.title}>{task.title}</div>
                              <div style={{ display: 'flex' }}>
                                <div className={styles.checklist}>Checklist (
                                  {task.checklists.filter((item) => item.done === true).length}
                                  /{task.checklists.length})
                                </div>
                                <img src={expandforone} style={{ marginLeft: '7vw' }} alt='' />
                              </div>
                              <div className={styles.checklistdisplay}>

                                {task.checklists.map((item) => (
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
                                task.duedate ?
                                  <>
                                    <div className={styles.lastline}>
                                      <div className={styles.display}>{task.duedate}</div>
                                      <div className={styles.backlog} style={{ marginLeft: '3.5vw' }} onClick={()=>todotoBacklog(index)}>BACKLOG</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }} onClick={()=>todotoProgress(index)}>PROGRESS</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }}>DONE</div>
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div className={styles.lastline}>
                                      <div className={styles.backlog} style={{ marginLeft: '7.5vw' }} onClick={()=>todotoBacklog(index)}>BACKLOG</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }} onClick={()=>todotoProgress(index)}>PROGRESS</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }}>DONE</div>
                                    </div>
                                  </>
                              }
                            </div>
                            <div style={{ height: '2.5vh' }}></div>
                          </>
                        ))
                      }
                    </>
                    :
                    ""
                }

              </div>
            </div>

            <div className={styles.cards}>

              <div style={{ display: 'flex' }}>
                <div className={styles.back} style={{ width: '10vw' }}>In progress</div>
                <img src={expand} className={styles.expand} style={{ marginLeft: '8vw' }} alt='' />
              </div>

              <div className={styles.displaytodotasks}>
                {
                  inprogresstasks ?
                    <>
                      {
                        inprogresstasks.map((task , index) => (
                          <>
                            <div className={styles.container}>
                              <div style={{ display: 'flex', marginLeft: '1vw' }}>
                                <div style={{
                                  width: '0.5rem', height: '0.5rem', borderRadius: '50%', marginTop: '2vh',
                                  backgroundColor:
                                    (task.priority == 'HIGH PRIORITY')
                                      ?
                                      '#FF2473'
                                      :
                                      (task.priority == 'LOW PRIORITY')
                                        ?
                                        '#63C05B'
                                        :
                                        '#18B0FF'
                                }}
                                />
                                <div className={styles.priority}>{task.priority}</div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '7vw', marginTop: '2.5vh'
                                }}></div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '0.2vw', marginTop: '2.5vh'
                                }}></div>
                                <div style={{
                                  width: '0.125rem', height: '0.125rem', borderRadius: '50%', borderStyle: 'solid',
                                  borderWidth: '0.08rem', background: 'black', marginLeft: '0.2vw', marginTop: '2.5vh'
                                }}></div>
                              </div>
                              <div className={styles.title}>{task.title}</div>
                              <div style={{ display: 'flex' }}>
                                <div className={styles.checklist}>Checklist (
                                  {task.checklists.filter((item) => item.done === true).length}
                                  /{task.checklists.length})
                                </div>
                                <img src={expandforone} style={{ marginLeft: '7vw' }} alt='' />
                              </div>
                              <div className={styles.checklistdisplay}>

                                {task.checklists.map((item) => (
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
                                task.duedate ?
                                  <>
                                    <div className={styles.lastline}>
                                      <div className={styles.display}>{task.duedate}</div>
                                      <div className={styles.backlog} style={{ marginLeft: '3.5vw' }} onClick={()=>inprogresstoBacklog(index)}>BACKLOG</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }} onClick={()=>inprogresstoTodo(index)}>TO-DO</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }}>DONE</div>
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div className={styles.lastline}>
                                      <div className={styles.backlog} style={{ marginLeft: '7.5vw' }} onClick={()=>inprogresstoBacklog(index)}>BACKLOG</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }} onClick={()=>inprogresstoTodo(index)}>TO-DO</div>
                                      <div className={styles.backlog} style={{ marginLeft: '0.5vw' }}>DONE</div>
                                    </div>
                                  </>
                              }
                            </div>
                            <div style={{ height: '2.5vh' }}></div>
                          </>
                        ))
                      }
                    </>
                    :
                    ""
                }

              </div>
            </div>

            <div className={styles.cards}>

              <div style={{ display: 'flex' }}>
                <div className={styles.back}>Done</div>
                <img src={expand} className={styles.expand} style={{ marginLeft: '15.5vw' }} alt='' />
              </div>

            </div>

          </div>

        </div>

      </div>
      <AddCard trigger={buttonpopup} settrigger={setbuttonpopup} />
      <Logout trigger={buttonlogout} settrigger={setbuttonlogout} />
    </>
  )
}
