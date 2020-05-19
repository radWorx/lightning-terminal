import React from 'react';
import { lndListChannelsOne } from 'util/tests/sampleData';
import { Store, useStore } from 'store';
import { Channel } from 'store/models';
import ChannelBalance from 'components/loop/ChannelBalance';

export default {
  title: 'Components/Channel Balance',
  component: ChannelBalance,
  parameters: { centered: true },
};

const getChannel = (store: Store, ratio: number) => {
  const channel = new Channel(store, lndListChannelsOne.channelsList[0]);
  channel.localBalance = channel.capacity * ratio;
  channel.remoteBalance = channel.capacity * (1 - ratio);
  return channel;
};

export const Good = () => {
  const store = useStore();
  return <ChannelBalance channel={getChannel(store, 0.59)} />;
};

export const Warn = () => {
  const store = useStore();
  return <ChannelBalance channel={getChannel(store, 0.28)} />;
};

export const Bad = () => {
  const store = useStore();
  return <ChannelBalance channel={getChannel(store, 0.91)} />;
};

export const Inactive = () => {
  const store = useStore();
  const channel = getChannel(store, 0.45);
  channel.active = false;
  return <ChannelBalance channel={channel} />;
};
