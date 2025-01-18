import React from 'react'

const TableCellWithIcon = ({icon,click,...props}:any) => {
  return (
      <td className={`py-3 px-4 ${props.styles}`} onClick={click} >{icon}</td>
  )
}

export default TableCellWithIcon
