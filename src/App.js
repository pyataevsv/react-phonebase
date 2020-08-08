
import React, { useState, useReducer, useRef, useEffect } from 'react';
import './index.css'
import Pagination from './components/Pagination'
import ItemCard from './components/ItemCard'
import orderby from 'lodash.orderby'
import Editrow from './components/Editrow'
import Itempager from './components/Itempager'
import Table from './components/Table'



function App(props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchWord, setSearchWord] = useState('')
  const [currenItem, setCurrentItem] = useState(null)
  const [addMode, setAddMode] = useState(false)
  const [feed, setFeed] = useState(props.feed)
  const [paginData, setPaginData] = useState(props.feed)
  const [maxItem, setMaxItem] = useState(0)
  const [itemPerPage, setItemPerPage] = useState(15)
  const [editItem, setEditItem] = useState(null)


  const searchRef = useRef(null)
  const clickRef = useRef(null)
  const setPaginRef = useRef(null)

  const [filterState, dispatch] = useReducer(reducer, { column: null, direction: null, sort: () => true })


  function reducer(state, action) {
    if (state.column !== action.type) return { column: action.type, direction: 'asc', sort: (x, y) => x[action.type] > y[action.type] }
    if (state.column === action.type && state.direction === 'asc') return { column: action.type, direction: 'desc' }
    if (state.column === action.type && state.direction === 'desc') return { column: null, direction: null }
    return { column: null, direction: null }
  }

  //initialize paginate data

  if (!setPaginRef.current) {
    setPaginRef.current = true

    // const paginData = Array(Math.ceil(props.feed.length / itemPerPage)).fill(1).map(item => [])
    // props.feed.forEach((item, id) => { paginData[Math.floor(id / itemPerPage)].push(item) })
    setPaginData(scoreItemPerPage(feed, itemPerPage))
    setMaxItem(Math.max(...feed.reduce((x, y) => x.concat([y.id]), [])))
  }

  function scoreItemPerPage(feed, itemPerPage) {
    const paginData = Array(Math.ceil(feed.length / itemPerPage)).fill(1).map(item => [])
    feed.forEach((item, id) => { paginData[Math.floor(id / itemPerPage)].push(item) })
    return paginData
  }

  // const data = props.feed

  const tHeaders = ['id', 'firstName', 'lastName', 'email', 'phone']

  //split data to pages by itemPerPage elements
  // const paginData = Array(Math.ceil(data.length / itemPerPage)).fill(1).map(item => [])
  // data.forEach((item, id) => { paginData[Math.floor(id / itemPerPage)].push(item) })

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
          if (String(i[1]).match(searchWord)) {
            return true
          }
        }
      }
      // return true
    })

  useEffect(() => {
    if (searchWord) {
      for (let i of document.querySelectorAll('.td')) {
        let r = new RegExp(searchWord)
        i.innerHTML = i.innerHTML.replace(/(<span class="heighlight">|<\/span>)/, '')
        i.innerHTML = i.innerHTML.replace(r, '<span class="heighlight">' + searchWord + '</span>')
      }
    } else {
      for (let i of document.querySelectorAll('.td')) {
        i.innerHTML = i.innerHTML.replace(/(<span class="heighlight">|<\/span>)/, '')
      }
    }

    if (clickRef.current) {
      clickRef.current = false
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }
  })

  return (
    <div className="container">
      <div className='level'>
        <div className="level-left">
          <Itempager
            itemPerPage={itemPerPage}

            setItemPerPage={(x) => {
              setCurrentPage(1)
              setItemPerPage(x)
              setPaginRef.current = false
            }}
          />
        </div>
        <div className="level-right">
          <div className='level-item'>
            <div className='field has-addons'>
              <div className="control">
                <input ref={searchRef} className="input" type="text" placeholder="Text.." />
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
            {(!addMode) ? (
              <button className="button is-info has-background-success"
                onClick={() => {
                  setAddMode(!addMode)

                }}
              > <i className="fas fa-edit" style={{ color: 'black' }}></i>
              </button>
            ) :
              <button className="button is-info has-background-danger"
                onClick={() => {
                  setAddMode(!addMode)
                  setEditItem(null)
                }}
              > <i className="fas fa-edit" style={{ color: 'black' }}></i>
              </button>}
          </div>
        </div>

      </div>

      <Editrow
        editItem={editItem}
        addMode={addMode}
        onEditItem={(values) => {
          let id = feed.findIndex((item) => item.id === values.id)

          feed.splice(id, 1, values)

          setEditItem(null)
          setPaginRef.current = false
          setFeed([].concat(feed))
        }}
        onSubmit={(values) => {
          const newitem = Object.assign(
            values,
            {
              id: maxItem + 1,
              description: '',
              address: {
                city: 'no data',
                state: 'no data',
                streetAddress: 'no data',
                zip: 'no data'
              }
            },
          )

          feed.splice(itemPerPage * (currentPage - 1), 0, newitem)
          setPaginRef.current = false
          setFeed([].concat(feed))

        }} />

      <Table
        addMode={addMode}
        editItem={editItem}
        setCurrentItem={(it) => setCurrentItem(it)}
        setEditItem={(x) => setEditItem(x)}
        renderMas={renderMas} clickRef={clickRef}
        tHeaders={tHeaders}
        setFilter={(item) => dispatch({ type: item })}
        FilterIcon={FilterIcon}
        removeItem={(id) => {

          setPaginRef.current = false
          setFeed(feed.filter(item => (item.id === id) ? false : true))
        }}
      />
      <Pagination currentPage={currentPage} totalPages={paginData.length} goToPage={(num) => setCurrentPage(num)} />
      <div>
        <ItemCard currentItem={currenItem} closeCard={() => setCurrentItem(null)} />
      </div>
    </div>
  );
}

export default App;