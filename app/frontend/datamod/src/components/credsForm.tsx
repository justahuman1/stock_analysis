import React from 'react';
import { Form, Field } from 'react-final-form'
// import { send } from 'q';

interface Values {
    id?: string;
    secret?: string;
    username: string;
};

const sendCrawlRequest = (formVals: Values) => {
    fetch('http://127.0.0.1:5000/crawl',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({'creds':formVals})
    })
    .then((r) => {return r.json();})
    .then(r => console.log(r))
    .catch(e => console.log(e))
    .finally(() => alert('Done!'));
};

const onSubmit = async (values: Values) => {
    await sendCrawlRequest(values);
};

/*
    TODO: Modularize form

    const mew: Array<Array<String>> = [
        ['Client ID:', 'id', 'client id'],
        ['Client Secret:', 'secret', 'client secret'],
        ['User Name:', 'username', 'username'],
    ];
*/

const CredForm = () => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, pristine, invalid }) => (

      <form onSubmit={handleSubmit}>
        <div>
          <label style={{marginRight:'10px'}}>Client ID:</label>
          <Field
            name="id"
            component="input"
            placeholder="client id"
            required
        />
        </div>
        <div>
          <label style={{marginRight:'10px'}}>
            Client Secret:
          </label>
          <Field
            name="secret"
            component="input"
            placeholder="client secret"
            required
        />
        </div>
        <div>
          <label style={{marginRight:'10px'}}>User Name:</label>
          <Field
            name="username"
            component="input"
            placeholder="username"
            required
        />
        </div>
        <button type="submit" disabled={pristine || invalid}>
          Run Crawler!
        </button>
      </form>
    )}
  />
);

export default CredForm;