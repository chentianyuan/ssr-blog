// import { Injectable } from '@decorators/di'

class MsgTemplate {
  hasError: Boolean
  data: Object = null
  // msg属于私有参数，但是又应当可以在子类中被修改，所以声明为protected
  // public / private / protected
  constructor (protected msg?: String) {
    this.msg = msg || ''
  }
}

export class SuccessMsg extends MsgTemplate{
  constructor (protected msg?: String) {
    super(msg)
    this.hasError = false
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

export class FailedMsg extends MsgTemplate{
  constructor (protected msg?: String) {
    super(msg)
    this.hasError = true
  }
}