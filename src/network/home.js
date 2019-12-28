export function getHomeMultidata() {
  return axios.get('/api/home/multidata');
}

export function getHomeGoods(type, page) {
  return axios.get('/api/home/data', {
    params: {type, page}
  })
}

