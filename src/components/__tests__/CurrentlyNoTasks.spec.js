import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import CurrentlyNoTasks from '../CurrentlyNoTasks.vue'

describe('CurrentlyNoTasks', () => {
  it('renders properly', () => {
    const wrapper = mount(CurrentlyNoTasks)
    expect(wrapper.text()).toContain('You have currently no tasks')
  })
})
