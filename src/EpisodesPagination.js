import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap'

export default function EpisodesPagination(props) {

    const { currentPage, totalPages, getEpisodes } = props;
    const [init, setInit] = useState(1);
    const [end, setEnd] = useState(Math.min(10, totalPages));
    const items = [];

    for(let x = init; x <= end; x++) {
        items.push(
            <Pagination.Item key={x}
                             active={x === currentPage}
                             onClick={() => getEpisodes(x)}>{x}
            </Pagination.Item>
        )
    }

    const nextPages = () => {
        getEpisodes(init + 10);
        setInit(init + 10);
        setEnd(end + 10 < totalPages ? end + 10 : totalPages);
    }

    const previousPages = () => {
        getEpisodes(init - 10);
        setInit(init - 10);
        console.log('PREV', end - 10 > totalPages ? totalPages : end - 10);
        setEnd(end - 10 > totalPages ? totalPages : end - 10);
    }

    useEffect(() => console.log('PAGINATION EFFECT'), []);
    return (
        <div>
            <Pagination>
                <Pagination.First onClick={() => console.log('FIRST!')} disabled={end <= 10}/>
                <Pagination.Prev  onClick={previousPages} disabled={end <= 10}/> 
                {items}
                <Pagination.Next  onClick={nextPages} disabled={end === totalPages}/>
                <Pagination.Last  onClick={() => console.log('LAST!')} disabled={end === totalPages}/>
            </Pagination>
        </div>
    )
}