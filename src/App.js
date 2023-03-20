import React, { useState } from 'react'
import axios from 'axios'

// https://axios-http.com/docs/instance
const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000
});

function App() {
  const [requestIsFailed, setRequestIsFailed] = useState(false)
  const [message, setMessage] = useState('')


  const onSuccessAction = () => {
    http.post('/posts', {
      userId: 1,
      title: 'Mon article',
      body: 'Lorem upsut dolor et erile ...'
    })
    .then(response => response.data)
    .then(data => {
      setMessage(`L'article ${data.id} à été créé.`)
      setRequestIsFailed(false)
    })
  }
  const onFailedAction = () => {
    http.get('/articles')
      .then(response => response.data)
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setRequestIsFailed(true)
          setMessage("La page n'existe pas")
        }
        console.log({ error });
      })
  }

  return (
    <Layout>
      { requestIsFailed
        ? message && <TostFailed message={message} />
        : message && <TostSuccess message={message} />}
      <Buttons>
        <Button label='Mauvaise URL' action={onFailedAction} />
        <Button label='Ajouter un article' action={onSuccessAction} />
      </Buttons>
    </Layout>
  );
}

// Wrappers
function Layout({ children }) {
  return (
    <div style={{
      gap: '.8rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {children}
    </div>
  );
}
function Buttons({ children }) {
  return (
    <div style={{
      gap: '1rem',
      display: 'inline-flex',
    }}>
      {children}
    </div>
  );
}

// Button
function Button({ label, action }) {
  return (
    <button type='button' onClick={action}>
      {label}
    </button>
  );
}

// Tosts
function Tost({ message, color }) {
  return (
    <div style={{
      width: '25rem',
      padding: '.8rem',
      color: color ? 'snow' : 'inherit',
      background: color,
      fontWeight: '600',
    }}>
      {message}
    </div>
  );
}
function TostSuccess({ message }) {
  return (
    <Tost message={message} color='green' />
  );
}
function TostFailed({ message }) {
  return (
    <Tost message={message} color='red' />
  );
}

export default App;
