import { Icon, IconProps } from '@chakra-ui/react';

export const PolynomialIcon = ({ width = '40px', height = '39px', ...props }: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 40 39" fill="none" {...props}>
      <defs>
        <path
          d="M0,37.22659 C0,36.95309 0.20833,36.40629 0.625,35.58589 C1.02864,34.77869 1.47135,33.74349 1.95312,32.48049 C2.44792,31.21749 2.91667,29.90239 3.35937,28.53519 C3.80208,27.16799 4.25133,25.70309 4.70703,24.14059 L6.23043,18.98439 L4.19923,19.53129 C3.6914,19.53129 3.27474,19.26429 2.94922,18.73049 C2.87109,18.58729 2.83203,18.41799 2.83203,18.22269 C2.83203,18.02739 2.98828,17.79949 3.30078,17.53909 C3.61328,17.26559 3.99743,17.01169 4.45313,16.77739 C5.36463,16.30859 6.30213,15.95049 7.26563,15.70309 L7.44143,15.15629 C7.79293,14.06249 8.12503,12.92969 8.43753,11.75779 C8.76303,10.57289 9.10153,9.42059 9.45313,8.30079 C9.81773,7.18099 10.22783,6.11979 10.68363,5.11719 C11.13933,4.10159 11.67313,3.21615 12.28513,2.46094 C13.63933,0.82031 15.33853,0 17.38283,0 C18.89323,0 20.09113,0.40365 20.97653,1.21094 C21.86193,2.01823 22.30473,3.11198 22.30473,4.49219 C22.30473,5.92449 21.89453,7.16799 21.07423,8.22269 C20.38413,9.09509 19.61593,9.53129 18.76953,9.53129 C17.71483,9.53129 16.99873,9.04949 16.62113,8.08589 C16.51693,7.83859 16.46483,7.63019 16.46483,7.46089 C16.46483,7.17449 16.66013,6.91409 17.05073,6.67969 C17.76693,6.13279 18.26823,5.40369 18.55473,4.49219 C18.64583,4.20569 18.69143,3.92578 18.69143,3.65235 C18.69143,2.58464 18.27473,2.05078 17.44143,2.05078 C16.29553,2.05078 15.24093,3.34636 14.27733,5.93749 C13.99093,6.73179 13.70443,7.60419 13.41793,8.55469 L11.58203,14.78519 C12.76693,14.60289 13.62633,14.51169 14.16013,14.51169 C14.70703,14.51169 15.18883,14.57679 15.60543,14.70699 C16.02213,14.82419 16.39973,14.99349 16.73823,15.21489 C17.50653,15.72269 17.89063,16.34769 17.89063,17.08989 C17.89063,17.83199 17.52603,18.20309 16.79683,18.20309 L14.31643,18.10549 C12.96223,18.10549 11.71223,18.16409 10.56643,18.28129 L8.96483,23.94529 C7.91013,27.78649 7.05073,30.57939 6.38673,32.32419 C5.73563,34.06899 5.09763,35.54689 4.47263,36.75779 C3.88673,37.86459 2.99479,38.41799 1.79687,38.41799 C0.59896,38.41799 0,38.02079 0,37.22659 Z M20.78903,32.49999 C20.22913,32.90369 19.79293,33.10549 19.48043,33.10549 C19.18103,33.10549 18.92713,33.05989 18.71873,32.96879 C18.52343,32.89059 18.34113,32.78649 18.17183,32.65629 C17.78123,32.33069 17.58593,32.03779 17.58593,31.77739 C17.58593,31.50389 17.72913,31.25649 18.01563,31.03519 C18.01563,31.03519 18.41273,30.71619 19.20703,30.07809 C21.34243,28.32029 23.10673,26.41279 24.50003,24.35549 C23.36723,21.17839 22.84633,18.53519 22.93753,16.42579 C22.98963,15.38409 23.43883,14.48569 24.28513,13.73049 C25.06643,13.05339 25.89973,12.71489 26.78513,12.71489 C27.04553,12.71489 27.21483,12.80599 27.29293,12.98829 C27.37113,13.17059 27.41013,13.43749 27.41013,13.78909 C27.41013,14.12759 27.39713,14.49219 27.37113,14.88279 C27.34503,15.26039 27.33853,15.66409 27.35153,16.09379 C27.37763,16.51039 27.41013,16.96619 27.44923,17.46089 C27.57943,18.78909 27.70313,19.82419 27.82033,20.56639 L28.46483,19.49219 C29.94923,17.13539 31.68103,15.26689 33.66013,13.88669 C34.77993,13.10549 35.74353,12.71489 36.55073,12.71489 C37.27993,12.71489 37.84633,12.81899 38.25003,13.02739 C39.00523,13.41799 39.25913,13.81509 39.01173,14.21879 C38.97263,14.28389 38.89453,14.33589 38.77733,14.37499 L38.28903,14.60939 C36.23173,15.50779 33.60803,17.70829 30.41793,21.21089 C29.75393,21.94009 29.17443,22.63669 28.67973,23.30079 L29.36323,25.58589 C30.20963,28.32029 31.21223,29.68749 32.37113,29.68749 C32.87893,29.68749 33.29553,29.60939 33.62113,29.45309 L34.32423,29.14059 C34.46743,29.07549 34.60413,29.04299 34.73433,29.04299 C35.00783,29.04299 35.14453,29.17969 35.14453,29.45309 C35.14453,30.59899 34.55863,31.56249 33.38673,32.34379 C32.60543,32.86459 31.72003,33.12499 30.73043,33.12499 C28.81643,33.12499 27.08463,31.15239 25.53513,27.20699 C23.89453,29.61589 22.31253,31.38019 20.78903,32.49999 Z"
          id="path-1"
        ></path>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="61ddf347ed83973b786d2977_Polynomial-Logo" transform="translate(0.172670, 0.070310)">
          <mask id="mask-2" fill="white">
            <use xlinkHref="#path-1"></use>
          </mask>
          <g id="Shape"></g>
          <g id="Group" mask="url(#mask-2)" fill="#FFFFFF" fillRule="nonzero">
            <g transform="translate(-6.772676, -5.170408)" id="Rectangle">
              <rect x="0" y="-8.8817842e-16" width="48.3" height="48.3" rx="24.15"></rect>
            </g>
          </g>
        </g>
      </g>
    </Icon>
  );
};
