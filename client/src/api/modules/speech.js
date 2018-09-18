import api from '../setup'

export const getSpeechList = query => {
  return api.post('/speech/list', {
    ...query
  }).then(res => {
    let { data } = res
    return data
  })
}
