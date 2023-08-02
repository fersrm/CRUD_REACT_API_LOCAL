export const helpHttp = () => {
  const customFetch = async (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || null;
    if (!options.body) {
      delete options.body;
    }
    console.log(options);
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrio un error",
            })
      )
      .catch((err) => err);
  };

  const get = async (url, options = {}) => await customFetch(url, options);

  const post = async (url, options = {}) => {
    options.method = "POST";
    return await customFetch(url, options);
  };

  const put = async (url, options = {}) => {
    options.method = "PUT";
    return await customFetch(url, options);
  };

  const del = async (url, options = {}) => {
    options.method = "DELETE";
    return await customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
