export default function TimerControls(props) {
  const { isRunning, handleStart, handlePause, handleReset } = props;

  return (
    <div className="flex gap-6">
      {!isRunning ? (
        <div
          className="cursor-pointer bg-[#D9D9D9] w-24 h-24 rounded-full flex justify-center items-center"
          onClick={handleStart}
        >
          <div className="flex justify-center items-center gap-2">
            <svg
              width="30"
              height="46"
              viewBox="0 0 39 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.41406 4.1893C5.91094 3.21176 4.02187 3.17953 2.48828 4.09262C0.954687 5.00571 0 6.72446 0 8.5936V46.4061C0 48.2752 0.954687 49.994 2.48828 50.9071C4.02187 51.8202 5.91094 51.7772 7.41406 50.8104L36.6641 31.9041C38.1164 30.9696 39 29.3045 39 27.4998C39 25.6952 38.1164 24.0409 36.6641 23.0956L7.41406 4.1893Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div
          className="cursor-pointer bg-[#D9D9D9] w-24 h-24 rounded-full flex justify-center items-center"
          onClick={handlePause}
        >
          <div className="flex justify-center items-center gap-2">
            <svg
              width="30"
              height="42"
              viewBox="0 0 40 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6.5C2.6875 6.5 0 8.68359 0 11.375V40.625C0 43.3164 2.6875 45.5 6 45.5H10C13.3125 45.5 16 43.3164 16 40.625V11.375C16 8.68359 13.3125 6.5 10 6.5H6ZM30 6.5C26.6875 6.5 24 8.68359 24 11.375V40.625C24 43.3164 26.6875 45.5 30 45.5H34C37.3125 45.5 40 43.3164 40 40.625V11.375C40 8.68359 37.3125 6.5 34 6.5H30Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      )}
      <div
        className="cursor-pointer bg-[#D9D9D9] w-24 h-24 rounded-full flex justify-center items-center"
        onClick={handleReset}
      >
        <div className="flex justify-center items-center">
          <svg
            width="30"
            height="32"
            viewBox="0 0 40 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 7C0 3.13906 2.98958 0 6.66667 0H33.3333C37.0104 0 40 3.13906 40 7V35C40 38.8609 37.0104 42 33.3333 42H6.66667C2.98958 42 0 38.8609 0 35V7Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
