import React, { useRef } from 'react';
import { Modal, Table } from 'react-bootstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faSpinner } from '@fortawesome/free-solid-svg-icons'

import EpisodesPagination from './EpisodesPagination';
import { sendToSeedbox } from './services/services'

import './EpisodeModal.css'

export default function EpisodesModal(props) {
    const { episodes, show, onHide }  =  props;
    const spinnerRefs = useRef([]);
    const arrowRefs = useRef([]);

    const send = async ({title, link}, index) => {
        const spinner = spinnerRefs.current[index];
        const arrow = arrowRefs.current[index];
        
        spinner.hidden = false;
        arrow.hidden = true;

        await sendToSeedbox(title, link);

        spinner.hidden = true;
        arrow.hidden = false;
    }

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
                    { episodes.length > 0 && episodes.map((e, index) => {
                        return (
                            <tr key={e.link}>
                                <td>{e.title}</td>
                                <td>{e.episode}</td>
                                <td>{e.resolution}</td>
                                <td>{e.description}</td>
                                <td>{moment(e.pub_date).format('DD/MM/YYYY')}</td>
                                <td>
                                    <span className="spinner" ref={e => (spinnerRefs.current[index] = e)} hidden >
                                        <FontAwesomeIcon icon={faSpinner} spin/>
                                    </span>
                                    <span className="icon" ref={e => (arrowRefs.current[index] = e)} onClick={() => send(e, index)}>
                                        <FontAwesomeIcon icon={faShare} />
                                    </span>
                                </td>
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