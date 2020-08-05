/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default function Pagination(props) {

    let PaginButtons

    // if (props.totalPages < 10) {
    //     PaginButtons = (Array(props.totalPages).fill(1).map((x, y) => {
    //         return (
    //             <li key={y + 1}>
    //                 <a
    //                     onClick={(e) => props.goToPage(Number(e.target.dataset.pagenum))}
    //                     data-pagenum={y + 1}
    //                     className={(Number(props.currentPage) === y + 1) ? 'pagination-link is-current' : 'pagination-link'} aria-label={"Goto page " + y + 1}
    //                 >{y + 1}</a>
    //             </li>)
    //     }))
    // } else {
    //Filtering beginning, current, middle and end pagin buttons
    PaginButtons = (Array(props.totalPages).fill(1).map((it, id) => id + 1).map((it) => (Math.abs(it - props.currentPage) < 2 || Math.abs(it) < 3 || Math.abs(Math.floor(props.totalPages / 2) - it) < 1 || Math.abs(it - props.totalPages) < 2) ? it : 0
    ).filter((it, id, ar) => !(it === 0 && ar[id - 1] === 0)).map((x, y) => {

        if (x !== 0) {
            return (
                <li key={y}>
                    <a
                        onClick={(e) => props.goToPage(Number(e.target.dataset.pagenum))}
                        data-pagenum={x}
                        className={(Number(props.currentPage) === x) ? 'pagination-link is-current' : 'pagination-link'} aria-label={"Goto page " + x}
                    >{x}</a>
                </li>)
        } else {
            return (
                <li key={y}><span className="pagination-ellipsis">&hellip;</span></li>
            )
        }
    }

    ))
    // }

    return (
        <div className='level'>
            <nav className="pagination is-centered level-item" role="navigation" aria-label="pagination">
                <a className="pagination-previous"
                    onClick={() => {
                        if (props.currentPage !== 1) props.goToPage(props.currentPage - 1)
                    }}
                >Previous</a>
                <a className="pagination-next"
                    onClick={() => {
                        if (props.currentPage !== props.totalPages) props.goToPage(props.currentPage + 1)
                    }}
                >Next page</a>
                <ul className="pagination-list">
                    {PaginButtons}
                </ul>
            </nav>
        </div>
    )
}


