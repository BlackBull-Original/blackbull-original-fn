const ClipboardSvgIcon = (props:any) => {
  return (
    <>
      <div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5715 0.857178H9.42864C8.48188 0.857178 7.71436 1.62469 7.71436 2.57146V3.42861C7.71436 4.37537 8.48188 5.14289 9.42864 5.14289H14.5715C15.5183 5.14289 16.2858 4.37537 16.2858 3.42861V2.57146C16.2858 1.62469 15.5183 0.857178 14.5715 0.857178Z"
            stroke={props.color}
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.7143 2.57141H19.2857C19.7403 2.57141 20.1765 2.75203 20.4979 3.07351C20.8193 3.39501 21 3.83103 21 4.2857V21.4286C21 21.8832 20.8193 22.3193 20.4979 22.6407C20.1765 22.9622 19.7403 23.1428 19.2857 23.1428H4.71429C4.25962 23.1428 3.82359 22.9622 3.5021 22.6407C3.18062 22.3193 3 21.8832 3 21.4286V4.2857C3 3.83103 3.18062 3.39501 3.5021 3.07351C3.82359 2.75203 4.25962 2.57141 4.71429 2.57141H7.28571"
            stroke={props.color}
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.57153 15.4286L11.143 17.1429L16.2858 10.2858"
            stroke={props.color}
            stroke-width="1.71429"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </>
  );
};
export default ClipboardSvgIcon;
