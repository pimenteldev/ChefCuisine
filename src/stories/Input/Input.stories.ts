import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Input } from "./Input"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "ChefCuisine/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Text: Story = {
  args: {
    label: "Input",
    primary: true,
    size: "medium",
    name: "inputName",
    type: "text",
    disabled: false,
    focused: true,
    required: true,
  },
}

export const Number: Story = {
  args: {
    label: "Input",
    primary: false,
    size: "medium",
    name: "inputName",
    type: "number",
    disabled: false,
    focused: true,
    required: true,
  },
}

export const Small: Story = {
  args: {
    primary: true,
    size: "small",
    label: "inputName",
    name: "inputName",
    type: "text",
    disabled: false,
    focused: true,
    required: true,
  },
}

export const Medium: Story = {
  args: {
    primary: true,
    size: "medium",
    label: "inputName",
    name: "inputName",
    type: "text",
    disabled: false,
    focused: true,
    required: true,
  },
}
