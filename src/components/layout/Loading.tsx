import styles from './Loading.module.scss'

// import GridLoader from 'react-spinners/GridLoader'

export default function Loading() {
  return (
    <div className="fixed z-50 inset-0 bg-[#00000066] flex items-center justify-center duration-300">
      <svg
        className={styles.pl}
        viewBox="0 0 200 200"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="pl-grad1"
            x1="1"
            y1="0.5"
            x2="0"
            y2="0.5"
          >
            <stop
              offset="0%"
              stopColor="#22c55e"
            />
            <stop
              offset="100%"
              stopColor="#3b82f6"
            />
          </linearGradient>
          <linearGradient
            id="pl-grad2"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#22c55e"
            />
            <stop
              offset="100%"
              stopColor="#3b82f6"
            />
          </linearGradient>
        </defs>
        <circle
          className={styles.pl__ring}
          cx="100"
          cy="100"
          r="82"
          fill="none"
          stroke="url(#pl-grad1)"
          strokeWidth="36"
          strokeDasharray="0 257 1 257"
          strokeDashoffset="0.01"
          strokeLinecap="round"
          transform="rotate(-90,100,100)"
        />
        <line
          className={styles.pl__ball}
          stroke="url(#pl-grad2)"
          x1="100"
          y1="18"
          x2="100.01"
          y2="182"
          strokeWidth="36"
          strokeDasharray="1 165"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
