import { render, screen } from '@testing-library/vue'
import { describe, it } from 'vitest'
import CjParserVue from '../src/cj-parser-vue.vue'

describe('describe', () => {
  it('case1', () => {
    render(CjParserVue)
    const button = screen.getByRole('div')
    expect(button).toBeInTheDocument()
  })
})
