import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import NoTasksCompleted from '../NoTasksCompleted.vue'

describe('NoTasksCompleted', () => {
  it('renders properly', () => {
    const wrapper = mount(NoTasksCompleted)
    expect(wrapper.text()).toContain('There are no tasks completed')
  })
})
