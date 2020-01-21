const config = require('../../server/config');

const request = async (url, data) => {
    console.log('[request]', url, data);

    const response = await fetch(`http://localhost:${config.server.port}${url}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, cors, *same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'include', // include, *same-origin, omit
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data),
        // тип данных в body должен соответвовать значению заголовка "Content-Type"
    });

    console.log('[request] response', response);
    const json = await response.json();
    return json;
};

export default request;
