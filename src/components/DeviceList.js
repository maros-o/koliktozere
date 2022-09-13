import React, { useReducer } from "react";
import DeviceItem from './DeviceItem'

export default function DeviceList() {
  return (
    <div>
      <div className='text-2xl text-center m-2 underline border rounded'>Spotřebiče</div>
      <div>
        <DeviceItem />
      </div>
    </div>
  )
}
