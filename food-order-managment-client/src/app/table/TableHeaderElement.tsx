import React from 'react'

const TableHeaderElement = ({width,style,text}:any) => {
  return (
    <th className={`py-3 px-4 w-[${width}] ${style}`}>{text}</th>
  )
}

export default TableHeaderElement