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
import { sortedUniq, uniq } from 'lodash'
import { IPagination } from './IPagination'
import {
  Button,
  Grid,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import { createStyles } from '@material-ui/styles'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

interface Props {
  rowsPerPageOptions?: number[]
  onPaginate: (page: number, size: number) => void
  pagination: IPagination
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      textAlign: 'center'
    },
    selectRoot: {
      marginLeft: theme.spacing(1)
    },
    select: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(3),
      textAlign: 'right',
      textAlignLast: 'right' // Align <select> on Chrome.
    }
  })
)

export const DataTablePagination: React.FunctionComponent<Props>
  = ({
       rowsPerPageOptions,
       onPaginate,
       pagination: { total_elements, number, size }
     }) => {

  const classes = useStyles()

  const options = rowsPerPageOptions ? sortedUniq(uniq(rowsPerPageOptions.concat(size))) : [size]

  const handleChangePage = (_: unknown, newPage: number) => {
    onPaginate(newPage, size)
    if (window) {
      window.scrollTo(0, 0)
    }
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const newSize = event.target.value as number
    onPaginate(0, newSize)
    if (window && window.scrollTo) {
      window.scrollTo(0, 0)
    }
  }

  const from = total_elements === 0 ? 0 : number * size + 1
  const to = total_elements !== -1 ? Math.min(total_elements, (number + 1) * size) : (number + 1) * size

  return (
    <React.Fragment>
      <Toolbar>
        <Grid
          container
          className={classes.footer}
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
        >
          {
            options.length > 1 && (
              <Grid
                item
              >
                <Typography
                  color="inherit"
                  variant="body2"
                  display="inline"
                >
                  每页条数
                </Typography>

                <Select
                  classes={{
                    select: classes.select
                  }}
                  input={<InputBase className={classes.selectRoot}/>}
                  value={size}
                  onChange={handleChangeRowsPerPage}
                >
                  {
                    options.map((rowsPerPageOption) => (
                      <MenuItem
                        key={rowsPerPageOption ? rowsPerPageOption : rowsPerPageOption}
                        value={rowsPerPageOption ? rowsPerPageOption : rowsPerPageOption}
                      >
                        {rowsPerPageOption}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
            )
          }

          <Grid
            item
          >
            <Typography color="inherit" variant="body2">
              当前展示 {from} ~ {to}（总数 {total_elements}）
            </Typography>
          </Grid>

          <Grid
            item
          >
            <Button
              variant="text"
              startIcon={<KeyboardArrowLeft/>}
              onClick={(event) => handleChangePage(event, number - 1)}
              disabled={number === 0}
            >
              上一页
            </Button>
            <Button
              variant="text"
              endIcon={<KeyboardArrowRight/>}
              onClick={(event) => handleChangePage(event, number + 1)}
              disabled={total_elements !== -1 ? number >= Math.ceil(total_elements / size) - 1 : false}
            >
              下一页
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </React.Fragment>
  )
}
