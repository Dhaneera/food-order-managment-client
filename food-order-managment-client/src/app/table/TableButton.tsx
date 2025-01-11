import React from 'react'

const TableButton = (props:any) => {
  return (
    <td className="py-3 px-4">
          <span className={`${props.styles} text-xs font-medium py-1 px-2 rounded-lg ${props.color=='yellow'?'bg-[#f6e6e6] text-green-200':props.color=='green'?'bg-[#e6f6e9] text-yellow-400':props.color=='red'?'bg-[#f8c6c6] text-red-500':''}`}>{props.text}</span>
    </td>
  )
}

export default TableButton