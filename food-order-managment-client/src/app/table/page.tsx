import React from 'react'
import TableHeader from './TableHeader'
import tableInterface from './TableInteface'
import TableRow from './TableRow'

const Page = () => {
    const tableHeader:tableInterface[] = [
        {
           width : '25%',
           text :"hello",
           style: "" ,
        }, {
            width : '25%',
            text :"hello",
            style : "" 
         },
         {
            width : '25%',
            text :"hello" ,
            style:""
         },
         {
            width : '25%',
            text :"hello", 
            style : ""
         }, {
            width : '25%',
            text :"hello", 
            style : ""
         },
    ]

    const tableRow = [
        {
            style:"",
            cellData:[
                {
                    isButton:true,
                     text:"hi"
                }
            ]
        },
        {
            style:"",
            cellData:[
                {
                    isButton:true,
                    style:'bg-red-500',
                    text:"hi"
                },
                {
                    isButton:false,
                     text:"hdfjhfii"
                },
                {
                    isButton:false,
                    text:"hi"
                }
            ]
        },
        {
            style:"",
            cellData:[
                {
                    isButton:true,
                    style:'bg-green-100 text-green-600',
                    text:"hi"
                }
            ]
        },
        {
            style:"",
            cellData:[
                {
                    isButton:true,
                    text:"hello"
                }
            ]
        },
    ]
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
  <table className="w-full border-collapse">
    <TableHeader header={tableHeader}/>
    <tbody>
      {tableRow.map((row:any,index:any):any=>{
        return(
        <TableRow key={index} cellData={row.cellData} styles={row.style}/>
        )
      })}
    </tbody>
  </table>
</div>

  )
}

export default Page