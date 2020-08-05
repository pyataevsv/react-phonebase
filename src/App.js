/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useReducer, useRef, useEffect } from 'react';
import * as testdata from './test'
import './index.css'
import Pagination from './components/Pagination'
import ItemCard from './components/ItemCard'
import orderby from 'lodash.orderby'


function App() {
  const [itemPerPage, setItemPerPage] = useState(15)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchWord, setSearchWord] = useState('')
  const [currenItem, setCurrentItem] = useState(null)
  const searchRef = useRef(null)
  const clickRef = useRef(null)
  const [filterState, dispatch] = useReducer(reducer, { column: null, direction: null, sort: () => true })


  function reducer(state, action) {
    if (state.column !== action.type) return { column: action.type, direction: 'asc', sort: (x, y) => x[action.type] > y[action.type] }
    if (state.column === action.type && state.direction === 'asc') return { column: action.type, direction: 'desc' }
    if (state.column === action.type && state.direction === 'desc') return { column: null, direction: null }
    return { column: null, direction: null }
  }

  const data = JSON.parse(testdata.test1000)
  const tHeaders = ['id', 'firstName', 'lastName', 'email', 'phone']

  //split data to pages by itemPerPage elements
  const paginData = Array(Math.ceil(data.length / itemPerPage)).fill(1).map(item => [])
  data.forEach((item, id) => { paginData[Math.floor(id / itemPerPage)].push(item) })
  const FilterIcon = (props) => {
    if (filterState.column === props.item && filterState.direction === 'asc') return <span><i className="fas fa-caret-down"></i></span>
    if (filterState.column === props.item && filterState.direction === 'desc') return <span><i className="fas fa-caret-up"></i></span>
    return <span></span>
  }

  //order data with current filter state
  let renderMas = orderby(paginData[currentPage - 1], [filterState.column], [filterState.direction]).sort(filterState.sort)
    //filtering with search state
    .filter((item) => {
      if (!searchWord.length) {
        return true
      } else {
        for (let i of Object.entries(item).filter(j => tHeaders.includes(j[0]))) {
          if (String(i).match(searchWord, 'g')) return true
        }
      }
    })

  useEffect(() => {
    if (clickRef.current) {
      clickRef.current = false
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }
  })

  return (
    <section className="section">
      <div className="container">
        <div className='level'>
          <div className="level-left"></div>
          <div className="level-right">
            <div className='level-item'>
              <div className='field has-addons'>
                <div className="control">
                  <input ref={searchRef} className="input" type="text" placeholder="Regex" />
                </div>
                <div className="control">
                  <button className="button is-info"
                    onClick={() => setSearchWord(searchRef.current.value)}
                  > Search
                </button>
                </div>
              </div>
            </div>
            <div className="level-item">
              <button className="button is-info has-background-success"
                onClick={() => setSearchWord(searchRef.current.value)}
              > Add
                </button>
            </div>
          </div>

        </div>
        <table className='table is-bordered is-fullwidth'>
          <thead>
            <tr>
              {tHeaders.map((item, id) => (
                <th key={id}>
                  <span onClick={() => dispatch({ type: item })}>{item}</span>
                  <span><FilterIcon item={item} /></span>

                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className='table-rows' >
              <td><button className="button is-info">
                Search
            </button></td>
              <td><input ref={searchRef} className="input" type="text" placeholder="Regex" /></td>
              <td><input ref={searchRef} className="input" type="text" placeholder="Regex" /></td>
              <td><input ref={searchRef} className="input" type="text" placeholder="Regex" /></td>
              <td><input ref={searchRef} className="input" type="text" placeholder="Regex" /></td>
            </tr>
            {renderMas.map((item, id) => (
              <tr className='table-rows' key={id} onClick={() => {
                clickRef.current = true
                setCurrentItem(renderMas.filter(i => i.id === item.id)[0])
              }}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={paginData.length} goToPage={(num) => setCurrentPage(num)} />
        <div>
          <ItemCard currentItem={currenItem} closeCard={() => setCurrentItem(null)} />
        </div>
      </div>
      <div>

      </div>
    </section>
  );
}

export default App;
