import React from 'react'
import TableCell from './TableCell'
import TableButton from './TableButton'

const TableRow = ({cellData,...props}:any) => {
  return (
    <tr className={`text-sm text-gray-700 border-b hover:bg-gray-50 ${props.styles}`}>
        {cellData.map((key:any,index:any)=>{
            if(key.isButton){
                return(
                    <TableButton key={index} text={key.text} styles={key.style}/>
                )
            }else{
            return(
                <TableCell styles={key.style} key={index} text={key.text}/>
            )
            }
        })}
        
    </tr>
  )
}

export default TableRow