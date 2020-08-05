import React from 'react'

export default function ItemCard(props) {

    if (props.currentItem) {
        return (
            <div className="card">
                <div className="card-content">
                    <div className='level'>
                        <div>
                            <p className="title is-3">{props.currentItem.firstName} {props.currentItem.lastName} </p>
                        </div>
                        <div>
                            <span
                                onClick={() => props.closeCard()}
                                className="delete is-large"></span>
                        </div>

                    </div>
                    <div className='media-content'>
                        <p className="is-6">{props.currentItem.email} </p>
                        <p className="is-6">{props.currentItem.phone} </p>
                        <br></br>
                    </div>
                    <div >
                        <p>{props.currentItem.description}</p>
                    </div>
                    <br></br>
                    <div>
                        <p><strong>City:</strong> {props.currentItem.address.city}</p>
                        <p><strong>State:</strong> {props.currentItem.address.state}</p>
                        <p><strong>Street:</strong> {props.currentItem.address.streetAddress}</p>
                        <p><strong>Zip:</strong> {props.currentItem.address.zip}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}
