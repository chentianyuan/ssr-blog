// dao中存储了所有对entities实体的基本操作

import { Injectable } from '@decorators/di'
import { getMongoRepository as getRep } from 'typeorm'
import Speech from '../entities/Speech'

@Injectable()
export default class SpeechDao {
  // 插入一条数据
  async insertSpeech (admin: string, speechText: string ) {
    // 先通过getRepository方法获取到Speech实体
    return await getRep(Speech)
    .insertOne({
      text: speechText,
      admin: admin
    })
  }

  // 获取集合所有信息 
  async getAllSpeech () {
    return await getRep(Speech)
    .stats()
  }
}
