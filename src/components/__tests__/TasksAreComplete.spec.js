import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import TasksAreComplete from '../TasksAreComplete.vue'

describe('TasksAreComplete', () => {
  it('renders properly', () => {
    const wrapper = mount(TasksAreComplete)
    expect(wrapper.text()).toContain('Looks like all your tasks are complete')
  })
})
