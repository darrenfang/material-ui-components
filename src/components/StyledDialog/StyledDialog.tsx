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
import { Dialog, DialogTitle, PropTypes, Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: (props: { color?: PropTypes.Color }) => {

      let color = '#000'

      switch (props.color) {
        case 'primary':
          color = theme.palette.primary.main
          break
        case 'secondary':
          color = theme.palette.secondary.main
          break
        default:
          break
      }

      return (
        {
          backgroundColor: color,
          color: '#FFF'
        }
      )
    }
  })
)

interface Props {
  color?: PropTypes.Color
  open: boolean
  title: string
}

export const StyledDialog: React.FunctionComponent<Props>
  = ({
       color,
       open,
       title,
       children
     }) => {

  const classes = useStyles({ color })

  return (
    <Dialog
      open={open}
      scroll="paper"
    >
      <DialogTitle className={classes.title}>
        {title}
      </DialogTitle>
      {
        children &&
        <React.Fragment>
          {children}
        </React.Fragment>
      }
    </Dialog>
  )
}
