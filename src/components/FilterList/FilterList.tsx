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
import * as classNames from 'classnames'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Chip, Paper, Theme } from '@material-ui/core'
import { IFilterData } from './IFilterData'
import { IFilterRequest } from './IFilterRequest'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      padding: theme.spacing(2)
    },
    chip: {
      margin: theme.spacing(1),
      padding: theme.spacing(2)
    }
  })
)

interface Props {
  className?: string
  loading: boolean
  clips: IFilterData[]
  onQuery: (request: IFilterRequest) => void
}

export const FilterList: React.FunctionComponent<Props>
  = ({
       className,
       loading,
       clips,
       onQuery
     }) => {

  const classes = useStyles()
  const clipsData: IFilterData[] = clips.filter(item => !!item.value)
  const show = clipsData && clipsData.length > 0

  const handleDelete = (name: string) => {
    let newRequest = {} as IFilterRequest
    clips.forEach(item => {
      if (name !== item.name) {
        newRequest[item.name] = item.value
      }
    })
    onQuery(newRequest)
  }

  return (
    <React.Fragment>
      {
        show &&
        <Paper className={classNames(classes.root, className)}>
          {
            clipsData.map(item => {
              return (
                <Chip
                  color="primary"
                  variant="outlined"
                  disabled={loading}
                  icon={item.icon}
                  key={item.name}
                  label={`${item.label}：${item.text || item.value}`}
                  onDelete={() => handleDelete(item.name)}
                  className={classes.chip}
                />
              )
            })
          }
        </Paper>
      }
    </React.Fragment>
  )
}
