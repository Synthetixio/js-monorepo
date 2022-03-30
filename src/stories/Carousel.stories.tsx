import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Carousel } from '../components';

export default {
	title: 'Carousel',
	component: Carousel,
} as ComponentMeta<typeof Carousel>;

export const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

Template.args = {
	withArrows: true,
	carouselItems: [
		<div
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
			key={1}
		>
			<div>NESTED</div>112
		</div>,
		<div
			key={2}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			2
		</div>,
		<div
			key={3}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			3
		</div>,
		<div
			key={4}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			4
		</div>,
		<div
			key={5}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			5
		</div>,

		<div
			key={6}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			6
		</div>,

		<div
			key={7}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			7
		</div>,
		<div
			key={9}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			8
		</div>,
		<div
			key={10}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			9
		</div>,

		<div
			key={10}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			10
		</div>,
		,
	],
};
