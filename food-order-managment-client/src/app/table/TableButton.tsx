import React from 'react'

const TableButton = (props:any) => {
    console.log(props)
  return (
    <td className="py-3 px-4">
          <button onClick={(e)=>clickEvent(e)} className={`${props.styles} text-xs font-medium py-1 px-2 rounded-lg ${props.color=='yellow'?'bg-[#FAE6D7] text-[#FF9A00]':props.color=='green'?'bg-[#E6F6E9] text-[#2CC56F]':props.color=='red'?'bg-[#f8c6c6] text-red-500':''}`}>{props.text}</button>
    </td>
  )

  function clickEvent(e:any) {
     props.onClick();
  }
}

export default TableButton