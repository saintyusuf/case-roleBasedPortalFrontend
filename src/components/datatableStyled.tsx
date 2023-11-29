import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import DataTable from 'react-data-table-component'

interface Props {
  columns: any[]
  data: any[]
  pagination?: boolean
}

const DatatableStyled:FC<Props> = (props) => {
  return (
    <Box sx={{
      "& > div": {
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px"
      },
      "& nav": {
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        overflow: "hidden",
      },
      "& #pagination-first-page, & #pagination-last-page, & #pagination-previous-page, & #pagination-next-page": {
        fill: "var(--textColor1)!important",
        "&:disabled": {
          opacity: "0.2!important"
        }
      },
      "& .rdt_Table": {
        bg: "var(--bgColor2)",
        "& > div": {
          bg: "var(--bgColor2)",
          color: "var(--textColor1)",
        }
      },
      "& .rdt_TableHeadRow, & .rdt_TableRow, & .rdt_Pagination": {
        bg: "var(--bgColor2)",
        color: "var(--textColor1)",
        fontSize: "12px"
      }
    }}>
      <DataTable data={props.data} columns={props.columns} pagination={props.pagination}/>
    </Box>
  )
}

export default DatatableStyled