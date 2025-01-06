import React from 'react'

const TableButton = (props:any) => {
  return (
    <td className="py-3 px-4">
          <span className={`${props.styles} text-xs font-medium py-1 px-2 rounded-lg`}>{props.text}</span>
    </td>
  )
}

export default TableButton