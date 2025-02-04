import React from 'react'
import TableCell from './TableCell'
import TableButton from './TableButton'
import TableCellWithIcon from './TableCellWithIcon'

const TableRow = ({ cellData, ...props }: any) => {
    return (
        <tr className={`text-sm text-gray-700   border-b-2 hover:bg-gray-50 max-h-1/2 ${props.styles}`} onDoubleClick={(e) => props.doubleClick(cellData[0].text)}>
            {cellData?.map((key: any, index: any) => {
                if (key.isButton == 'Complete') {
                    return (

                        <TableButton key={index} text={key.text} styles={key.style} color='green' />
                    )
                } else if (key.isButton == 'Rejected') {
                    return (
                        <TableButton key={index} text={key.text} styles={key.style} color='red' />
                    )
                } else if (key.isButton == 'Pending') {
                    return (
                        <TableButton key={index} text={key.text} styles={key.style} onClick={key.clickEvent} color='yellow' />
                    )
                } else if (key.isButton == 'icons') {
                    return (
                        <TableCellWithIcon icon={key.text} style={key.style} click={props.click} />
                    )
                } else {
                    return (
                        <TableCell styles={key.style} key={index} text={key.text} />
                    )
                }
            })}

        </tr>
    )
}


export default TableRow