import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FadedCarousel } from '../components';

export default {
	title: 'FadedCarousel',
	component: FadedCarousel,
} as ComponentMeta<typeof FadedCarousel>;

export const Template: ComponentStory<typeof FadedCarousel> = (args) => <FadedCarousel {...args} />;

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
	],
};
