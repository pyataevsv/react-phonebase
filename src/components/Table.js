import React from 'react'
import close from '../assets/close.png'
import closew from '../assets/closew.png'
import edit from '../assets/edit.png'

export default function Table({ tHeaders, setFilter, FilterIcon, renderMas, clickRef, setCurrentItem, removeItem, setEditItem, editItem, addMode }) {

    return (
        <div style={{ position: 'relative' }}>

            <table style={{ marginBottom: 0 }} id='table' className='table is-bordered is-fullwidth'>
                <thead>
                    <tr>
                        {tHeaders.map((item, id) => (
                            <th key={id}>
                                <span onClick={() => setFilter(item)}>{item}</span>
                                <span><FilterIcon item={item} /></span>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {renderMas.map((item, id) => (

                        <tr className={(editItem && item.id === editItem.id) ? 'table-rows shake' : 'table-rows'} key={id} onClick={() => {
                            clickRef.current = true
                            setCurrentItem(renderMas.filter(i => i.id === item.id)[0])
                        }}>

                            <td className='td'>{item.id}</td>
                            <td className='td'>{item.firstName}</td>
                            <td className='td'>{item.lastName}</td>
                            <td className='td'>{item.email}</td>
                            <td className='td'>{item.phone}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
            {addMode ?
                <table style={{}} className='table table-edit'>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>

                    <tbody>
                        {renderMas.map((item, id) => {


                            return (
                                <tr key={id}>
                                    <td>&nbsp;</td>
                                    <td style={{ position: 'relative' }}  >
                                        <img
                                            onClick={() => (editItem) ? null : removeItem(item.id)}
                                            style={{ position: 'absolute', right: -45, cursor: 'pointer' }} src={editItem ? closew : close} alt='cl'></img>
                                    </td>
                                    <td onClick={() => (editItem) ? setEditItem(null) : setEditItem(item)}>
                                        {editItem ?
                                            ((editItem.id === item.id) ?
                                                <img style={{ position: 'absolute', left: 45, cursor: 'pointer' }} className='shake' src={edit} alt='cl'></img> : null) :
                                            <img style={{ position: 'absolute', left: 45, cursor: 'pointer' }} src={edit} alt='cl'></img>
                                        }
                                    </td>

                                </tr>)
                        }
                        )}
                    </tbody>
                </table>
                : null}
        </div>
    )
}


