import React from 'react'
import TableHeaderElement from './TableHeaderElement'
import tableInterface from './TableInteface'

const TableHeader = ({header}:any) => {
  return (
    <thead>
    <tr className="text-left text-sm text-gray-500 border-b">
        {header.map((head:tableInterface,index:number)=>{
            return(<TableHeaderElement key={index} width={head.width} text={head.text} style={head.style} />)
        })}
    </tr>
  </thead>
  )
}

export default TableHeader