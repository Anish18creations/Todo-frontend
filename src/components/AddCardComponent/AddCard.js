import React , { useState } from 'react';
import styles from './AddCard.module.css';
import Delete from '../../assets/icons/Delete.png';

export default function AddCard(props) {

  let [count , setcount] = useState(-1);
  const [date, setDate] = useState("");
  const [totalchecklist , settotalchecklist] = useState(0);
  let [selectedchecklist , setselectedchecklist] = useState(0);
  const [checklist , setchecklist] = useState([]);
  let b = false;
  /*if (check.checked) {
    console.log('hii');
  } else {
    console.log('anish');
  }*/

  const checkoruncheck = (f) => {
    console.log(f);
    const check = document.getElementById(f);
    if (check.checked == true) {
      setselectedchecklist(++selectedchecklist);
    } 
    else 
    {
      setselectedchecklist(--selectedchecklist);
    }
  }

  const addtask = () => {
    setcount(++count);
    setchecklist([...checklist , count]);
  }

  const handle = (c,e) =>{
    localStorage.setItem(c , e.target.value);
  }

  const deltask = (f) => {
    //setselectedchecklist(--selectedchecklist);
    //console.log(f);
    const check = document.getElementById(f);
    if (check.checked == true) {
      setselectedchecklist(--selectedchecklist);
    } 
    //setselectedchecklist(--selectedchecklist);
    /*const newchecklist = checklist.filter((list) => list !== f);
    
    setchecklist([...newchecklist]);*/
    const x = checklist.splice(f,1);
    setchecklist([...checklist]);
    localStorage.removeItem(f);
    console.log('hello');
    //console.log(checklist);
  }

  const handleChange = () => {
    const val = document.getElementById('customdate').value;
    const myArray = val.split("-");

        let year = myArray[0];
        let month = myArray[1];
        let day = myArray[2];

        let formatteddate = month + "/" + day + "/" + year; 
        setDate(formatteddate);
  };

  return (props.trigger) ?
  (
    <>
        <div className={styles.popupcontainer}>
        <div className={styles.popup}>
            <div style={{display:'flex' , marginLeft:'3vw' , marginTop:'2vh'}}>
            <div className={styles.title} onClick={()=>{console.log(date);}}>Title&nbsp;</div>
            <div className={styles.title} style={{color:'#FF0000'}}>*</div> 
            </div>
        <input type='text' placeholder='Enter Task Title' className={styles.tasktitle} />
        <div style={{display:'flex', marginLeft:'3vw' , marginTop:'2vh'}}>
            <div className={styles.selectpriority}>Select Priority&nbsp;</div>
            <div className={styles.selectpriority} style={{color:'#FF0000'}}>*</div>
            <div className={styles.priority}>
            <div className={styles.red}/>
            <div className={styles.highpriority}>HIGH PRIORITY</div>
            </div>
            <div className={styles.priority} style={{width:'9vw'}}>
            <div className={styles.red} style={{background:'#18B0FF'}}/>
            <div className={styles.highpriority}>MODERATE PRIORITY</div>
            </div>
            <div className={styles.priority}>
            <div className={styles.red} style={{background:'#63C05B'}}/>
            <div className={styles.highpriority}>LOW PRIORITY</div>
            </div>
        </div>
        <div className={styles.checklisttitle} style={{display:'flex'}}>
          Checklist ({selectedchecklist}/{checklist.length})&nbsp;
          <div style={{color:'#FF0000'}}>*</div>
        </div>
        <div className={styles.checklist}>
        {checklist.map((count) => {
              return (
                <>
                  <div className={styles.box} key={count}>
                    <input type='checkbox' className={styles.checkbox} id={count} onChange={()=>checkoruncheck(count)} />
                    <input type='text' className={styles.inputchecklist} id={count} spellCheck={false}
                    onChange={(e)=>handle(count,e)} 
                    /*value={localStorage.getItem(count)?localStorage.getItem(count):""}*/ />
                    <img src={Delete} alt='' className={styles.delete} id={count} onClick={()=>deltask(count)} />
                  </div>
                 </>
              )
            })}
             <div className={styles.addnew} onClick={()=>addtask()}>+ Add New</div>
        </div>
        <div style={{display:'flex', marginLeft:'3vw' , marginTop:'7.5vh'}}>
        <input type="date" id='customdate' onChange={handleChange} />  
          <div className={styles.cancel} onClick={()=>{props.settrigger(false);}}>
            Cancel</div>
          <div className={styles.save}>Save</div>
        </div>
        </div>
        </div>
    </>
  ) 
  : 
  "";
}
