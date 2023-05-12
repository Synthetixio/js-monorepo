import { Icon, IconProps } from '@chakra-ui/react';

export const Uniswap = ({ width = '300px', height = '300px' }: IconProps) => {
  return (
    <Icon width={width} height={height} viewBox="0 0 300 300">
      <defs>
        <linearGradient
          x1="17.6666638%"
          y1="10.0000008%"
          x2="85.9999946%"
          y2="89.3333325%"
          id="linearGradient-pit_ok91c8-1"
        >
          <stop stopColor="#F8EEF4" offset="0%"></stop>
          <stop stopColor="#FBCCE2" offset="100%"></stop>
        </linearGradient>
        <circle id="path-pit_ok91c8-2" cx="150" cy="150" r="135"></circle>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Tokens" transform="translate(-1792.000000, -1798.000000)">
          <g id="Token" transform="translate(1792.000000, 1798.000000)">
            <circle
              id="BG"
              fill="url(#linearGradient-pit_ok91c8-1)"
              fillRule="nonzero"
              cx="150"
              cy="150"
              r="150"
            ></circle>
            <mask id="mask-pit_ok91c8-3" fill="white">
              <use xlinkHref="#path-pit_ok91c8-2"></use>
            </mask>
            <use id="Inner" fill="#FFFFFF" fillRule="nonzero" xlinkHref="#path-pit_ok91c8-2"></use>
            <rect
              id="Gradient"
              fillOpacity="0.5"
              fill="url(#pattern-pit_ok91c8-4)"
              fillRule="nonzero"
              mask="url(#mask-pit_ok91c8-3)"
              transform="translate(168.000050, 142.000012) scale(-1, -1) rotate(-45.000000) translate(-168.000050, -142.000012) "
              x="-112.99995"
              y="-15.9999885"
              width="562"
              height="316"
            ></rect>
            <circle
              id="White"
              fill="#FFFFFF"
              fillRule="nonzero"
              opacity="0.5"
              mask="url(#mask-pit_ok91c8-3)"
              cx="150"
              cy="150"
              r="135"
            ></circle>
            <g id="UNI" mask="url(#mask-pit_ok91c8-3)" fill="#FF007A">
              <g transform="translate(67.000000, 58.000000)" id="Vector">
                <path
                  d="M51.5967265,17.7246141 C49.2714135,17.3639143 49.1733472,17.3215525 50.2676775,17.1534335 C52.3647178,16.8308718 57.3166683,17.2704042 60.7290842,18.0818676 C68.6947238,19.9754302 75.9431869,24.8261964 83.6808874,33.4411842 L85.7367863,35.7299189 L88.6777536,35.2571382 C101.066525,33.2662844 113.668777,34.8485158 124.210685,39.7181855 C127.110516,41.0579117 131.682651,43.7246934 132.254167,44.4099563 C132.435406,44.6283331 132.770079,46.0342146 132.995794,47.5343877 C133.779683,52.7245063 133.387186,56.7027641 131.800507,59.6740899 C130.936562,61.2910124 130.887643,61.8034873 131.468054,63.1870223 C131.932828,64.2911372 133.22484,65.1083795 134.504635,65.1072676 C137.124267,65.1039319 139.944043,60.8688225 141.250523,54.9767626 L141.768672,52.6363318 L142.797181,53.8008168 C148.435617,60.1894505 152.865418,68.9021738 153.625957,75.1032305 L153.823868,76.7210445 L152.876542,75.2511166 C151.244275,72.721548 149.605326,70.9992198 147.507174,69.6104589 C143.723384,67.1075761 139.723895,66.2547452 129.128616,65.6965723 C119.560731,65.1928824 114.145781,64.3756367 108.775312,62.6243969 C99.6399562,59.6458438 95.0344774,55.6788227 84.1812383,41.4404096 C79.361159,35.1160434 76.382383,31.6170082 73.4180622,28.7991244 C66.6844057,22.3963695 60.0675014,19.0384331 51.5967265,17.7246141 Z"
                  fillRule="nonzero"
                ></path>
                <path
                  d="M134.412485,31.845219 C134.652655,27.6073303 135.22751,24.8121277 136.382772,22.2594319 C136.839762,21.24905 137.268957,20.42202 137.334559,20.42202 C137.401273,20.42202 137.202241,21.1678795 136.893133,22.0791913 C136.052538,24.5566117 135.914653,27.9451176 136.493952,31.8875751 C137.227805,36.8897825 137.645878,37.6115229 142.932954,43.0150148 C145.412487,45.5494756 148.29675,48.7459564 149.343047,50.1183724 L151.2444,52.6136962 L149.343047,50.8303174 C147.018067,48.6495514 141.670951,44.3964313 140.489004,43.7884454 C139.697332,43.3807123 139.579467,43.3878323 139.091343,43.8740654 C138.641025,44.3220492 138.546516,44.9952992 138.483138,48.1779967 C138.386403,53.138508 137.710376,56.3223223 136.07811,59.5059092 C135.196374,61.2277947 135.056279,60.8603119 135.855733,58.9168251 C136.451711,57.4656868 136.512855,56.8276779 136.508407,52.0257233 C136.4984,42.3773383 135.353143,40.0578026 128.636165,36.0842121 C126.933849,35.0776106 124.129654,33.6259198 122.4051,32.8580429 C120.679434,32.0900548 119.309577,31.4212512 119.359612,31.371327 C119.549747,31.1819707 126.101041,33.0941035 128.737352,34.108377 C132.659017,35.6171116 133.307264,35.8125785 133.783157,35.6305608 C134.102272,35.5085856 134.256819,34.5787095 134.412485,31.845219 Z"
                  fillRule="nonzero"
                ></path>
                <path
                  d="M56.1135172,48.3508608 C51.3928418,41.8517044 48.4721041,31.8868719 49.1044407,24.4378208 L49.299917,22.1327477 L50.3744555,22.3287754 C52.3924397,22.6968137 55.8722364,23.9918376 57.5011674,24.981427 C61.9721101,27.6966824 63.906811,31.2716587 65.8759828,40.4513799 C66.453058,43.1401722 67.2102602,46.1829925 67.5582843,47.2130551 C68.118681,48.8712289 70.2368473,52.744195 71.9591777,55.2595313 C73.2000562,57.0711471 72.3761358,57.9295278 69.6341947,57.6820192 C65.4456741,57.3039738 59.7727741,53.3888719 56.1135172,48.3508608 Z"
                  fillRule="nonzero"
                ></path>
                <path
                  d="M128.686203,96.7206866 C106.625029,87.838843 98.855072,80.1278267 98.855072,67.1186168 C98.855072,65.2050398 98.9206704,63.6383781 99.000727,63.6383781 C99.0807837,63.6383781 99.9347315,64.2699369 100.897635,65.0427062 C105.370802,68.6308021 110.381015,70.1630013 124.249722,72.1866562 C132.409944,73.3763875 137.002083,74.3381766 141.239527,75.7436161 C154.704615,80.2089995 163.034966,89.272089 165.021929,101.615272 C165.599004,105.202256 165.260971,111.928126 164.324753,115.472858 C163.58534,118.272617 161.330415,123.319527 160.733326,123.512997 C160.567653,123.56748 160.404204,122.931463 160.361952,122.066406 C160.135125,117.432014 157.792364,112.918821 153.85958,109.53865 C149.386413,105.695929 143.377716,102.635986 128.686203,96.7206866 Z"
                  fillRule="nonzero"
                ></path>
                <path
                  d="M113.19846,100.41124 C112.921597,98.7667422 112.44236,96.6652567 112.133253,95.7434931 L111.569516,94.0656357 L112.615823,95.2397999 C114.062403,96.8631714 115.205439,98.9413094 116.175014,101.709936 C116.914426,103.822543 116.997802,104.450767 116.992489,107.883197 C116.986683,111.25336 116.89441,111.960527 116.210592,113.861873 C115.134275,116.860662 113.79776,118.986606 111.555061,121.268222 C107.525541,125.370014 102.344098,127.640514 94.8676942,128.582291 C93.567885,128.74574 89.7796484,129.021502 86.4495132,129.194959 C78.0569051,129.631935 72.5329989,130.53368 67.5705971,132.276024 C66.8567584,132.526201 66.2196378,132.678532 66.1551477,132.614042 C65.9538941,132.415012 69.332957,130.400256 72.1249335,129.055971 C76.0599416,127.160185 79.9782708,126.124994 88.7555959,124.66396 C93.0919994,123.941226 97.5696103,123.065051 98.7070822,122.715915 C109.444684,119.423585 114.965266,110.927573 113.19846,100.41124 Z"
                  fillRule="nonzero"
                ></path>
                <path
                  d="M123.311253,118.371688 C120.380289,112.07056 119.707577,105.987368 121.313158,100.31335 C121.48439,99.7073658 121.761255,99.2103424 121.926928,99.2103424 C122.093713,99.2103424 122.785326,99.5850533 123.464696,100.042044 C124.81454,100.950464 127.524234,102.48267 134.741566,106.417678 C143.74683,111.327821 148.88158,115.129389 152.374052,119.473576 C155.431773,123.278492 157.324217,127.610456 158.234862,132.894196 C158.750783,135.887427 158.448345,143.088078 157.681135,146.102434 C155.259421,155.604716 149.632097,163.067772 141.605303,167.42419 C140.428915,168.061308 139.37261,168.585008 139.259197,168.588348 C139.144671,168.590568 139.572755,167.500915 140.210985,166.166637 C142.911786,160.521529 143.218673,155.030973 141.177228,148.91998 C139.927455,145.178443 137.378975,140.611873 132.23311,132.895299 C126.249985,123.923392 124.783406,121.53615 123.311253,118.371688 Z"
                  fillRule="nonzero"
                ></path>
                <path
                  d="M40.4465749,152.368938 C48.6333708,145.456267 58.8199169,140.546126 68.0987087,139.038392 C72.097095,138.389044 78.7595891,138.647004 82.4622104,139.594341 C88.3975234,141.113195 93.7068383,144.515593 96.4687937,148.569574 C99.1673709,152.531267 100.324859,155.983715 101.530157,163.664708 C102.006049,166.694631 102.523078,169.737889 102.679856,170.426154 C103.584941,174.407862 105.346188,177.59012 107.529956,179.187918 C110.996855,181.72527 116.967754,181.883157 122.840801,179.592647 C123.837062,179.203483 124.703235,178.934401 124.763277,178.995555 C124.976762,179.206816 122.019102,181.186 119.93318,182.22896 C117.125637,183.631064 114.892941,184.173679 111.926396,184.173679 C106.547032,184.173679 102.081655,181.437286 98.3545723,175.856668 C97.6218313,174.759225 95.9739909,171.470232 94.6919721,168.548163 C90.7580758,159.574033 88.814489,156.840986 84.2468109,153.848868 C80.2706626,151.245914 75.143693,150.778919 71.2865176,152.670258 C66.2195968,155.154239 64.8063794,161.628823 68.4356155,165.73284 C69.8777476,167.362883 72.5674298,168.769439 74.7667648,169.042966 C78.8807886,169.555551 82.4166222,166.425545 82.4166222,162.271493 C82.4166222,159.574028 81.3803343,158.035166 78.769597,156.856554 C75.205963,155.248749 71.3743589,157.128966 71.3921493,160.476891 C71.3999326,161.904569 72.0226,162.801875 73.4536131,163.449 C74.3720411,163.86485 74.3931646,163.898215 73.6437451,163.742549 C70.3736521,163.064291 69.6075549,159.12149 72.2371944,156.504081 C75.3938737,153.361857 81.9229377,154.748393 84.1645248,159.036985 C85.1063026,160.83826 85.2152695,164.426362 84.3946885,166.593451 C82.5567206,171.44244 77.1984825,173.993131 71.7624116,172.605482 C68.0620139,171.660369 66.5542815,170.637432 62.0922335,166.040845 C54.3391891,158.054079 51.3291666,156.506303 40.151142,154.761735 L38.009182,154.427059 L40.4465749,152.368938 Z"
                  fillRule="nonzero"
                ></path>
                <path
                  d="M3.8133479,4.77722885 C29.7064569,36.2039258 47.793132,53.8136992 49.7749797,56.5530833 C51.4112493,58.8150183 50.7954792,60.8485729 47.9921612,62.4420345 C46.4332798,63.3282175 43.2282346,64.2266322 41.6235429,64.2266322 C39.8085912,64.2266322 37.7638075,63.3526751 36.2748645,61.9394522 C35.2225639,60.9417458 30.9749406,54.5989258 21.1693318,39.3841521 C13.6664647,27.7422425 7.38771755,18.0847369 7.21637402,17.9230669 C6.82031583,17.5491354 6.82707329,17.561699 20.4042413,41.8549012 C28.9296106,57.1092581 31.8076088,62.502075 31.8076088,63.223697 C31.8076088,64.690291 31.4073342,65.4619492 29.5976085,67.4800448 C26.5808059,70.8457612 25.2323156,74.6273276 24.2587374,82.4539805 C23.1674092,91.2268587 20.0986052,97.4234727 11.5940281,108.029871 C6.61561455,114.238712 5.80103904,115.377296 4.54492761,117.879068 C2.96269629,121.0313 2.52760056,122.795854 2.35125348,126.775338 C2.16489931,130.982761 2.52782323,133.700119 3.81328889,137.722968 C4.93864115,141.24435 6.11325959,143.570319 9.11616353,148.22139 C11.7076648,152.235343 13.1998303,155.217473 13.1998303,156.384966 C13.1998303,157.313402 13.3770419,157.314517 17.3927738,156.407208 C27.0030215,154.237894 34.8063747,150.420752 39.1951486,145.742995 C41.9112938,142.847612 42.5489726,141.249933 42.5696539,137.281568 C42.5832191,134.687509 42.491936,134.143825 41.7904394,132.650545 C40.6486309,130.221048 38.5698168,128.200796 33.9882397,125.068578 C27.9849897,120.964561 25.4210041,117.661143 24.7127248,113.117926 C24.131758,109.389731 24.8057757,106.75897 28.1267937,99.7984855 C31.5642275,92.5944955 32.416028,89.5234291 32.9922137,82.2616205 C33.364366,77.5705212 33.8798325,75.7192103 35.2277868,74.2348259 C36.6337822,72.6859513 37.8993517,72.1611379 41.378704,71.6863573 C47.0511648,70.9113641 50.6631664,69.4436645 53.6320462,66.7072825 C56.2080923,64.3344912 57.2855221,62.0473096 57.451195,58.6045388 L57.5768471,55.9951326 L56.1369272,54.3170577 C50.9247924,48.2396436 0.322764247,0 0.00198155414,0 C-0.0665113812,0 1.64870424,2.14981298 3.8133479,4.77722885 Z M16.1256639,131.535352 C17.304165,129.448319 16.6780562,126.765352 14.7067716,125.455536 C12.8442307,124.216881 9.95086779,124.799511 9.95086779,126.413988 C9.95086779,126.906559 10.2231684,127.264565 10.8369362,127.580344 C11.8704457,128.111831 11.9455001,128.710017 11.1323689,129.931994 C10.308897,131.170648 10.3752797,132.258075 11.3198373,132.997488 C12.8421372,134.189443 14.9970871,133.534546 16.1256639,131.535352 Z"
                  fillRule="evenodd"
                ></path>
                <path
                  d="M61.1560332,73.0550982 C58.4930368,73.8723434 55.904542,76.6943383 55.1033081,79.6542115 C54.6144064,81.4599342 54.8918222,84.6266188 55.6243407,85.6039774 C56.8074005,87.1839848 57.9504303,87.5998359 61.0481789,87.5787098 C67.112472,87.5364577 72.3850944,84.9357333 72.9977503,81.6834309 C73.5003283,79.0182107 71.1842447,75.3244827 67.9953205,73.703335 C66.349711,72.8671876 62.8494542,72.5347298 61.1560332,73.0550982 Z M68.2454959,78.5979115 C69.1806024,77.269193 68.7714229,75.8326201 67.1814084,74.8619329 C64.1514858,73.0117341 59.5715832,74.5428129 59.5715832,77.4037271 C59.5715832,78.8280688 61.9599371,80.3825035 64.1492648,80.3825035 C65.6069634,80.3825035 67.6017068,79.5130038 68.2454959,78.5979115 Z"
                  fillRule="evenodd"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </Icon>
  );
};
