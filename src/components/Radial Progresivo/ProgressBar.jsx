import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = ({value = "0", text="0"}) => {
  return (
      <CircularProgressbar value={value} text={`${text}%`} />
  )
}

export default ProgressBar
