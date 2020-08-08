import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as testdata from './test'
import Spinner from './components/Spinner'
import { BrowserRouter as Router, Route, Redirect, } from "react-router-dom"
import Login from './components/Login'

const Fetchwrapper = () => {
  const [rows, setRows] = useState(36)
  const [fetchState, setFetchState] = useState('try')
  const [feed, setFeed] = useState(null)
  const maxRef = useRef({ current: true })
  const fetchRef = useRef({ current: true })
  // const url = 'https://www.filltext.com/?rows=' + rows + '&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'


  useEffect(() => {

    if (fetchRef.current) {

      fetchRef.current = false

      setFetchState('try')
      setTimeout(() => {
        //   fetch(url)
        //     .then(resp => {
        //       if (!resp.ok) throw new Error(resp.statusText)
        //       return resp
        //     })
        //     .then(resp => resp.json())
        //     .then(resp => {
        //       maxRef.current = Math.max(...resp.reduce((x, y) => x.concat([y.id]), []))
        //       
        //       setFeed(resp)
        //       setFetchState('win')
        //     })
        //     .catch(err => setFetchState('fail'))
        let resp = (rows === 36) ? JSON.parse(testdata.test36) : JSON.parse(testdata.test1000)
        maxRef.current = Math.max(...resp.reduce((x, y) => x.concat([y.id]), []))
        //       
        setFeed(resp)
        setFetchState('win')
      }, 2000);
    }
  }, [rows])





  const Loadedcontent = () => {
    switch (fetchState) {
      case 'try':
        return <Spinner />
      case 'win':
        // const paginData = Array(Math.ceil(feed.length / itemPerPage)).fill(1).map(item => [])
        // feed.forEach((item, id) => { paginData[Math.floor(id / itemPerPage)].push(item) })
        // return <App feed={paginData} maxItem={maxRef.current} />
        return <App feed={feed} />
      case 'fail':
        return <div className="danger-container">
          <div className="notification is-warning title">
            <strong className='title'>Woops...</strong><br></br>Something went wrong:((
          </div>
        </div>
      default:
        return <></>
    }
  }

  return (
    <div style={{ height: '100%' }}>
      <div className='set-box container'>
        <div className='level-item mt-3'>

          <div>
          </div>
        </div>
        <div className='level-item mt-3'>
          <div className="field has-addons">
            <div className="control">
              <button
                onClick={() => {
                  fetchRef.current = true
                  setRows(36)
                }}
                disabled={(rows === 36) ? true : false}
                className="button is-warning">
                36 rows
            </button>
            </div>
            <div className="control">
              <button
                onClick={() => {
                  fetchRef.current = true
                  setRows(1000)
                }}
                disabled={(rows === 1000) ? true : false}
                className="button is-warning">
                1000 rows
            </button>
            </div>

          </div>
        </div>
      </div>
      <Loadedcontent />
    </div >
  )
}


const Root = () => {
  const [logIn, setLogin] = useState(false)
  return (
    <Router>
      <Route path='/app'>
        <Fetchwrapper />
      </Route>
      <Route path='/login'>
        <Login showApp={() => setLogin(true)} />
      </Route>

      {logIn ? <Redirect to="/app" /> : <Redirect to="/login" />}

    </Router>
  )
}



ReactDOM.render(

  <Root />

  ,
  document.getElementById('root')
);
