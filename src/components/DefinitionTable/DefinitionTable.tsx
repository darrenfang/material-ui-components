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
import { ReactElement } from 'react'
import {
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Skeleton } from '@material-ui/lab'
import { StyledTableHeadCell } from '../DataTable/StyledTableHeadCell'
import { StyledTableCell } from '../DataTable/StyledTableCell'
import { IDefinitionTableItem } from './IDefinitionTableItem'

const DEFAULT_SKELETON_HEIGHT = 400

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      width: 150,
      fontWeight: 700
    },
    empty: {
      padding: theme.spacing(3),
      color: theme.palette.secondary.main,
      fontWeight: 'bold'
    }
  })
)

interface Props {
  className?: string
  loading: boolean
  notExistsText?: string
  title: string
  actions?: ReactElement
  footer?: ReactElement
  skeletonHeight?: number
  data: IDefinitionTableItem[]
}

export const DefinitionTable: React.FunctionComponent<Props>
  = ({
       className,
       loading,
       notExistsText,
       title,
       actions,
       footer,
       skeletonHeight,
       data
     }) => {

  const classes = useStyles()

  const exists = data && data.length > 0

  return (
    <Paper className={className}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>{title}</StyledTableHeadCell>
            <StyledTableHeadCell align="right">
              {
                loading ? '' : actions
              }
            </StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            loading &&
            <TableRow>
              <TableCell colSpan={2} padding="none">
                <Skeleton
                  variant="rect"
                  height={skeletonHeight || DEFAULT_SKELETON_HEIGHT}
                  animation="wave"
                />
              </TableCell>
            </TableRow>
          }
          {
            !loading && exists && data.map(item => (
              <TableRow key={item.key}>
                <TableCell component="th" scope="row" className={classes.header}>
                  {item.key}
                </TableCell>
                <TableCell align="left">
                  {item.value}
                </TableCell>
              </TableRow>
            ))
          }
          {
            !loading && !exists &&
            <TableRow hover>
              <StyledTableCell
                align="center"
                colSpan={2}
                className={classes.empty}
              >
                {notExistsText || '数据不存在'}
              </StyledTableCell>
            </TableRow>
          }

          {
            !loading && footer &&
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                colSpan={2}
              >
                {footer}
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </Paper>
  )
}
