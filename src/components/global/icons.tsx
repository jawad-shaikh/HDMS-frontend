import { IconProps } from "@/utils/types";

export const Icons = {
    eye: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
    ),
    eyeClose: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
    ),
    users: (props: IconProps) => (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1667 13.25C13.1667 11.8693 11.3012 10.75 9 10.75C6.69881 10.75 4.83333 11.8693 4.83333 13.25M16.5 10.7503C16.5 9.72515 15.4716 8.84411 14 8.45833M1.5 10.7503C1.5 9.72515 2.52841 8.84411 4 8.45833M14 5.11342C14.5115 4.65565 14.8333 3.99042 14.8333 3.25C14.8333 1.86929 13.714 0.75 12.3333 0.75C11.693 0.75 11.109 0.990711 10.6667 1.38658M4 5.11342C3.48854 4.65565 3.16667 3.99042 3.16667 3.25C3.16667 1.86929 4.28595 0.75 5.66667 0.75C6.30696 0.75 6.89104 0.990711 7.33333 1.38658M9 8.25C7.61929 8.25 6.5 7.13071 6.5 5.75C6.5 4.36929 7.61929 3.25 9 3.25C10.3807 3.25 11.5 4.36929 11.5 5.75C11.5 7.13071 10.3807 8.25 9 8.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    department: (props: IconProps) => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M6.92333 17.5H13.0767C16.1687 17.5 16.7225 16.2925 16.884 14.8225L17.4609 8.8225C17.6686 6.9925 17.1302 5.5 13.8458 5.5H6.15416C2.86982 5.5 2.3314 6.9925 2.53908 8.8225L3.11595 14.8225C3.27748 16.2925 3.83128 17.5 6.92333 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.92383 5.5V4.9C6.92383 3.5725 6.92383 2.5 9.38516 2.5H10.6158C13.0772 2.5 13.0772 3.5725 13.0772 4.9V5.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.17718 11.1097C6.25935 10.9003 4.37716 10.246 2.69531 9.16699" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.8613 11.1097C13.7792 10.9003 15.6614 10.246 17.3432 9.16699" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10.0007" cy="11.2497" r="1.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    ),
    required: (props: IconProps) => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6.35547V10.9388" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 13.6442V13.2275" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.5 10C2.5 6.46447 2.5 4.6967 3.59835 3.59835C4.6967 2.5 6.46447 2.5 10 2.5C13.5355 2.5 15.3033 2.5 16.4017 3.59835C17.5 4.6967 17.5 6.46447 17.5 10C17.5 13.5355 17.5 15.3033 16.4017 16.4017C15.3033 17.5 13.5355 17.5 10 17.5C6.46447 17.5 4.6967 17.5 3.59835 16.4017C2.5 15.3033 2.5 13.5355 2.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    received: (props: IconProps) => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M2.70898 10.8333H5.77534C6.3326 10.8333 6.85299 11.1118 7.16209 11.5755L7.83921 12.5911C8.14832 13.0548 8.6687 13.3333 9.22596 13.3333H10.7753C11.3326 13.3333 11.853 13.0548 12.1621 12.5911L12.8392 11.5755C13.1483 11.1118 13.6687 10.8333 14.226 10.8333H17.2923" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.54167 3.425L2.7396 9.96392C2.58059 10.5409 2.5 11.1367 2.5 11.7352V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V11.7352C17.5 11.1367 17.4194 10.5409 17.2604 9.96392L15.4583 3.425C15.3204 3.14732 15.1076 2.91364 14.8441 2.75023C14.5806 2.58682 14.2767 2.50016 13.9667 2.5H6.03333C5.72326 2.50016 5.41939 2.58682 5.15587 2.75023C4.89235 2.91364 4.67965 3.14732 4.54167 3.425Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.58398 7.28485L9.44562 8.26958C9.52464 8.35988 9.66711 8.35323 9.73737 8.25595L11.4871 5.83331" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    history: (props: IconProps) => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M8.75 9.58301H11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.6667 6.66667V15.8333C16.6667 16.7538 15.9205 17.5 15 17.5H5C4.07953 17.5 3.33333 16.7538 3.33333 15.8333V6.66667M17.5 6.66667V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V6.66667H17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    ),
    error: (props: IconProps) => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 7.50002L7.5 12.5M7.49998 7.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.5 10C2.5 6.46447 2.5 4.6967 3.59835 3.59835C4.6967 2.5 6.46447 2.5 10 2.5C13.5355 2.5 15.3033 2.5 16.4017 3.59835C17.5 4.6967 17.5 6.46447 17.5 10C17.5 13.5355 17.5 15.3033 16.4017 16.4017C15.3033 17.5 13.5355 17.5 10 17.5C6.46447 17.5 4.6967 17.5 3.59835 16.4017C2.5 15.3033 2.5 13.5355 2.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    logout: (props: IconProps) => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2465 17.5H5.41667C4.49619 17.5 3.75 16.5406 3.75 15.3571V4.64286C3.75 3.45939 4.49619 2.5 5.41667 2.5H11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.334 12.9163L16.2507 9.99967L13.334 7.08301" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.91602 9.99609H16.2493" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    notification: (props: IconProps) => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6925 8.54672C15.6925 5.46219 13.642 2.5 10.0149 2.5C6.38783 2.5 4.33732 5.46219 4.33732 8.54672C4.33732 9.79802 3.51416 10.7587 2.82267 11.7624C-0.285767 16.7384 20.1616 16.5149 17.2072 11.7624C16.5157 10.7587 15.6925 9.79802 15.6925 8.54672Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.20312 15.3063C7.7271 16.6006 8.39341 17.5 10.0007 17.5C11.608 17.5 12.2743 16.6006 12.7983 15.3063" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    user: (props: IconProps) => (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_39_530)">
                <path d="M20.876 0.0615234C15.35 0.0942222 10.0624 2.31656 6.17226 6.24139C2.28211 10.1662 0.106789 15.4733 0.123138 20.9994C0.139488 26.5254 2.34617 31.8196 6.25948 35.7213C10.1728 39.6231 15.4734 41.8141 20.9995 41.8141C26.5256 41.8141 31.8263 39.6231 35.7396 35.7213C39.6529 31.8196 41.8595 26.5254 41.8759 20.9994C41.8922 15.4733 39.7169 10.1662 35.8268 6.24139C31.9366 2.31656 26.649 0.0942222 21.123 0.0615234H20.876ZM20.876 10.6851C23.355 10.7177 25.7204 11.7295 27.4561 13.4998C29.1918 15.2701 30.1568 17.6551 30.1405 20.1342C30.1242 22.6134 29.1279 24.9855 27.3691 26.7328C25.6102 28.4801 23.2317 29.4607 20.7525 29.4607C18.2732 29.4607 15.8947 28.4801 14.1358 26.7328C12.377 24.9855 11.3807 22.6134 11.3644 20.1342C11.3481 17.6551 12.3131 15.2701 14.0488 13.4998C15.7845 11.7295 18.1499 10.7177 20.6289 10.6851H20.876ZM7.04069 35.4527C9.26422 32.5703 12.023 31.1292 15.3172 31.1292H26.6819C29.976 31.1292 32.7348 32.5703 34.9583 35.4527C31.1927 39.0328 26.1954 41.0292 20.9995 41.0292C15.8036 41.0292 10.8064 39.0328 7.04069 35.4527Z" fill="#DEDEDE" />
            </g>
            <defs>
                <clipPath id="clip0_39_530">
                    <rect width="42" height="42" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    add: (props: IconProps) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6673 7.99973L8.00065 7.99973M8.00065 7.99973L1.33398 7.99973M8.00065 7.99973L8.00065 1.33301M8.00065 7.99973L8.00065 14.6663" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    ),
    arrows: (props: IconProps) => (
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M3.99945 10.1133L1.88612 8L0.94612 8.94L3.99945 12L7.05945 8.94L6.11279 8M3.99945 1.88667L6.11279 4L7.05279 3.06L3.99945 0L0.939453 3.06L1.88612 4L3.99945 1.88667Z" fill="currentColor" />
        </svg>
    ),
    trash: (props: IconProps) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M6.28516 8.57129L7.42801 19.9999H16.5709L17.7137 8.57129" stroke="#CB3A31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 15.5V10.5" stroke="#CB3A31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5 15.5V10.5" stroke="#CB3A31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.57227 6.28571H9.14369M9.14369 6.28571L9.52576 4.75746C9.63705 4.3123 10.037 4 10.4959 4H13.5058C13.9646 4 14.3646 4.3123 14.4759 4.75746L14.858 6.28571M9.14369 6.28571H14.858M14.858 6.28571H19.4294" stroke="#CB3A31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    ),
    edit: (props: IconProps) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M9.53289 11.1498C9.19166 11.4915 9 11.9547 9 12.4376V15H11.5781C12.0614 15 12.525 14.8079 12.8667 14.466L20.4666 6.86172C21.1778 6.15014 21.1778 4.99678 20.4666 4.28521L19.7159 3.53401C19.0041 2.82181 17.8496 2.82202 17.1381 3.5345L9.53289 11.1498Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    ),
    upload: (props: IconProps) => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33398 21.3385V22.6663C5.33398 24.8755 7.12485 26.6663 9.33398 26.6663H22.6673C24.8765 26.6663 26.6673 24.8755 26.6673 22.6663V21.333" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 20.6667V6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.6673 10.6667L16.0007 6L11.334 10.6667" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    link: (props: IconProps) => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M3.20508 8.5197L7.98722 3.91216C12.5111 -0.452562 19.8585 6.28119 15.1506 10.8235L9.22376 16.5417C6.15396 19.5035 1.16822 14.9342 4.36289 11.8519L10.2045 6.21593C11.8201 4.6571 14.4442 7.06201 12.7628 8.68425L7.91048 13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    ),
    departmentEx: (props: IconProps) => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12L12 20M12 12L19.9999 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.1109 5.44033C13.8451 4.81459 14.2123 4.50173 14.5961 4.31826C15.4839 3.89391 16.5161 3.89391 17.4039 4.31826C17.7877 4.50173 18.1549 4.81459 18.8891 5.44033C19.645 6.08451 20.4132 6.40962 21.4239 6.49027C22.3856 6.56701 22.8664 6.60538 23.2676 6.74707C24.1954 7.0748 24.9252 7.80461 25.2529 8.73245C25.3946 9.1336 25.433 9.61443 25.5097 10.5761C25.5904 11.5868 25.9155 12.355 26.5597 13.1109C27.1854 13.8451 27.4983 14.2123 27.6817 14.5961C28.1061 15.4839 28.1061 16.5161 27.6817 17.4039C27.4983 17.7877 27.1854 18.1549 26.5597 18.8891C25.902 19.6608 25.5887 20.4339 25.5097 21.4239C25.433 22.3856 25.3946 22.8664 25.2529 23.2676C24.9252 24.1954 24.1954 24.9252 23.2676 25.2529C22.8664 25.3946 22.3856 25.433 21.4239 25.5097C20.4132 25.5904 19.645 25.9155 18.8891 26.5597C18.1549 27.1854 17.7877 27.4983 17.4039 27.6817C16.5161 28.1061 15.4839 28.1061 14.5961 27.6817C14.2123 27.4983 13.8451 27.1854 13.1109 26.5597C12.3392 25.902 11.5661 25.5887 10.5761 25.5097C9.61443 25.433 9.1336 25.3946 8.73245 25.2529C7.80461 24.9252 7.0748 24.1954 6.74707 23.2676C6.60538 22.8664 6.56701 22.3856 6.49027 21.4239C6.40962 20.4132 6.08451 19.645 5.44033 18.8891C4.81459 18.1549 4.50173 17.7877 4.31826 17.4039C3.89391 16.5161 3.89391 15.4839 4.31826 14.5961C4.50173 14.2123 4.81459 13.8451 5.44033 13.1109C6.09797 12.3392 6.41127 11.5661 6.49027 10.5761C6.56701 9.61443 6.60538 9.1336 6.74707 8.73245C7.0748 7.80461 7.80461 7.0748 8.73245 6.74707C9.1336 6.60538 9.61443 6.56701 10.5761 6.49027C11.5868 6.40962 12.355 6.08451 13.1109 5.44033Z" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}