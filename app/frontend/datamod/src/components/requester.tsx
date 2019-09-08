import React, {
    useState,
} from 'react';
import CredForm from './credsForm';

// function getFetcher(){
//     return fetch(
//         'http://127.0.0.1:5000/', {
//             method:'GET',
//             headers:{
//                 'Accept':'application/json',
//                 'Content-Type':'application/json'
//             }
//         }
//     ).then((r) =>{return r.json()}).catch(e => console.log(e));
// }

const ServerButton: React.FC = () => {
    const [fetchedData] = useState('None')

    // const startOper = () => {
    //     getFetcher().then(r => {
    //         let res = JSON.parse(JSON.stringify(r));
    //         setData(res.msg);
    //     });
    // }

    return (
      <div className="App">
        <div>
          <h3>
              Current Data:
          </h3>
          <p>
              {fetchedData}
          </p>
        </div>
        <div style={{margin:'15px'}}>
            <CredForm />
        </div>
{/*
        <button onClick={()=>startOper()}>
            Run Scraper!
        </button> */}
      </div>
    );
}

export default ServerButton;
