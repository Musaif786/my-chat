import { async } from '@firebase/util';
import React from 'react';
import Delete from '../svg/Delete';

const Chat =()=>{

    const handleSubmit = async (e)=>{
        e.preventDefault()
    }
    return(<>
    <div style={{minWidth:"100%",height:"auto"}} className='message-form container'>
        
        <form onsubmit={handleSubmit}  id='form' className='' style={{minWidth:"80%"}}>
            <label htmlFor="img"><Delete/></label>
            <input type="file" id='img' className='d-none' placeholder='type here'/>
        <div className=' m-sm-auto m-lg-0' style={{minWidth:"80%"}}>
            <input className='ml-2' style={{minWidth:"400px"}} type="text"  placeholder='type here' />
        </div>
        <div  style={{minWidth:"40px", height:"50px"}} className='d-inline-block '>
            <button onsubmit={handleSubmit}  className='d-block ml-1'  style={{minWidth:"40px", height:"50px"}}>Submit</button>
        </div>

        </form>

    </div>
    </>)
}
export default Chat;