import React, { useContext } from 'react';
import {Global} from '../App';

function Home() {
  const user = useContext(Global);
  return <>
      <div>
          <h1>Welcome</h1>
        

          <h2>Hello @{user?.email} welcome to Musaif React-app</h2>
      </div>
  </>;
}
export default Home;
