// here all the data inside the Messaging.js inside pages
// css also there only


import React from 'react';

function User({users}) {
  return (<>
<h1>{users.name}</h1>
{console.log("heloo im new here"+ users.email)}
  </>);
}

export default User;
