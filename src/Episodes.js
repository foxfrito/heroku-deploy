import React, { useState } from 'react';

import EpisodesModal from './EpisodesModal'
import { fetchEpisodes } from './services/services';

export default function Episodes(props) {
    const [episodes, setEpisodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { title } = props;

    async function getEpisodes(page = 1) {
        const result = await fetchEpisodes(title, page);
        setCurrentPage(result.page);
        setTotalPages(result.totalPages);
        setEpisodes(result.content);
    }

    return <EpisodesModal 
                        {...props}
                        episodes={episodes}
                        getEpisodes={getEpisodes}
                        currentPage={currentPage}
                        totalPages={totalPages}
            />
}