// Model可以作为实体的更下层，
// import { Injectable } from '@decorators/di'

class MsgTemplate {
  hasError: Boolean
  // msg属于私有参数，但是又应当可以在子类中被修改，所以声明为protected
  // public / private / protected
  constructor (protected msg?: String, protected data?: any) {
    this.msg = msg || ''
    this.setData(data)
  }

  setData <T>(data: T): Object {
    if (Object.prototype.toString.call(data) !== '[object object]') {
      this.data = { data: data }
    } else {
      this.data = data
    }
    return this
  }
}

export class SuccessMsg extends MsgTemplate{
  constructor (protected msg?: String, protected data?: any) {
    super(msg, data)
    this.hasError = false
  }
}

export class FailedMsg extends MsgTemplate{
  constructor (protected msg?: String, protected data?: any) {
    super(msg, data)
    this.hasError = true
  }
}