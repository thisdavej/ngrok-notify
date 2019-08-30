const axios = require('axios');


module.exports = async (opts, webhook_url, method) => {
  const { url, port } = opts;
  const response = (method === "GET") ?
        await axios.get(webhook_url, {
          params: {
            url: url,
            port: port
          }
        })
        :
        await axios.post(webhook_url, {
          url: url,
          port: port
        })
    ;

    return response;
};
