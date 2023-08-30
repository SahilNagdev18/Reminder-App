import React,{useState,useEffect} from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
function Whatsapp(){
const [reminderMsg,setReminderMsg]=useState("");
const [remindAt,setRemindAt]=useState();
const [reminderList,setReminderList]=useState([])
useEffect(()=>{
	axios.get("http://localhost:9000/deleteReminder").then(res=>setReminderList(res.data))
},[])
const addReminder=()=>{
axios.post("http://localhost:9000/addReminder",{reminderMsg,remindAt})
.then( res => setReminderList(res.data))
      setReminderMsg("")
      setRemindAt()


}
  const deleteReminder = (id) => {
    axios.post("http://localhost:9000/deleteReminder", { id })
    .then( res => setReminderList(res.data))
  }


return(
<>
<center>
<div className="App">
<div className="homepage">
<div className="homepage_reader">
<h1>Remind ME:</h1> 

<br/>
<br/>
<input type="text" placeholder="REMIND ME HERE...." value={reminderMsg} onChange={e=>setReminderMsg(e.target.value)}/>
 
<br/>
<br/>
 <DateTimePicker
value={remindAt}
onChange={setRemindAt}
minDate={new Date()}
minutePlaceholder="mm"
hourPlaceholder="hh"
dayPlaceholder="DD"
monthPlaceholder="MM"
yearPlaceholder="YYYY"
/>
<br/>
<br/>
 <div className="button" type="button" onClick={addReminder}>Add Reminder</div>
       
	   </div>
	   <div className="homepage_body" key={reminder_id}>
	   {
		   reminderList.map(reminder =>(
		   <div className="reminder_card">
		   <h2>{reminder.remindMsg}</h2>
		   <h3> Remind me</h3>
		   <p>{new Date(reminder.remindAt.tolocaleString(undefined,{timezone:"Asia/Mumbai"}))}</p>
<div className="button" onClick={() => deleteReminder(reminder_id)}>DELETE</div>		   
		   </div>
		   ))
	   }
	   </div>
</div>

</div>
</center>
</>
)
}
export default Whatsapp;