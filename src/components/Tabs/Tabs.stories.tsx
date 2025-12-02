import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile and accessible tabs component and multiple variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabVariant: {
      control: 'radio',
      options: ['pill', 'underline'],
      description: 'Visual style variant of the tabs',
      table: {
        type: { summary: 'pill | underline' },
        defaultValue: { summary: 'pill' },
      },
    },
    tabBadge: {
      control: 'radio',
      options: ['neutral', 'positive', 'negative'],
      description: 'Style variant for the badge',
      table: {
        type: { summary: 'neutral | positive | negative' },
        defaultValue: { summary: 'neutral' },
      },
    },
  },
  args: {
    tabVariant: 'pill',
    tabBadge: 'neutral',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { id: 'home', label: 'Home', badge: 'New' },
  { id: 'profile', label: 'Profile' },
  { id: 'messages', label: 'Messages' },
  { id: 'settings', label: 'Settings' },
];

const defaultPanels = [
  {
    id: 'home',
    children: (
      <>
        <p>Welcome to the home tab!</p>
      </>
    ),
  },
  {
    id: 'profile',
    children: (
      <>
        <p>View and edit your profile here.</p>
      </>
    ),
  },
  {
    id: 'messages',
    children: (
      <>
        <p>Your messages will appear here.</p>
      </>
    ),
  },
  {
    id: 'settings',
    children: (
      <>
        <p>Configure your preferences.</p>
      </>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs: defaultTabs,
    panels: defaultPanels,
    onChange: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab', { name: /profile/i });
    await userEvent.click(tab);
  },
};

export const PillVariant: Story = {
  args: {
    ...Default.args,
    tabVariant: 'pill',
  },
};

export const UnderlineVariant: Story = {
  args: {
    ...Default.args,
    tabVariant: 'underline',
  },
};

export const WithBadges: Story = {
  args: {
    ...Default.args,
    tabs: [
      { id: '1', label: 'Neutral Badge', badge: 2 },
      { id: '2', label: 'No Badge' },
      { id: '3', label: 'With Badge' },
    ],
    tabBadge: 'neutral',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Tabs {...args} />
      <Tabs
        {...args}
        tabs={[
          { id: '1', label: 'Positive Badge', badge: 'Online' },
          { id: '2', label: 'No Badge' },
          { id: '3', label: 'With Badge' },
        ]}
        tabBadge="positive"
      />
      <Tabs
        {...args}
        tabs={[
          { id: '1', label: 'Negative Badge' },
          { id: '2', label: 'No Badge' },
          { id: '3', label: 'With Badge', badge: 100 },
        ]}
        tabBadge="negative"
      />
    </div>
  ),
};

export const WithDisabledTabs: Story = {
  args: {
    ...Default.args,
    tabs: [
      { id: 'tab1', label: 'Active Tab' },
      { id: 'tab2', label: 'Disabled Tab', disabled: true, badge: 'Error' },
      { id: 'tab3', label: 'Active Tab' },
      { id: 'tab4', label: 'Disabled Tab', disabled: true },
    ],
  },
};
