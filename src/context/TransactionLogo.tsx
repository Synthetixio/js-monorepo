import { TxState } from './useTransactionDialogContext';

export const TransactionLogo = ({ txState }: Record<'txState', TxState>) => {
  if (txState === 'signing') {
    return (
      <svg
        fill='none'
        height='94'
        viewBox='0 0 94 94'
        width='94'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_d_4312_39844)'>
          <path
            clipRule='evenodd'
            d='M47 77C63.5685 77 77 63.5685 77 47C77 30.4315 63.5685 17 47 17C30.4315 17 17 30.4315 17 47C17 63.5685 30.4315 77 47 77ZM47 79C64.6731 79 79 64.6731 79 47C79 29.3269 64.6731 15 47 15C29.3269 15 15 29.3269 15 47C15 64.6731 29.3269 79 47 79Z'
            fill='white'
            fillRule='evenodd'
          />
        </g>
        <path
          clipRule='evenodd'
          d='M58.1253 39.6462L54.4199 35.9408L51.3539 39.0068L55.0539 42.7068L58.1253 39.6462ZM53.6372 44.1185L49.9397 40.421L35.7361 54.6246L35.7862 58.2136L39.4413 58.2647L53.6372 44.1185ZM39.5826 58.5943L39.5872 58.2668L39.5968 58.2669L39.5889 58.6007L39.5883 58.6268L39.5732 59.2666L39.5822 58.621L39.5824 58.6125L39.5826 58.5943ZM34.7859 60.1998L39.5555 60.2664C39.783 60.271 40.009 60.2282 40.2191 60.1406C40.4254 60.0547 40.6118 59.9275 40.7671 59.767L59.7708 40.8299L59.7716 40.8291C59.9274 40.6744 60.0511 40.4903 60.1356 40.2876C60.2202 40.0845 60.2638 39.8666 60.2638 39.6466C60.2638 39.4266 60.2202 39.2087 60.1356 39.0056C60.0513 38.8033 59.9279 38.6196 59.7725 38.465L59.7708 38.4633L55.6032 34.2957L55.6015 34.294C55.4469 34.1386 55.2632 34.0152 55.0609 33.9309C54.8578 33.8463 54.6399 33.8027 54.4199 33.8027C54.1999 33.8027 53.982 33.8463 53.7789 33.9309C53.5766 34.0152 53.3929 34.1386 53.2383 34.294L53.2366 34.2957L34.3377 53.1946C34.1757 53.3262 34.04 53.4878 33.9383 53.6709C33.8201 53.8836 33.7508 54.12 33.7353 54.3629L33.7328 54.4017L33.7333 54.4406L33.8 59.2139L33.8136 60.1863L34.7859 60.1998Z'
          fill='white'
          fillRule='evenodd'
        />
        <defs>
          <filter
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
            height='94'
            id='filter0_d_4312_39844'
            width='94'
            x='0'
            y='0'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='7.5' />
            <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0' />
            <feBlend
              in2='BackgroundImageFix'
              mode='normal'
              result='effect1_dropShadow_4312_39844'
            />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow_4312_39844'
              mode='normal'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    );
  }
  if (txState === 'error' || txState === 'failed') {
    return (
      <svg
        fill='none'
        height='94'
        viewBox='0 0 94 94'
        width='94'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_d_707_15445)'>
          <path
            clipRule='evenodd'
            d='M47 76.3333C63.2004 76.3333 76.3333 63.2004 76.3333 47C76.3333 30.7996 63.2004 17.6667 47 17.6667C30.7996 17.6667 17.6667 30.7996 17.6667 47C17.6667 63.2004 30.7996 76.3333 47 76.3333ZM47 79C64.6731 79 79 64.6731 79 47C79 29.3269 64.6731 15 47 15C29.3269 15 15 29.3269 15 47C15 64.6731 29.3269 79 47 79Z'
            fill='#FF1E39'
            fillRule='evenodd'
          />
        </g>
        <g filter='url(#filter1_d_707_15445)'>
          <path
            d='M56.3333 39.547L54.4533 37.667L47 45.1203L39.5466 37.667L37.6666 39.547L45.12 47.0003L37.6666 54.4537L39.5466 56.3337L47 48.8803L54.4533 56.3337L56.3333 54.4537L48.88 47.0003L56.3333 39.547Z'
            fill='#FF1E39'
          />
        </g>
        <defs>
          <filter
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
            height='94'
            id='filter0_d_707_15445'
            width='94'
            x='0'
            y='0'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='7.5' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 1 0 0 0 0 0.116667 0 0 0 0 0.222667 0 0 0 0.6 0'
            />
            <feBlend in2='BackgroundImageFix' mode='normal' result='effect1_dropShadow_707_15445' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow_707_15445'
              mode='normal'
              result='shape'
            />
          </filter>
          <filter
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
            height='48.667'
            id='filter1_d_707_15445'
            width='48.6666'
            x='22.6666'
            y='22.667'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='7.5' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 1 0 0 0 0 0.116667 0 0 0 0 0.222667 0 0 0 0.6 0'
            />
            <feBlend in2='BackgroundImageFix' mode='normal' result='effect1_dropShadow_707_15445' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow_707_15445'
              mode='normal'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    );
  }
  if (txState === 'confirmed') {
    return (
      <svg
        fill='none'
        height='94'
        viewBox='0 0 94 94'
        width='94'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_d_707_15431)'>
          <path
            clipRule='evenodd'
            d='M47 76.3333C63.2004 76.3333 76.3333 63.2004 76.3333 47C76.3333 30.7996 63.2004 17.6667 47 17.6667C30.7996 17.6667 17.6667 30.7996 17.6667 47C17.6667 63.2004 30.7996 76.3333 47 76.3333ZM47 79C64.6731 79 79 64.6731 79 47C79 29.3269 64.6731 15 47 15C29.3269 15 15 29.3269 15 47C15 64.6731 29.3269 79 47 79Z'
            fill='#31D8A4'
            fillRule='evenodd'
          />
        </g>
        <g filter='url(#filter1_d_707_15431)'>
          <path
            d='M42.7266 52.1662L37.1666 46.6062L35.2733 48.4862L42.7266 55.9396L58.7266 39.9396L56.8466 38.0596L42.7266 52.1662Z'
            fill='#31D8A4'
          />
        </g>
        <defs>
          <filter
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
            height='94'
            id='filter0_d_707_15431'
            width='94'
            x='0'
            y='0'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='7.5' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.266667 0 0 0 0 0.937255 0 0 0 0 0.756863 0 0 0 0.6 0'
            />
            <feBlend in2='BackgroundImageFix' mode='normal' result='effect1_dropShadow_707_15431' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow_707_15431'
              mode='normal'
              result='shape'
            />
          </filter>
          <filter
            colorInterpolationFilters='sRGB'
            filterUnits='userSpaceOnUse'
            height='47.8799'
            id='filter1_d_707_15431'
            width='53.4534'
            x='20.2733'
            y='23.0596'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='7.5' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.266667 0 0 0 0 0.937255 0 0 0 0 0.756863 0 0 0 0.6 0'
            />
            <feBlend in2='BackgroundImageFix' mode='normal' result='effect1_dropShadow_707_15431' />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow_707_15431'
              mode='normal'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    );
  }
  return (
    <svg fill='none' height='94' viewBox='0 0 94 94' width='94' xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_d_1447_13624)'>
        <circle cx='47' cy='47' r='31' stroke='#FFD75C' strokeWidth='2' />
      </g>
      <circle cx='59' cy='47' fill='#FFD75C' r='4' />
      <circle cx='47' cy='45' fill='#FFD75C' r='4' />
      <circle cx='35' cy='47' fill='#FFD75C' r='4' />
      <defs>
        <filter
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
          height='94'
          id='filter0_d_1447_13624'
          width='94'
          x='0'
          y='0'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            result='hardAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='7.5' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0.360784 0 0 0 0.6 0'
          />
          <feBlend in2='BackgroundImageFix' mode='normal' result='effect1_dropShadow_1447_13624' />
          <feBlend
            in='SourceGraphic'
            in2='effect1_dropShadow_1447_13624'
            mode='normal'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
