import React from 'react';

function Logins(props) {
    //data destructure 
    const { email,
         setEmail,
          password,
          setPassword,
          login,
          signup,
          hasaccount,
          setHasaccount,
          emailerror,
          passworderror,
          signinwithgoogle} = props;
  return( <> 
    <div className='container mt-5'>
    <div style={{maxWidth:"400px", margin:"0px auto"}}>
    <h1 className='my-4'>{hasaccount ? (<sapn>Login Page</sapn>): (<span>Create Account</span>) }</h1>

    <label htmlFor="email">Email</label>
    <input type="text" autoFocus required name="" id="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
    <p>{emailerror}</p>

    <label htmlFor="password">Password</label>
    <input type="text" name="password" id="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
    <p>{passworderror}</p>
    <div>
  {hasaccount ? (<>
      <button onClick={login} className='btn btn-primary mb-2'>Sign-In</button>
      <p>Don't have account ? <span   role="button" className=' pe-auto text-primary'  onClick={()=>{setHasaccount(!hasaccount)}}>Signup</span></p>
  </>):(<>
      <button onClick={signup} className='btn btn-success mb-2 d-block'>Sign-Up</button>
      <button onClick={signinwithgoogle} className='btn btn-primary mb-2'>Sign-up with Gmail</button>
  
      <p>already have an accont ? <span   role="button" className=' pe-auto text-primary'  onClick={()=>{setHasaccount(!hasaccount)}}>Login</span></p>
  </>)}
    </div>
    </div>
    </div>
    </>);
}

export default Logins;
