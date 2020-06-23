const userId = 'c9ac2882-7b72-11ea-bc55-0242ac130003';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const EPISODES_SERVICE_BASE_URL = process.env.REACT_APP_EPISODES_SERCICE_URL;
const OMBD_API = process.env.REACT_APP_OMDB_API;


export const addSeries = async (title) => {

    const params = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify( { title } )
    };

    await fetch(`${BACKEND_URL}/users/${userId}/series`, params);
};

export const fetchSeries = async () => {
    const response = await fetch(`${BACKEND_URL}/users/${userId}/series`);
    let seriesList = await response.json();

    return await Promise.all(seriesList.map(async series => {
        const _series = series;
        const poster = await fetchPoster(series.title);

        _series.poster = poster;
        return _series;
    }));
};

export const deleteSeries = async (seriesId) => {
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
    };
    await fetch(`${BACKEND_URL}/users/${userId}/series/${seriesId}`, params);
};

const fetchPoster = async title => {
    const response = await fetch(`${OMBD_API}&t=${title}&type=series`);
    const data = await response.json();
    return data.Poster;
};

export const fetchEpisodes = async (title, page) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify({ title , page, limit: 10 })
    };

    try {
        const episodesServiceUrl = `${EPISODES_SERVICE_BASE_URL}/episodes`;
        const response = await fetch(episodesServiceUrl, params)
        const episodes = await response.json()
        return episodes
    } catch(err) {
        console.log(err)
        return []
    }
}

export const sendToSeedbox = async (filename, link) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify( { userId, filename, link } )
    };

    await fetch(`${BACKEND_URL}/episodes/`, params);
};