import React, {
    useState,
    // useEffect,
} from 'react';
// import { stat } from 'fs';
// import { resolve } from 'path';

function getFetcher(){
    return fetch(
        'http://127.0.0.1:5000/', {
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }
    ).then((r) =>{return r.json()}).catch(e => console.log(e));
}

const ServerButton: React.FC = () => {
    const [fetchedData, setData] = useState('Failed')

    const startOper = () => {
        getFetcher().then(r => {
            let res = JSON.parse(JSON.stringify(r));
            setData(res.msg);
        });
    }

    return (
      <div className="App">
          <h3>
              Current Data:
          </h3>
          <p>
              {fetchedData}
          </p>
        <button onClick={()=>startOper()}>
            Click Me!
        </button>
        <input
            type="text" onChange={e => setData(e.target.value)}
        />
      </div>
    );
}

export default ServerButton;
