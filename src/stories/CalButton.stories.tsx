import type { Meta, StoryObj } from '@storybook/react'
import { CalcButton } from '../components/CalcButton'
import '../index.css'

const meta: Meta<typeof CalcButton> = {
  title: 'Calculator/CalcButton',
  component: CalcButton,
  decorators: [
    (Story) => <div style={{ background: '#111118', padding: 1, width: 85 }}><Story /></div>,
  ],
  args: { onClick: () => {} },
}
export default meta
type Story = StoryObj<typeof CalcButton>

export const Digit: Story = { args: { label: '7', variant: 'digit' } }
export const Operator: Story = { args: { label: '+', variant: 'operator' } }
export const Equals: Story = { args: { label: '=', variant: 'equals' } }
export const Action: Story = { args: { label: 'AC', variant: 'action' } }
export const Wide: Story = {
  args: { label: '0', variant: 'digit', wide: true },
  decorators: [
    (Story) => <div style={{ background: '#111118', padding: 1, width: 170 }}><Story /></div>,
  ],
}
