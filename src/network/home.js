export function getHomeMultidata() {
  return axios.get('/home/multidata');
}

export function getHomeGoods(type, page) {
  return axios.get('/home/data', {
    params: {type, page}
  })
}

