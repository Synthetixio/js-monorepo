import React, { cloneElement, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import colors from '../styles/colors';
import spacings from '../styles/spacings';
import IconButton from './IconButton';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

interface CarouselProps {
	/**
	 * @dev the first html node must be a DIV element because of the css selectors from the StyledCarouselItemsWrapper.2
	 */
	carouselItems: ReactElement[];
	maxWidth?: string;
	withArrows?: boolean;
	withDots?: boolean;
	withFade?: boolean;
}

const CHILDREN_ID_PREFIX = 'carousel-child-';

export default function Carousel({
	maxWidth,
	withArrows = true,
	withDots = true,
	withFade = false,
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

	const startingIndex = carouselItems.length < 3 ? 0 : Math.ceil(carouselItems.length / 2);
	const [activeIndex, setActiveIndex] = useState<number>(startingIndex);

	const handleNext = () => {
		setActiveIndex((state) => {
			if (state >= carouselItems.length) return state;
			scroll(state + 1);
			return state + 1;
		});
	};

	const handlePrev = () => {
		setActiveIndex((state) => {
			if (state <= 1) return state;
			scroll(state - 1);
			return state - 1;
		});
	};

	const handleClick = (index: number) => {
		scroll(index);
		setActiveIndex(index);
	};

	useEffect(() => {
		setRefWidth((_) => {
			return document
				.getElementById(CHILDREN_ID_PREFIX.concat((activeIndex - 1).toString()))!
				.getBoundingClientRect().width;
		});
	}, []);

	useEffect(() => {
		if (!refWidth || !styledCarouselItemsWrapperRef) return;

		const ref = styledCarouselItemsWrapperRef.current!;
		const left =
			carouselItems.length % 2 === 0
				? ref.scrollWidth / 2 - ref.clientWidth / 2 - refWidth / 2
				: ref.scrollWidth / 2 - ref.clientWidth / 2;

		ref.scroll(left, 0);
	}, [refWidth, styledCarouselItemsWrapperRef]);

	const scroll = (newIndex: number) => {
		const ref = styledCarouselItemsWrapperRef.current!;
		const left = refWidth * newIndex - ref.clientWidth / 2 - refWidth / 2;

		ref.scroll({
			behavior: 'smooth',
			left,
		});
	};

	const Wrapper = withFade ? StyledCarouselItemsWrapperFaded : StyledCarouselItemsWrapper;

	return (
		<StyledCarouselWrapper maxWidth={maxWidth} {...rest}>
			{withArrows && (
				<>
					<StyledLeftArrow rounded={true} size="tiniest" active={true}>
						<ArrowLeftIcon onClick={handlePrev} />
					</StyledLeftArrow>
					<StyledRightArrow rounded={true} size="tiniest" active={true}>
						<ArrowRightIcon onClick={handleNext} />
					</StyledRightArrow>
				</>
			)}
			<Wrapper
				activeIndex={activeIndex!}
				maxLength={carouselItems.length}
				ref={styledCarouselItemsWrapperRef}
			>
				{updatedCarouselItems}
			</Wrapper>
			{withDots && (
				<StyledDotsWrapper>
					{carouselItems.map((item, index) => (
						<StyledDot
							active={index + 1 === activeIndex}
							onClick={() => handleClick(index + 1)}
							key={index.toString().concat(item.type.toString())}
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
`;

const StyledCarouselItemsWrapperFaded = styled(StyledCarouselItemsWrapper)`
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
	background-color: ${({ active }) => (active ? colors.lightBlue : colors.grey)};
	width: 8px;
	height: 8px;
	margin-right: ${spacings.margin.medium};
	cursor: pointer;
	:last-of-type {
		margin-right: 0px;
	}
`;
