import React from "react";
import { useLocation } from "react-router-dom";

function GetInvoice() {
  let location = useLocation();
  const state = location.state;
  const { companyName, typeOfLoan, amount, fees } = state;
  const payableBillAmount = Math.floor(amount * fees) / 100;
  const payableBillAmountWithGST = Math.floor(payableBillAmount * 18) / 100;
  const invoiceAmount = payableBillAmount + payableBillAmountWithGST;
  const tds = Math.floor(payableBillAmount * 10) / 100;
  const finalPayableAmount = invoiceAmount - tds;
  const handleClick = () => {
    window.print();
  };
  return (
    <div>
      <button className="btn btn-success" onClick={handleClick}>
        Print
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="595.30398pt"
        height="841.8898pt"
        viewBox="0 0 595.30398 841.8898"
      >
        <defs>
          <clipPath id="clip_0">
            <path
              transform="matrix(1,0,0,-1,0,841.8898)"
              d="M0 .028H595.275V841.88906H0Z"
              fill-rule="evenodd"
            />
          </clipPath>
        </defs>
        <g>
          <g clip-path="url(#clip_0)">
            <path
              transform="matrix(1,0,0,-1,0,841.8898)"
              d="M53.828 656.854H131.795V665.102H53.828Z"
              fill-rule="evenodd"
            />
            <path
              transform="matrix(1,0,0,-1,0,841.8898)"
              d="M53.828 591.009H540.475V599.25698H53.828Z"
              fill-rule="evenodd"
            />
          </g>
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width="1.06754"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M53.811 746.873H540.545"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M53.586 599.17H540.769"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M53.811 599.395V407.79"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M452.687 599.395V407.79"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M540.545 599.395V407.79"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M540.545 599.395V407.79"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M53.586 590.94H270.938"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M53.586 467.013H540.769"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M452.462 450.551H540.769"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M452.462 428.591H540.769"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M53.586 416.245H540.769"
          />
          <path
            transform="matrix(1,0,0,-1,0,841.8898)"
            stroke-width=".45751"
            stroke-linecap="butt"
            stroke-linejoin="round"
            fill="none"
            stroke="#000000"
            d="M53.586 408.015H540.769"
          />
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="12.208"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-759.686"
              x="203.104 211.21012 217.99776 225.49347 230.19356 236.9812 243.76885 250.55649 253.95032 262.7523 270.248 277.74369 284.53135 291.319 294.71284 303.5148 310.30247 317.79817 321.192 325.28169 332.06935 335.46318 338.857 347.65898 355.15467 361.94233 365.33616 372.1238 379.6195 384.31959"
            >
              Express Rupya Capital Advisors
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="7.297"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-748.983"
              x="151.092 156.38233 158.3817 162.47531 164.47469 166.47406 171.76439 177.05472 182.34505 187.63538 192.9257 198.21604 200.21541 205.50574 210.79607 212.79544 218.08577 223.3761 225.37548 229.86313 235.15346 237.15283 242.44316 248.13483 250.1342 252.13358 257.02256 262.31288 267.60319 272.8935 278.1838 283.47413 288.76445 290.76383 295.2515 300.5418 305.83213 310.7211 312.7205 314.71989 320.0102 325.3005 330.59083 335.88114 337.88053 342.7695 348.0598 352.5475 354.54689 356.54627 363.43464 368.3236 373.2126 377.70027 379.69966 381.69905 387.79203 393.08235 399.17533 404.46565 409.75596 411.75535 413.75474 416.15547 418.15486 422.24848 426.3421 430.43574 434.52937 438.623"
            >
              A/4, CHANDRIKA BUILDING, SHANKAR LANE, KANDIVALI WEST, MUMBAI -
              400067
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-699.893"
              x="54.399 56.292837 61.084306 65.57464 70.76763 72.66147 77.45294"
            >
              INVOICE
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-699.893"
              x="390.508 395.29948 400.09095 404.17976 408.67008"
            >
              DATE:
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-699.893"
              x="453.292 456.986 458.87986 463.67134 467.76014 470.35664 472.2505 475.9445"
            >
              4/Apr/23
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-691.696"
              x="390.508 392.40187 397.19334 401.68367 406.87666 408.7705 413.56199 418.0523 419.94618"
            >
              INVOICE #
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-691.696"
              x="453.292 456.986 460.68 464.374 466.26786 469.96186 473.65586 475.85084 479.54484"
            >
              001/23-24
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-683.483"
              x="390.508 394.99833 399.7898 404.58128 406.47514 411.2666 415.3554"
            >
              PAN No.
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-683.483"
              x="453.292 458.08348 462.5738 467.76679 472.2571 477.04859 480.74259 484.43659 488.13059 491.8246"
            >
              AVGPK3532Q
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-675.183"
              x="390.508 395.701 400.1913 404.28013 406.17399 410.96546 415.05427"
            >
              GST No.
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-675.183"
              x="453.292 456.986 460.68 465.47148 469.9618 475.1548 479.6451 484.43659 488.13059 491.8246 495.5186 499.2126 504.40559 508.09959 512.1884"
            >
              27AVGPK3532Q1Z4
            </tspan>
          </text>
          <text
            fill="#ffffff"
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-658.791"
              x="54.399 59.190469 61.084306 65.17312 69.26193 71.15577 75.24458 80.43758"
            >
              BILL TO:
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-642.295"
              x="54.399 59.190469 62.884454 66.97327 68.8671 70.76094 74.45492 78.148899 81.84287 84.43937 88.13335 90.02718 94.116 96.009838 100.09865 103.792629 107.88144 111.57542 115.269397 117.16323 119.05707 123.14588 127.234699 129.12853 132.82251 134.71634 136.91132 141.40166 143.59664 145.49047 149.57929 151.77426"
            >
              Achiievers Finance India (P) Ltd
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-634.082"
              x="54.399 58.092985 61.78697 63.680807 68.472278 70.36611 72.25995 77.05142 78.94526 82.63924 88.62858 92.71739 96.806209 100.89502 102.78886 107.58033 111.27431 113.870807 117.95962 122.04843 126.137248 128.73374 130.62757 135.41904 139.50786 143.20185 147.29067 149.1845"
            >
              32/A, Diamond Harbour Road,{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-625.886"
              x="54.399 58.889329 62.583314 66.27729 70.366107 74.06008 76.65658 80.74539 84.43937 87.82552 91.5195 94.116 96.009838 97.90367 102.695148 106.78396 108.677799 112.37177 116.06575 118.26073"
            >
              Sakherbazar, Kolkata
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-617.586"
              x="54.399 60.689477 64.38345 68.07743 70.27241 72.166248 76.95772 80.651699 84.74051 88.82932 92.5233 94.41714 96.310977 98.50595 100.39979 104.093769 107.78774 111.48172 115.1757 118.869678"
            >
              West Bengal - 700008
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-609.39"
              x="54.399 59.59199 64.08233 68.17114 70.06498 74.85645 78.94527 80.8391 83.03408 84.92792 88.621898 92.31587 97.107349 101.89882 106.69029 111.481769 113.3756 117.06958 120.76356 124.457538 128.15152 133.73934 137.43332 141.52214"
            >
              GST No - 19AAACI6565M2ZZ
            </tspan>
          </text>
          <text
            fill="#ffffff"
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-592.894"
              x="54.399 59.190469 63.680799 68.171138 72.96261 77.75408 79.64792 84.13825 88.227069 90.1209 95.313899"
            >
              DESCRIPTION
            </tspan>
          </text>
          <text
            fill="#ffffff"
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-592.894"
              x="481.996 486.78749 492.3753 497.5683 502.35978 507.15126"
            >
              AMOUNT
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-533.187"
              x="67.194 71.282817 74.97679 77.57329 83.56263 85.45647 89.54528 93.634098 97.32807 101.416889 103.31072 105.20456 107.0984 113.08774 114.981578 117.17655 119.07039 122.764369 125.36086 127.95736 131.65135 135.74018 139.829 143.52298 147.6118"
            >
              {typeOfLoan} limit arranged{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-533.187"
              x="271.595 276.38648 280.08049 281.97434 285.66835 289.36235 291.2562 294.9502 298.6442 300.53807 304.23207 307.92607 311.62007 313.51393"
            >
              Rs {amount}/-
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan y="-524.991" x="67.194 71.282817 74.97679 78.67077">
              Fees
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-524.991"
              x="271.595 273.48887 279.9801 281.87397 285.56797"
            >
              {" "}
              @ {fees}%
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-525.285"
              x="454.901 456.79487 458.68873 460.58259 462.47645 464.3703 466.26417 468.15803 470.05189 471.94575 473.8396 475.73347 477.62733 479.52119 481.41505 483.3089 485.20277 487.09663 488.99049 490.88435 492.7782 494.67207 496.56593 498.45979 500.35365 502.2475 504.14137 506.03523 507.92909 509.82295 511.7168 513.61068 515.5045 517.3984 521.09237 524.7863 526.6802 530.37417 534.0681 537.7621"
            >
              {" "}
              {payableBillAmount}{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-476.99"
              x="54.399 58.889329 63.680799 68.47227 70.667247 72.56108 76.25506 79.949039 83.64301 87.33699 91.03097"
            >
              SAC: 997156
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-460.494"
              x="330.092 334.18083 338.26963 340.4646 344.1586 346.05247 347.94633 352.7378 354.63166 356.5255 358.41938 362.11338 366.20219 368.09605 372.8875 378.87687 382.96568 387.05448 391.14329"
            >
              Total Billed Amount
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-460.788"
              x="454.901 456.79487 458.68873 460.58259 462.47645 464.3703 466.26417 468.15803 470.05189 471.94575 473.8396 475.73347 477.62733 479.52119 481.41505 483.3089 485.20277 487.09663 488.99049 490.88435 492.7782 494.67207 496.56593 498.45979 500.35365 502.2475 504.14137 506.03523 507.92909 509.82295 511.7168 513.61068 515.5045 517.3984 521.09237 524.7863 526.6802 530.37417 534.0681 537.7621"
            >
              {" "}
              {payableBillAmount}{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-452.281"
              x="334.501 339.29249 343.3813 347.4701 349.66508 351.55894 353.4528 358.64579 363.1361 367.2249 369.11878 375.61003 379.30403 382.99803"
            >
              Add: IGST @18%
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-452.592"
              x="454.901 456.79487 458.68873 460.58259 462.47645 464.3703 466.26417 468.15803 470.05189 471.94575 473.8396 475.73347 477.62733 479.52119 481.41505 483.3089 485.20277 487.09663 488.99049 490.88435 492.7782 494.67207 496.56593 498.45979 500.35365 502.2475 504.14137 506.03523 507.92909 509.82295 511.7168 513.61068 515.5045 517.3984 521.09237 524.7863 526.6802 530.37417 534.0681 537.7621"
            >
              {" "}
              {payableBillAmountWithGST}{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-442.684"
              x="350.703 354.7918 359.9848 364.0736 368.86509"
            >
              TOTAL
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-441.595"
              x="454.901 456.79487 458.68873 460.58259 462.47645 464.3703 466.26417 468.15803 470.05189 471.94575 473.8396 475.73347 477.62733 479.52119 481.41505 483.3089 485.20277 487.09663 488.99049 490.88435 492.7782 494.67207 496.56593 498.45979 500.35365 502.2475 504.14137 506.03523 507.92909 509.82295 511.7168 513.61068 515.5045 517.3984 521.09237 524.7863 526.6802 530.37417 534.0681 537.7621"
            >
              {" "}
              {invoiceAmount}{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-431.687"
              x="346 350.79148 354.88029 358.9691 363.0579 367.1467 369.04057 373.12937 375.32435"
            >
              Round off
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-430.597"
              x="454.105 455.99888 457.89274 459.7866 461.68046 463.5743 465.46818 467.36204 469.2559 471.14976 473.0436 474.93748 476.83134 478.7252 480.61906 482.5129 484.40678 486.30064 488.1945 490.08836 491.9822 493.87608 495.76994 497.6638 499.55766 501.4515 503.34538 505.23924 507.1331 509.02696 510.9208 512.81466 514.7085 516.60238 518.4962 520.3901 522.28396 524.1778 526.07168 527.9655 529.8594 531.75326 533.94827 535.8421 537.73599"
            >
              {" "}
              -{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-420.084"
              x="305.4 309.4888 314.6818 318.7706 323.56208 327.65089 329.54475 331.4386 335.5274 339.2214 343.3102 345.20408 348.89808 352.59208 354.48594 359.2774 365.26676 369.35557 373.44438 377.53318 379.72816 381.622 383.817 385.71086 389.79966 391.6935 396.485 400.5738 404.6626 408.3566 412.0506 415.7446"
            >
              TOTAL Invoice Amount (in Rupees)
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-418.182"
              x="454.901 456.79487 458.68873 460.58259 462.47645 464.3703 466.26417 468.15803 470.05189 471.94575 473.8396 475.73347 477.62733 479.52119 481.41505 483.3089 485.20277 487.09663 488.99049 490.88435 492.7782 494.67207 496.56593 498.45979 500.35365 502.2475 504.14137 506.03523 507.92909 509.82295 511.7168 513.61068 515.5045 517.3984 521.09237 524.7863 526.6802 530.37417 534.0681 537.7621"
            >
              {" "}
              {invoiceAmount}{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-409.986"
              x="54.399 59.190469 65.17981 69.26862 73.35744 77.44625 79.64123 81.535068 86.32654 90.41535 94.10933 96.705829 100.79464 104.48862 108.182598 112.27141 114.165248 117.85922 119.75306 121.94804 123.84187 127.93069 129.82453 135.0175 139.10633 141.70282 145.79164 149.48563 151.6806 153.57444"
            >
              Amount Chargeable (in words) :
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-409.986"
              x="193.507 198.29848 201.99246 203.88629 208.37664 210.27046 214.35929 218.4481 220.64308 224.33707 226.2309 230.72124 232.61507 236.70389 240.79271 242.98769 244.88152 248.97034 253.05916 257.14796 261.23677 264.93077 268.62477 272.71357 276.80238 278.69624 282.78504 284.6789 288.3729 292.0669 293.96076 298.75224 302.84104 306.92985 311.01866 313.61515 317.30915 321.39796 323.2918 328.4848 332.5736 334.46748"
            >
              Rs Eighty Eight Thousand Five Hundred Only
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-393.594"
              x="54.399 58.48781 63.279279 67.769618 69.66345 75.95393 80.04275 82.639247 86.33322 88.22706 92.31587"
            >
              TDS Working
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-385.294"
              x="54.399 58.48781 63.279279 67.769618 69.66345 73.35743 77.05141 83.04075 84.934589 89.0234 91.218379 93.11221 97.20103 101.28984 103.48482 107.178798 109.07263 110.96647 115.75794 117.65178 119.545619 121.43945 125.13343 129.22225 131.11608 135.90755 141.89688 145.9857 150.07453 154.16335 156.35832 158.25215 160.44713 164.53595 168.62477 170.5186 174.60742 178.3014 180.19524 184.28406 187.97805 189.87187 193.9607 195.85453 199.94335 203.63733 205.53116 209.22515 213.31397 217.40279 219.29662 221.4916 225.58042 227.47425 231.56307 235.25705 238.95104 240.84487 245.63634 249.72516 251.92014 256.00895 260.09776 262.69425 264.5881 266.78309 268.67695 272.37095 276.06495 277.9588 279.85267 283.94148 285.83534 289.92414 294.41447 296.30833 300.00233 303.69633 307.39033 311.08433 313.2793 316.9733 320.6673"
            >
              TDS 10% of Total Billed Amount (To be paid by you to Tax
              Authorities in FY 2023-24)
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-385.294"
              x="454.797 456.69087 458.58473 460.47859 462.37245 464.2663 466.16017 468.05403 469.94789 471.84175 473.7356 475.62947 477.52333 479.41719 481.31105 483.2049 485.09877 486.9926 488.88648 490.78034 492.6742 494.56806 496.4619 498.35578 500.24964 502.1435 504.03736 505.9312 507.82508 509.71894 511.6128 513.50668 515.4005 517.2944 519.18826 521.0821 524.77609 526.6699 530.3639 534.05789 537.75186"
            >
              {" "}
              {tds}{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-377.081"
              x="54.399 59.190469 65.17981 69.26862 73.35744 77.44625 79.64123 81.535068 86.0254 89.719379 93.41335 97.10733 101.196147 103.08998 106.78396 108.677799 112.76661 116.46059 118.35442 122.0484 126.137218"
            >
              Amount Payable by you
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-377.081"
              x="454.901 456.79487 458.68873 460.58259 462.47645 464.3703 466.26417 468.15803 470.05189 471.94575 473.8396 475.73347 477.62733 479.52119 481.41505 483.3089 485.20277 487.09663 488.99049 490.88435 492.7782 494.67207 496.56593 498.45979 500.35365 502.2475 504.14137 506.03523 507.92909 509.82295 511.7168 513.61068 515.5045 517.3984 521.09237 524.7863 526.6802 530.37417 534.0681 537.7621"
            >
              {" "}
              {finalPayableAmount}{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-351.887"
              x="54.399 58.48781 62.57662 65.17312 67.066959 71.55729 75.25127 79.34008 81.93658 85.630558 89.32453 93.01851 94.912349 99.70382 103.79263 107.88145 111.575428 115.2694 117.16324 121.95471 125.64869 129.7375 131.63134 133.82631 137.5203 139.41413 141.30796 146.09943 150.18825 153.88224 155.77606 159.47005 163.55887 166.15537"
            >
              For Express Rupya Capital Advisors
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-319.483"
              x="54.399 59.190469 63.279279 65.47425 69.563068 73.65188 76.248378 78.14221 81.83619 85.53017 89.61898 91.51282 96.00315 97.89699 101.9858 106.074619 109.76859 111.96357 116.05238 118.64888"
            >
              Authorised Signatory
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
            font-style="italic"
          >
            <tspan
              y="-294.791"
              x="248.2 252.28882 256.37763 260.07164 264.16044 267.85444 269.7483 274.23863 278.32743 282.41624 284.3101 288.3989 292.4877 295.0842 296.97807 301.46839 305.5572 309.646 312.2425 314.13636 318.92784 323.01664 326.71064 328.6045 332.6933 336.3873 340.0813 343.7753"
            >
              Thank You For Your Business!
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-278.295"
              x="54.399 59.190469 62.884454 66.97327 70.667247 72.56108 77.352558 81.04653 83.24151 86.935489 88.82932 90.72316 94.41714 96.612117"
            >
              Bank Details:{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-571.695"
              x="54.399 58.795644 62.489629 65.08613 68.873798 70.76763 74.46161 78.15559 80.04942 84.8409 88.92971 92.62369 95.31387 99.309 103.096668 106.79064 108.68448 112.77329 116.86211 119.4586 121.35244 123.24628 127.2414 129.53006 132.12656 136.21538 140.3042 144.39302 148.087 149.98084 154.06966 158.15848 160.0523 163.74629 167.83512 171.83025 173.72408 178.60924 182.69806 184.89304 188.98186 191.57836 195.66718 197.561 201.64983 205.34381 207.63248 209.43262 213.52144 217.61026 219.50409 224.79076 226.5909 228.87957 232.96839 234.86222 240.45003 244.14402 248.23284 252.32166 256.01567 257.90953 259.80339 264.59486 267.19136 270.97904 274.97416 276.868 279.15669 281.05055 283.2455 287.33433 290.0245 291.82469 295.61238 298.20887 300.80537 304.49937 308.58818 312.67698 314.57084 318.65965 322.74845 324.6423 328.63743 332.4251 335.0216 341.01097 342.90483 346.99363 350.98875 354.77644 358.77156 360.6654 362.55928 364.45314 370.44248 372.33634 374.5313 378.319"
            >
              Service Charges For Introducing and Co-ordinating with{" "}
              {companyName} for arranging Term Loan limits{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-270.082"
              x="54.399 59.190469 62.884454 66.57843 70.667247 74.75606 78.84487 81.13354 82.933689 87.81885 91.81397 93.70781 97.79662 101.4906 104.180789 106.07462 110.8661 114.560077 120.549419 124.24339"
            >
              Account Holder Name:
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
          >
            <tspan
              y="-270.082"
              x="126.694 128.49414 132.98448 136.37062 140.0646 142.25959 146.04726 149.3464 152.73255 154.53269 159.41785 163.11183 166.80582 170.19196 173.88594 175.77977 180.57125 184.26523 187.95922 189.45154 191.34537 195.03936 196.53168 198.4255 202.82216 206.51615 209.90229 211.3946 214.69376 218.38774 220.6764"
            >
              {" "}
              Express Rupya Capital Advisors
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-261.886"
              x="54.399 59.190469 62.884454 66.97327 70.667247 72.56108 77.352558 81.14022 87.03587 90.82354 93.01852"
            >
              Bank Name:{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
          >
            <tspan
              y="-261.886"
              x="94.999 99.790477 104.58195 108.67076 113.462238 115.35607 119.752719 124.24305 129.03453 133.52487 135.4187 139.11269 143.2015"
            >
              HDFC BANK LTD
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-253.69"
              x="54.399 56.292837 60.381647 64.77829 69.56976 71.4636 76.25507 81.541759 86.33323 90.82356 93.01854"
            >
              IFSC CODE:{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
          >
            <tspan
              y="-253.69"
              x="94.999 99.790477 104.58195 108.67076 113.462238 117.15621 120.85019 124.637859 128.33185 132.02584 135.71982"
            >
              HDFC0000419
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-245.39"
              x="54.399 59.190469 61.084306 64.77828 66.67212 71.46359 75.55241"
            >
              A/c No:
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
          >
            <tspan
              y="-245.39"
              x="77.897 79.69715 83.48482 87.178798 90.87277 94.56675 98.26073 102.04839 105.74237 109.43635 113.130329 116.91799 120.61197 124.30595 127.99993"
            >
              {" "}
              50200077517526
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
            font-weight="bold"
          >
            <tspan
              y="-237.194"
              x="54.399 59.190469 62.884454 66.57843 70.667247 74.75606 78.84487 81.13354 82.933689 87.0225 90.810169 94.80529 98.59296 100.78793"
            >
              Account Type:{" "}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            transform="matrix(1 0 -0 1 0 841.8898)"
            font-size="6.692"
            font-family="LiberationSans"
          >
            <tspan
              y="-237.194"
              x="102.797 107.58847 111.28245 113.477428 115.76609 119.46007 123.154048"
            >
              Current
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}

export default GetInvoice;
