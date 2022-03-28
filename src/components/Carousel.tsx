import React, { cloneElement, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';
import IconButton from './IconButton';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

interface CarouselProps {
	/**
	 * @dev the first html node must be a div element because of the css selectors.
	 * @warn minimum of 5 elements are required!
	 */
	carouselItems: ReactElement[];
	maxWidth?: string;
	withArrows?: boolean;
	withDots?: boolean;
}

const CHILDREN_ID_PREFIX = 'carousel-child-';

export default function Carousel({
	maxWidth,
	withArrows = true,
	withDots = true,
	carouselItems,
	...rest
}: CarouselProps) {
	const styledCarouselItemsWrapperRef = useRef<HTMLDivElement>(null);
	const [refWidth, setRefWidth] = useState(0);
	const [updatedCarouselItems] = useState(
		carouselItems.map((child, index) =>
			cloneElement(child, {
				id: CHILDREN_ID_PREFIX.concat(index.toString()),
				key: CHILDREN_ID_PREFIX.concat(index.toString()),
			})
		)
	);
	const startingIndex = () => {
		if ((carouselItems.length & 2) === 0) {
			return Math.ceil(carouselItems.length / 2);
		} else {
			return Math.ceil(carouselItems.length / 2);
		}
	};
	const [activeIndex, setActiveIndex] = useState<number>(startingIndex());

	const handleClick = (ltr: boolean, newIndex?: number) => {
		if (newIndex) {
			scroll(newIndex);
			setActiveIndex(newIndex);
			return;
		}
		if (ltr) {
			setActiveIndex((state) => {
				if (state >= carouselItems.length) return state;
				scroll(state + 1);
				return state + 1;
			});
		} else {
			setActiveIndex((state) => {
				if (state <= 1) return state;
				scroll(activeIndex - 1);
				return activeIndex - 1;
			});
		}
	};

	useEffect(() => {
		if (styledCarouselItemsWrapperRef) {
			const ref = styledCarouselItemsWrapperRef.current!;
			setRefWidth((_) => {
				const initState = document
					.getElementById(CHILDREN_ID_PREFIX.concat(activeIndex.toString()))!
					.getBoundingClientRect().width;
				const calculatedOffset = updatedCarouselItems
					.slice(0, activeIndex)
					.reduce((acc, _, index) => {
						return (
							acc +
							document.getElementById(CHILDREN_ID_PREFIX.concat(index.toString()))!.clientWidth
						);
					}, 0);
				ref.scroll({
					behavior: 'smooth',
					left: calculatedOffset - ref.clientWidth / 2 - initState / 2,
				});
				return initState;
			});
		}
	}, [styledCarouselItemsWrapperRef]);

	const scroll = (newIndex: number) => {
		const ref = styledCarouselItemsWrapperRef.current!;
		if (newIndex === carouselItems.length || newIndex === carouselItems.length - 1)
			return ref.scroll({
				behavior: 'smooth',
				left: ref.scrollWidth - ref.clientWidth,
			});
		if (newIndex === 1 || newIndex === 2) {
			return ref.scroll({
				behavior: 'smooth',
				left: 0,
			});
		}
		const calculatedOffset = updatedCarouselItems.slice(0, newIndex).reduce((acc, _, index) => {
			return (
				acc + document.getElementById(CHILDREN_ID_PREFIX.concat(index.toString()))!.clientWidth
			);
		}, 0);
		ref.scroll({
			behavior: 'smooth',
			left: calculatedOffset - ref.clientWidth / 2 - refWidth / 2,
		});
	};

	return (
		<StyledCarouselWrapper maxWidth={maxWidth} {...rest}>
			{withArrows && (
				<>
					<StyledLeftArrow
						icon={<ArrowLeftIcon />}
						rounded={true}
						onClick={() => handleClick(false)}
						size="tiniest"
						active={true}
					/>
					<StyledRightArrow
						icon={<ArrowRightIcon />}
						rounded={true}
						onClick={() => handleClick(true)}
						size="tiniest"
						active={true}
					/>
				</>
			)}
			<StyledCarouselItemsWrapper
				activeIndex={activeIndex!}
				maxLength={carouselItems.length}
				ref={styledCarouselItemsWrapperRef}
			>
				{updatedCarouselItems}
			</StyledCarouselItemsWrapper>
			{withDots && (
				<StyledDotsWrapper>
					{carouselItems.map((_, index) => (
						<StyledDot
							active={index + 1 === activeIndex}
							onClick={() => handleClick(false, index + 1)}
							key={index.toString().concat(_.type.toString())}
						/>
					))}
				</StyledDotsWrapper>
			)}
		</StyledCarouselWrapper>
	);
}

const StyledCarouselWrapper = styled.section<{ maxWidth?: CarouselProps['maxWidth'] }>`
	max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100vw')};
	width: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	min-height: 50px;
`;

const StyledCarouselItemsWrapper = styled.div<{ activeIndex: number; maxLength: number }>`
	display: flex;
	overflow: hidden;
	scroll-snap-type: x mandatory;
	width: 100%;
	// hide every child by default
	> div {
		opacity: 0;
	}
	// only highlight the two neighbors left and right
	div:nth-child(${({ activeIndex }) => activeIndex}) {
		opacity: 1;
	}
	${({ activeIndex }) =>
		activeIndex - 1 > 0 &&
		`
		div:nth-child(${activeIndex - 1}) {
		transform: scale(0.9);
		opacity: 0.7
	}`};
	${({ activeIndex, maxLength }) =>
		activeIndex + 1 <= maxLength &&
		`
		div:nth-child(${activeIndex + 1}) {
		transform: scale(0.9);
		opacity: 0.7
	}`};
	${({ activeIndex }) =>
		activeIndex - 1 > 0 &&
		`
		div:nth-child(${activeIndex - 2}) {
		transform: scale(0.8);
		opacity: 0.5
	}`};
	${({ activeIndex, maxLength }) =>
		activeIndex + 1 < maxLength &&
		`
		div:nth-child(${activeIndex + 2}) {
		transform: scale(0.8);
		opacity: 0.5
	}`};
`;

const StyledLeftArrow = styled(IconButton)`
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	left: 0;
	z-index: 1;
`;

const StyledRightArrow = styled(IconButton)`
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
	right: 0;
	z-index: 1;
`;

const StyledDotsWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${spacings.margin.medium};
`;

const StyledDot = styled.div<{ active?: boolean }>`
	border-radius: 50%;
	background-color: ${({ active }) => (active ? colors.lightBlue.primary : colors.grey)};
	width: 8px;
	height: 8px;
	margin-right: ${spacings.margin.medium};
	cursor: pointer;
	:last-of-type {
		margin-right: 0px;
	}
`;
