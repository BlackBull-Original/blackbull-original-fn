const BookingSvgIcon = (props:any) => {
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
          <g clip-path="url(#clip0_24_7979)">
            <path
              d="M8.57146 20.9829L0.857178 23.1429L3.01718 15.4286L17.1429 1.3715C17.3025 1.20822 17.4933 1.07848 17.7036 0.989912C17.9141 0.901339 18.1403 0.855713 18.3686 0.855713C18.5969 0.855713 18.8231 0.901339 19.0336 0.989912C19.2439 1.07848 19.4347 1.20822 19.5943 1.3715L22.6286 4.42293C22.7892 4.58229 22.9168 4.7719 23.0039 4.98079C23.0909 5.18969 23.1357 5.41377 23.1357 5.64007C23.1357 5.86637 23.0909 6.09045 23.0039 6.29935C22.9168 6.50825 22.7892 6.69785 22.6286 6.85721L8.57146 20.9829Z"
              stroke={props.color}
              stroke-width="1.71429"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_24_7979">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </>
  );
};
export default BookingSvgIcon;
