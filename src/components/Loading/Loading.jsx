import React from 'react'
import style from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={`${style.cont}`}>
      <p className={`${style.p1}`}>Loading.</p>
      <p className={`${style.p2}`}>Loading..</p>
      <p className={`${style.p3}`}>Loading...</p>
      <div className={`${style.loader}`}>
        
      </div>
    </div>
  )
}

export default Loading