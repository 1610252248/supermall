export function getDetail(iid) {
  return axios.get('/api/detail',{
    params: {
      iid: iid
    }
  })
}
