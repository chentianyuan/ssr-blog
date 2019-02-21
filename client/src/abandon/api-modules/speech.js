import api from '../../api/setup'

// 获取所有消息
export const getSpeechList = (context, query) => {
  return api.post('/speech/list', { ...query }, {
    context
  }).then(res => {
    let { data } = res
    return data
  })
}

// 插入一条消息
export const insertSpeech = query => {
  return api.post('/speech/insert', {
    ...query
  }).then(res => {
    let { data } = res
    return data
  })
}
