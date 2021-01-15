import Vue from 'vue'
import MessageComponent from './message.vue'

let seed = 1  // 通过seed++来给每个实例创建不同id
let instances = []  // 用于存放所有组件实例
let MessageConstructor = Vue.extend(MessageComponent)

let Message = (options = {}) => {
  // 当调用直接传入字符串的时候，this.$message('内容')
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  let id = 'message_' + seed++
  let userOnClose = options.onClose
  let userOnCancle = options.onCancle
  
  // 组件关闭的时候执行close方法
  // 主要用来数组中移出实例，并重新计算偏移量
  options.onClose = function () {
    Message.close(id, userOnClose)
  }
  options.onCancle = function () {
    Message.cancle(id, userOnCancle)
  }
  // 计算每个组件的偏移
  let verticalOffset = options.offset || 16
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  options.verticalOffset = verticalOffset

  // 创建实例
  let instance = new MessageConstructor({
    data: options,
    el: document.createElement('div')
  })
  // 实例id赋值
  instance.id = id

  instances.push(instance)
  // 插入dom
  document.body.appendChild(instance.$el)
  return instance
}

Message.close = function (id, userOnClose) {
  let len = instances.length
  let index = -1
  index = instances.findIndex(item => {
    return item.id === id
  })
  if (index === -1) return
  const removedHeight = instances[index].$el.offsetHeight
  if (typeof userOnClose === 'function') {
    userOnClose(instances[index])
  }
  instances.splice(index, 1)
  
  // 重新计算偏移量
  if (len <= 1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

Message.cancle = function (id,userOnCancle) {
  let len = instances.length
  let index = -1
  index = instances.findIndex(item => {
    return item.id === id
  })
  if (index === -1) return
  const removedHeight = instances[index].$el.offsetHeight
  if (typeof userOnCancle === 'function') {
    userOnCancle(instances[index])
  }
  instances.splice(index, 1)
  
  // 重新计算偏移量
  if (len <= 1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px'
  }
}

export default Message