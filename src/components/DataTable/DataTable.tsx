/*
 * MIT License
 *
 * Copyright (c) 2018 Darren Fang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import * as React from 'react'
import { Box, makeStyles, Paper, TableContainer, Theme } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import { createStyles } from '@material-ui/styles'
import { IDataTableColumn } from './IDataTableColumn'
import { IData } from './IData'
import { DataTableHead } from './DataTableHead'
import { DataTableBody } from './DataTableBody'
import { DataTablePagination } from './DataTablePagination'
import { IPagination } from './IPagination'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    }
  })
)

interface Props {
  className?: string
  columns: IDataTableColumn[]
  loading: boolean
  skeletonHeight?: number
  data: IData[]
  rowsPerPageOptions?: number[]
  onPaginate?: (page: number, size: number) => void
  pagination?: IPagination
  hidePagination?: boolean
}

export const DataTable: React.FunctionComponent<Props>
  = ({
       className,
       columns,
       loading,
       skeletonHeight,
       rowsPerPageOptions,
       data,
       onPaginate,
       pagination,
       hidePagination
     }) => {

  const classes = useStyles()

  const hasData = data && data.length > 0

  return (
    <Paper>
      <TableContainer component={Box} className={className}>
        <Table stickyHeader aria-label="sticky table" className={classes.root}>
          <DataTableHead columns={columns}/>
          <DataTableBody
            loading={loading}
            columns={columns}
            skeletonHeight={skeletonHeight}
            data={data}
          />
        </Table>
      </TableContainer>
      {
        !hidePagination && onPaginate && pagination && hasData &&
        <DataTablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          onPaginate={onPaginate}
          pagination={pagination}
        />
      }
    </Paper>
  )
}
