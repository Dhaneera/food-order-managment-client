import React from 'react'

const TableCell = ({text,...props}:any) => {
  return (
    <td className={`py-3 px-4 ${props.styles}`}>{text}</td>
  )
}

export default TableCell