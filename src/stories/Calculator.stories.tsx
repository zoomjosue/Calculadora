import type { Meta, StoryObj } from '@storybook/react'
import { Calculator } from '../components/Calculator'
import '../index.css'

const meta: Meta<typeof Calculator> = {
  title: 'Calculator/Calculator',
  component: Calculator,
  decorators: [
    (Story) => (
      <div style={{ background: '#0a0a0f', display: 'flex', justifyContent: 'center', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Calculator>

export const Default: Story = {}
