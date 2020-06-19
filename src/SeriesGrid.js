import React, { useState } from 'react';
import Episodes from './Episodes';

export default function SeriesGrid({seriesList, removeSeries}) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(null);

    const removeButtonStyle = {
        backgroundColor: 'white',
        position: 'relative',
        left: '90%',
        opacity: '0.6',
        fontSize: '10px',
        borderRadius: '50%',
        width: '16px',
        height: '16px',
        marginBottom: '5px',
        textAlign: 'center',
        cursor: 'pointer'
    };

    const openModal = (title) => {
        setTitle(title);
        setShowModal(true);
    }

    return (
        <>
            <div id="container">
                {seriesList.map( series => {
                    return (
                        <div key={series.id} id="outter">
                            <div id="removeButton" style={removeButtonStyle} onClick={() => removeSeries(series.id)}>X</div>
                            <div className="poster">
                                <img
                                    alt="poster"
                                    src={series.poster}
                                    onClick={() => openModal(series.title)}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            {showModal &&
                <Episodes
                    title={title}
                    show={showModal}
                    onHide={() => setShowModal(!showModal)}
                />
            }
        </>
    );
  }