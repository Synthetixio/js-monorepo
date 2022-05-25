import { TxState } from 'context/useTransactionDialogContext';

export default function TxStateSvg({ txState }: Record<'txState', TxState>) {
  if (txState === 'error' || txState === 'failed') {
    return (
      <svg
        fill="none"
        height="94"
        viewBox="0 0 94 94"
        width="94"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_707_15445)">
          <path
            clipRule="evenodd"
            d="M47 76.3333C63.2004 76.3333 76.3333 63.2004 76.3333 47C76.3333 30.7996 63.2004 17.6667 47 17.6667C30.7996 17.6667 17.6667 30.7996 17.6667 47C17.6667 63.2004 30.7996 76.3333 47 76.3333ZM47 79C64.6731 79 79 64.6731 79 47C79 29.3269 64.6731 15 47 15C29.3269 15 15 29.3269 15 47C15 64.6731 29.3269 79 47 79Z"
            fill="#FF1E39"
            fillRule="evenodd"
          />
        </g>
        <g filter="url(#filter1_d_707_15445)">
          <path
            d="M56.3333 39.547L54.4533 37.667L47 45.1203L39.5466 37.667L37.6666 39.547L45.12 47.0003L37.6666 54.4537L39.5466 56.3337L47 48.8803L54.4533 56.3337L56.3333 54.4537L48.88 47.0003L56.3333 39.547Z"
            fill="#FF1E39"
          />
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="94"
            id="filter0_d_707_15445"
            width="94"
            x="0"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.116667 0 0 0 0 0.222667 0 0 0 0.6 0"
            />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_707_15445" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_707_15445"
              mode="normal"
              result="shape"
            />
          </filter>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="48.667"
            id="filter1_d_707_15445"
            width="48.6666"
            x="22.6666"
            y="22.667"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.116667 0 0 0 0 0.222667 0 0 0 0.6 0"
            />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_707_15445" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_707_15445"
              mode="normal"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }
  if (txState === 'confirmed') {
    return (
      <svg
        fill="none"
        height="94"
        viewBox="0 0 94 94"
        width="94"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_707_15431)">
          <path
            clipRule="evenodd"
            d="M47 76.3333C63.2004 76.3333 76.3333 63.2004 76.3333 47C76.3333 30.7996 63.2004 17.6667 47 17.6667C30.7996 17.6667 17.6667 30.7996 17.6667 47C17.6667 63.2004 30.7996 76.3333 47 76.3333ZM47 79C64.6731 79 79 64.6731 79 47C79 29.3269 64.6731 15 47 15C29.3269 15 15 29.3269 15 47C15 64.6731 29.3269 79 47 79Z"
            fill="#31D8A4"
            fillRule="evenodd"
          />
        </g>
        <g filter="url(#filter1_d_707_15431)">
          <path
            d="M42.7266 52.1662L37.1666 46.6062L35.2733 48.4862L42.7266 55.9396L58.7266 39.9396L56.8466 38.0596L42.7266 52.1662Z"
            fill="#31D8A4"
          />
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="94"
            id="filter0_d_707_15431"
            width="94"
            x="0"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.266667 0 0 0 0 0.937255 0 0 0 0 0.756863 0 0 0 0.6 0"
            />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_707_15431" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_707_15431"
              mode="normal"
              result="shape"
            />
          </filter>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="47.8799"
            id="filter1_d_707_15431"
            width="53.4534"
            x="20.2733"
            y="23.0596"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.266667 0 0 0 0 0.937255 0 0 0 0 0.756863 0 0 0 0.6 0"
            />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_707_15431" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_707_15431"
              mode="normal"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }
  return (
    <svg fill="none" height="94" viewBox="0 0 94 94" width="94" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1447_13624)">
        <circle cx="47" cy="47" r="31" stroke="#FFD75C" strokeWidth="2" />
      </g>
      <circle cx="59" cy="47" fill="#FFD75C" r="4" />
      <circle cx="47" cy="45" fill="#FFD75C" r="4" />
      <circle cx="35" cy="47" fill="#FFD75C" r="4" />
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="94"
          id="filter0_d_1447_13624"
          width="94"
          x="0"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0.360784 0 0 0 0.6 0"
          />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1447_13624" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1447_13624"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
