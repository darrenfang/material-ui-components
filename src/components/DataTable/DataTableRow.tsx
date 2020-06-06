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
import { IData } from './IData'
import TableRow from '@material-ui/core/TableRow'
import { IDataTableColumn } from './IDataTableColumn'
import { StyledTableCell } from './StyledTableCell'

interface Props {
  columns: IDataTableColumn[]
  item: IData
}

export const DataTableRow: React.FunctionComponent<Props>
  = ({
       columns,
       item
     }) => {

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      {
        columns.map((column) => {

          const value = item[column.id]

          return (
            <StyledTableCell align={column.align} key={`${column.id}_${item._key}`}>
              {value}
            </StyledTableCell>
          )
        })
      }
    </TableRow>
  )
}
