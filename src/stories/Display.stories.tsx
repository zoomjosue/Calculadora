import type { Meta, StoryObj } from '@storybook/react'
import { Display } from '../components/Display'
import '../index.css'

const meta: Meta<typeof Display> = {
  title: 'Calculator/Display',
  component: Display,
  decorators: [
    (Story) => <div style={{ background: '#111118', padding: 0, width: 340 }}><Story /></div>,
  ],
}
export default meta
type Story = StoryObj<typeof Display>

export const Default: Story = { args: { value: '0' } }
export const LargeNumber: Story = { args: { value: '123456789' } }
export const Decimal: Story = { args: { value: '3.14159' } }
export const Error: Story = { args: { value: 'ERROR' } }
export const Negative: Story = { args: { value: '-42' } }
