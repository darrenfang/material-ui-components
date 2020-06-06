/*
 *
 *  * MIT License
 *  *
 *  * Copyright (c) 2020 Darren Fang
 *  *
 *  * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  * of this software and associated documentation files (the "Software"), to deal
 *  * in the Software without restriction, including without limitation the rights
 *  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  * copies of the Software, and to permit persons to whom the Software is
 *  * furnished to do so, subject to the following conditions:
 *  *
 *  * The above copyright notice and this permission notice shall be included in all
 *  * copies or substantial portions of the Software.
 *  *
 *  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  * SOFTWARE.
 *  *
 *
 *
 */

import * as React from 'react'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles, TableCell, Theme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { StyledTableCell } from './StyledTableCell'
import { DataTableRow } from './DataTableRow'
import TableBody from '@material-ui/core/TableBody'
import { IData } from './IData'
import { IDataTableColumn } from './IDataTableColumn'
import { createStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    empty: {
      padding: theme.spacing(3),
      color: theme.palette.secondary.main,
      fontWeight: 'bold'
    }
  })
)

interface Props {
  loading: boolean
  columns: IDataTableColumn[]
  skeletonHeight?: number
  data: IData[]
}

export const DataTableBody: React.FunctionComponent<Props>
  = ({
       loading,
       columns,
       skeletonHeight,
       data
     }) => {

  const classes = useStyles()

  const noItems = !loading && data.length === 0
  const hasItems = !loading && data.length > 0
  const columnsSize = columns.length
  const height = skeletonHeight || 300

  return (
    <TableBody>
      {
        loading &&
        <TableRow>
          <TableCell colSpan={columnsSize} padding="none">
            <Skeleton variant="rect" height={height} animation="wave"/>
          </TableCell>
        </TableRow>
      }
      {
        noItems &&
        <TableRow hover>
          <StyledTableCell
            className={classes.empty}
            align="center"
            colSpan={columnsSize}
          >
            暂无数据
          </StyledTableCell>
        </TableRow>
      }
      {
        hasItems && data.map(item => (
          <DataTableRow key={item._key} item={item} columns={columns}/>
        ))
      }
    </TableBody>
  )
}
