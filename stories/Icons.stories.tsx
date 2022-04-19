import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
	ArrowDownIcon,
	ArrowDropdownLeftIcon,
	ArrowDropdownRightIcon,
	ArrowDropdownUpIcon,
	ArrowDropdownDownIcon,
	ArrowLeftIcon,
	ArrowLinkOffIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	ArrowTriangleDownIcon,
	ArrowTriangleRightIcon,
	ArrowTriangleLeftIcon,
	ArrowTriangleUpIcon,
	BinIcon,
	CautionIcon,
	ClockIcon,
	CloseIcon,
	CopyIcon,
	EditIcon,
	GridIcon,
	ListIcon,
	MenuIcon,
	MinusIcon,
	PinIcon,
	PlusBorderIcon,
	PlusIcon,
	PrintIcon,
	SearchIcon,
	SettingsIcon,
	SkipLeftIcon,
	SkipRightIcon,
	SortListIcon,
	ThreeDotsKebabIcon,
	ThreeDotsMenuIcon,
	TickIcon,
	TrashIcon,
	WalletIcon,
	SNXIcon,
	GitHubIcon,
	TwitterIcon,
	DiscordIcon,
} from '../src';
import { withDesign } from 'storybook-addon-designs';

export default {
	title: 'Icons',
	component: ArrowLinkOffIcon,
	decorators: [withDesign],
} as ComponentMeta<typeof ArrowLinkOffIcon>;

export const Template: ComponentStory<typeof ArrowLinkOffIcon> = (args) => (
	<div style={{ display: 'flex', flexDirection: 'column' }}>
		<span style={{ color: 'white' }}>{ArrowLinkOffIcon.name}</span>
		<ArrowLinkOffIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowDropdownLeftIcon.name}</span>
		<ArrowDropdownLeftIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowDropdownRightIcon.name}</span>
		<ArrowDropdownRightIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowDropdownUpIcon.name}</span>
		<ArrowDropdownUpIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowDropdownDownIcon.name}</span>
		<ArrowDropdownDownIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowLeftIcon.name}</span>
		<ArrowLeftIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowRightIcon.name}</span>
		<ArrowRightIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowDownIcon.name}</span>
		<ArrowDownIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowUpIcon.name}</span>
		<ArrowUpIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowTriangleDownIcon.name}</span>
		<ArrowTriangleDownIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowTriangleRightIcon.name}</span>
		<ArrowTriangleRightIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowTriangleLeftIcon.name}</span>
		<ArrowTriangleLeftIcon {...args} />
		<span style={{ color: 'white' }}>{ArrowTriangleUpIcon.name}</span>
		<ArrowTriangleUpIcon {...args} />
		<span style={{ color: 'white' }}>{BinIcon.name}</span>
		<BinIcon {...args} />
		<span style={{ color: 'white' }}>{CautionIcon.name}</span>
		<CautionIcon {...args} />
		<span style={{ color: 'white' }}>{ClockIcon.name}</span>
		<ClockIcon {...args} />
		<span style={{ color: 'white' }}>{CloseIcon.name}</span>
		<CloseIcon {...args} />
		<span style={{ color: 'white' }}>{CopyIcon.name}</span>
		<CopyIcon {...args} />
		<span style={{ color: 'white' }}>{EditIcon.name}</span>
		<EditIcon {...args} />
		<span style={{ color: 'white' }}>{GridIcon.name}</span>
		<GridIcon {...args} />
		<span style={{ color: 'white' }}>{ListIcon.name}</span>
		<ListIcon {...args} />
		<span style={{ color: 'white' }}>{MenuIcon.name}</span>
		<MenuIcon {...args} />
		<span style={{ color: 'white' }}>{MinusIcon.name}</span>
		<MinusIcon {...args} />
		<span style={{ color: 'white' }}>{PinIcon.name}</span>
		<PinIcon {...args} />
		<span style={{ color: 'white' }}>{PlusBorderIcon.name}</span>
		<PlusBorderIcon {...args} />
		<span style={{ color: 'white' }}>{PlusIcon.name}</span>
		<PlusIcon {...args} />
		<span style={{ color: 'white' }}>{PrintIcon.name}</span>
		<PrintIcon {...args} />
		<span style={{ color: 'white' }}>{SearchIcon.name}</span>
		<SearchIcon {...args} />
		<span style={{ color: 'white' }}>{SkipLeftIcon.name}</span>
		<SkipLeftIcon {...args} />
		<span style={{ color: 'white' }}>{SkipRightIcon.name}</span>
		<SkipRightIcon {...args} />
		<span style={{ color: 'white' }}>{SortListIcon.name}</span>
		<SortListIcon {...args} />
		<span style={{ color: 'white' }}>{ThreeDotsKebabIcon.name}</span>
		<ThreeDotsKebabIcon {...args} />
		<span style={{ color: 'white' }}>{ThreeDotsMenuIcon.name}</span>
		<ThreeDotsMenuIcon {...args} />
		<span style={{ color: 'white' }}>{TickIcon.name}</span>
		<TickIcon {...args} />
		<span style={{ color: 'white' }}>{TrashIcon.name}</span>
		<TrashIcon {...args} />
		<span style={{ color: 'white' }}>{WalletIcon.name}</span>
		<WalletIcon {...args} />
		<span style={{ color: 'white' }}>{SettingsIcon.name}</span>
		<SettingsIcon {...args} />
		<span style={{ color: 'white' }}>{SNXIcon.name}</span>
		<SNXIcon />
		<span style={{ color: 'white' }}>{GitHubIcon.name}</span>
		<GitHubIcon fill={'white'} />
		<span style={{ color: 'white' }}>{TwitterIcon.name}</span>
		<TwitterIcon fill={'white'} />
		<span style={{ color: 'white' }}>{DiscordIcon.name}</span>
		<DiscordIcon fill={'white'} />
	</div>
);
Template.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/zeCepPb3Bo6Fd92FdcolUT/v1.0?node-id=308%3A23842',
	},
};
