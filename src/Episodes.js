import React, { useState, useEffect } from 'react';

import EpisodesModal from './EpisodesModal'
import { fetchEpisodes } from './services/services';

export default function Episodes(props) {
    const [episodes, setEpisodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { title } = props;

    useEffect(() => {
        getEpisodes();
    }, []);

    async function getEpisodes(page = 1) {
        const result = await fetchEpisodes(title, page);
        setCurrentPage(result.page);
        setTotalPages(result.totalPages);
        setEpisodes(result.content);
    }

    return episodes && episodes.length > 0 ? 
            <EpisodesModal 
                {...props}
                episodes={episodes}
                getEpisodes={getEpisodes}
                currentPage={currentPage}
                totalPages={totalPages}
            /> : null
}