import React from 'react'
import { shallow } from 'enzyme';
import Example from '@/hooks/containers/Example.js'

let wrapper

describe('Example', () => {
  beforeEach(() => {
    wrapper = shallow(<Example/>) // 每次测试前确保我们的测试实例都是是干净完整的。返回一个wrapper对象
  })
  // 检查原始组件选项
  it('Should have one button', () => {
    const $els = wrapper.find('button') // 通过find来查找dom或者react实例
    expect($els.length).toEqual(1)
  })
  it('click button', () => {
    //find后直接进行链式操作，否则find数据将缓存，影响判断
    wrapper.find('#example-button').simulate('click')
    wrapper.find('#example-button').simulate('click')
    expect(wrapper.find('#example-count').text()).toEqual("2")
  })

});
