import React, { HTMLAttributes, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import spacings from '../styles/spacings';
import IconButton from './IconButton';
import ArrowLeftIcon from './Icons/ArrowLeftIcon';
import ArrowRightIcon from './Icons/ArrowRightIcon';

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
	carouselItems: ReactElement[];
	maxWidth?: string;
	withArrows?: boolean;
	arrowsPosition?: 'outside' | 'half' | 'inside';
	withDots?: 'primary' | 'secondary';
	dotsPosition?: 'outside' | 'inside';
	withFade?: boolean;
	widthOfItems: number;
	startIndex?: number;
}
// TODO @MF make slider one per frame and make it endless? See design jade
export default function Carousel({
	maxWidth,
	withArrows = true,
	arrowsPosition,
	dotsPosition,
	withDots,
	withFade = false,
	carouselItems,
	widthOfItems,
	startIndex,
	...rest
}: CarouselProps) {
	const styledCarouselItemsWrapperRef = useRef<HTMLDivElement>(null);
	const startingIndex = startIndex
		? startIndex
		: carouselItems.length < 3
		? 0
		: Math.ceil(carouselItems.length / 2);
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
		if (!widthOfItems || !styledCarouselItemsWrapperRef) return;

		const ref = styledCarouselItemsWrapperRef.current!;
		const left = startIndex
			? 0
			: carouselItems.length % 2 === 0
			? ref.scrollWidth / 2 - ref.clientWidth / 2 - widthOfItems / 2
			: ref.scrollWidth / 2 - ref.clientWidth / 2;

		ref.scroll(left, 0);
	}, [widthOfItems, styledCarouselItemsWrapperRef]);

	const scroll = (newIndex: number) => {
		const ref = styledCarouselItemsWrapperRef.current!;
		const left = widthOfItems * newIndex - ref.clientWidth / 2 - widthOfItems / 2;

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
					<StyledLeftArrow
						rounded={true}
						size="tiniest"
						active={true}
						onClick={handlePrev}
						position={arrowsPosition}
					>
						<ArrowLeftIcon active={true} />
					</StyledLeftArrow>
					<StyledRightArrow
						rounded={true}
						size="tiniest"
						active={true}
						onClick={handleNext}
						position={arrowsPosition}
					>
						<ArrowRightIcon active={true} />
					</StyledRightArrow>
				</>
			)}
			<Wrapper
				activeIndex={activeIndex!}
				maxLength={carouselItems.length}
				ref={styledCarouselItemsWrapperRef}
			>
				{carouselItems}
			</Wrapper>
			{withDots && (
				<StyledDotsWrapper dotsStyle={withDots} dotsPosition={dotsPosition}>
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
	> * {
		opacity: 0;
	}
	> *:nth-child(${({ activeIndex }) => activeIndex}) {
		opacity: 1;
	}
	${({ activeIndex }) =>
		activeIndex - 1 > 0 &&
		`
		> *:nth-child(${activeIndex - 1}) {
		transform: scale(0.9);
		opacity: 0.7
	}`};
	${({ activeIndex, maxLength }) =>
		activeIndex + 1 <= maxLength &&
		`
		> *:nth-child(${activeIndex + 1}) {
		transform: scale(0.9);
		opacity: 0.7
	}`};
	${({ activeIndex }) =>
		activeIndex - 1 > 0 &&
		`
		> *:nth-child(${activeIndex - 2}) {
		transform: scale(0.8);
		opacity: 0.5
	}`};
	${({ activeIndex, maxLength }) =>
		activeIndex + 1 < maxLength &&
		`
		> *:nth-child(${activeIndex + 2}) {
		transform: scale(0.8);
		opacity: 0.5
	}`};
`;

const StyledLeftArrow = styled(IconButton)<{ position?: CarouselProps['arrowsPosition'] }>`
	position: absolute;
	top: 50%;
	transform: ${({ position }) => {
		switch (position) {
			case 'outside':
				return 'translate(0%, -50%)';
			case 'half':
				return 'translate(50%, -50%)';
			case 'inside':
				return 'translate(100%, -50%)';
			default:
				return 'translate(0%, -50%)';
		}
	}};
	left: -38px;
	z-index: 1;
`;

const StyledRightArrow = styled(IconButton)<{ position?: CarouselProps['arrowsPosition'] }>`
	position: absolute;
	top: 50%;
	transform: ${({ position }) => {
		switch (position) {
			case 'outside':
				return 'translate(0%, -50%)';
			case 'half':
				return 'translate(-50%, -50%)';
			case 'inside':
				return 'translate(-100%, -50%)';
			default:
				return 'translate(0%, -50%)';
		}
	}};
	right: -38px;
	z-index: 1;
`;

const StyledDotsWrapper = styled.div<{
	dotsStyle: CarouselProps['withDots'];
	dotsPosition: CarouselProps['dotsPosition'];
}>`
	position: absolute;
	bottom: ${({ dotsPosition }) => (dotsPosition === 'outside' ? '-20px' : '12px')};
	right: 50%;
	transform: translate(50%, 0);
	display: flex;
	justify-content: center;
	margin-top: ${spacings.tiniest};
	${({ dotsStyle }) =>
		dotsStyle === 'primary'
			? `background-color: ${colors.black}; padding: ${spacings.tiniest}`
			: 'background-color: transparent'};
	border-radius: 20px;
`;

const StyledDot = styled.div<{ active?: boolean }>`
	border-radius: 50%;
	background-color: ${({ active }) => (active ? colors.lightBlue : colors.grey)};
	width: 8px;
	height: 8px;
	margin-right: ${spacings.medium};
	cursor: pointer;
	:last-of-type {
		margin-right: 0px;
	}
`;
