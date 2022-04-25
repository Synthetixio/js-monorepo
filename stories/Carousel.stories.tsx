import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Carousel from '../src/components/Carousel';

export default {
	title: 'Carousel',
	component: Carousel,
} as ComponentMeta<typeof Carousel>;

export const Template: ComponentStory<typeof Carousel> = (args) => (
	<div style={{ margin: 25 }}>
		<Carousel {...args} />;
	</div>
);

Template.args = {
	withArrows: true,
	widthOfItems: 500,
	carouselItems: [
		<div
			id="1"
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
			id="2"
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
			id="3"
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
			id="4"
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
			id="5"
			key={5}
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
		>
			<div>
				NESTED <div>NESTED</div>112
				<div>NESTED</div>112
				<div>NESTED</div>112 NESTED <div>NESTED</div>112
				<div>
					NESTED NESTED <div>NESTED</div>112
					<div>NESTED</div>112
					<div>NESTED</div>112 NESTED <div>NESTED</div>112
					<div>NESTED</div>112
					<div>NESTED</div>112
				</div>
				112
				<div>NESTED</div>112
			</div>
			112 5
		</div>,
		<div
			id="6"
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
			id="7"
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
			id="9"
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
			id="10"
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

export const WithFade: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

WithFade.args = {
	...Template.args,
	withFade: true,
};

export const Single: ComponentStory<typeof Carousel> = (args) => (
	<div style={{ display: 'flex', justifyContent: 'center' }}>
		<Carousel {...args} />
	</div>
);

Single.args = {
	...Template.args,
	maxWidth: '500px',
	carouselItems: [
		<div
			id="1"
			style={{
				minHeight: '100px',
				minWidth: '500px',
				color: 'white',
				textAlign: 'center',
				border: '1px solid red',
			}}
			key={100}
		>
			<div>NESTED</div>112
		</div>,
		<div
			id="2"
			key={402}
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
			id="2"
			key={20}
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
			id="3"
			key={30}
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
	],
};
