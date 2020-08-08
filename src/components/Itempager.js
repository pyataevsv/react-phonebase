import React, { useState } from 'react'

export default function Itempager(props) {

    const [inputItPage, setInputItPage] = useState(15)

    return (
        <div className='field has-addons'>
            <div className="control">
                <button
                    onClick={() => (inputItPage !== 1) ? setInputItPage(inputItPage - 1) : null}
                    className="button">
                    <span className="icon is-small">
                        <i className="fas fa-arrow-circle-down"></i>
                    </span>
                </button>
            </div>
            <div className="control">
                <input
                    style={{ width: 60 }}
                    onChange={(e) => {
                        if (e.target.value.match(/^\d*$/)) {
                            setInputItPage(e.target.value)
                        }
                    }}
                    value={inputItPage}
                    className="input"
                    type="text"
                />
            </div>
            <div className="control">
                <button
                    onClick={() => setInputItPage(inputItPage + 1)}
                    className="button">
                    <span className="icon is-small">
                        <i className="fas fa-arrow-circle-up"></i>
                    </span>
                </button>
            </div>
            <div className="field has-addons ml-1">
                <div className="control">
                    <button
                        disabled={(!inputItPage || inputItPage === props.itemPerPage) ? true : false}
                        className="button is-warning mar"
                        onClick={() => props.setItemPerPage(inputItPage)}
                    > Items/Page </button>
                </div>
            </div>
        </div>
    )
}
