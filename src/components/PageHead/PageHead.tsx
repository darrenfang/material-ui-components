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
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import GrainIcon from '@material-ui/icons/Grain'
import { Divider } from '@material-ui/core'

interface Props {
  title: string,
  description?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 2)
    },
    title: {
      display: 'flex',
      color: '#546E7A'
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20
    },
    description: {
      marginTop: 10
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
)

export const PageHead: React.FunctionComponent<Props>
  = ({
       title,
       description
     }) => {

  const classes = useStyles()

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary" className={classes.title}>
          <GrainIcon className={classes.icon}/>
          {title}
        </Typography>
      </Breadcrumbs>
      {
        description &&
        <Typography variant="h4" className={classes.description}>{description}</Typography>
      }

      <Divider className={classes.divider}/>
    </div>
  )
}
