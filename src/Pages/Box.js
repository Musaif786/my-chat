import React, { useState } from 'react';

function Box() {
    const [ state, setState ]= useState([
        {
            name:"Musaif",
            age:20,
        },
        {
            name:"manohar",
            age:202,
        },
        {
            name:"khan",
            age:201,
        },
    ])
  return (<>
      <div>
          {
              state.map(e=>{
                  return (<>
                      <p>{e.name}</p>
                  </>)
              })
          }
      </div>
  </>);
}

export default Box;
