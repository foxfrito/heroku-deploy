import React, { useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap'
import moment from 'moment'

import EpisodesPagination from './EpisodesPagination';
import { sendToSeedbox } from './services/services'

export default function EpisodesModal(props) {
    const { episodes, show, onHide, getEpisodes }  =  props;

    useEffect(() => {
        getEpisodes();
    }, []);

    return (
        <Modal
            show={show}
            onHide={onHide}
            animation={false}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered={'true'}
            dialogClassName='episodes-modal'>
        <Modal.Body>
            <Table hover className="episodes-table">
                <thead className="thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Episode</th>
                        <th>Resolution</th>
                        <th>Description</th>
                        <th>Air Date</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    { episodes.length > 0 && episodes.map(e => {
                        return (
                            <tr key={e.link}>
                                <td>{e.title}</td>
                                <td>{e.episode}</td>
                                <td>{e.resolution}</td>
                                <td>{e.description}</td>
                                <td>{moment(e.pub_date).format('DD/MM/YYYY')}</td>
                                <td><button onClick={() => sendToSeedbox(e.title, e.link)}>Send</button></td>
                            </tr>
                        )       
                    })}
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer className="episodes-table-footer">
                { episodes.length > 0 ? <EpisodesPagination {...props}/> : null }
        </Modal.Footer>
        </Modal>
)}