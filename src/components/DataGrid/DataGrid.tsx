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
import {
  Card,
  CircularProgress,
  createStyles,
  Grid,
  GridSize,
  Theme,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { IDataGridData } from './IDataGridData'
import { Variant } from '@material-ui/core/styles/createTypography'

const DEFAULT_VALUE_VARIANT: Variant = 'h4'
const DEFAULT_CIRCULAR_SIZE = 36

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      padding: theme.spacing(3),
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        '&:not(:last-of-type)': {
          borderRight: `1px solid ${theme.palette.divider}`
        }
      },
      [theme.breakpoints.down('sm')]: {
        '&:not(:last-of-type)': {
          borderBottom: `1px solid ${theme.palette.divider}`
        }
      }
    },
    clickableItem: {
      cursor: 'pointer'
    },
    label: {
      marginTop: theme.spacing(3),
      color: theme.palette.text.hint
    },
    prefix: {
      marginRight: theme.spacing(1)
    },
    suffix: {
      marginLeft: theme.spacing(1)
    }
  })
)

interface Props {
  className?: string
  loading: boolean
  valueVariant?: Variant
  xs?: GridSize
  sm?: GridSize
  md?: GridSize
  lg?: GridSize
  xl?: GridSize
  circularSize?: number
  data: IDataGridData[]
  onClick?: (index: number) => void
}

export const DataGrid: React.FunctionComponent<Props>
  = ({
       className,
       loading,
       valueVariant,
       xs,
       sm,
       md,
       lg,
       xl,
       circularSize,
       data,
       onClick
     }) => {

  const classes = useStyles()

  const clickHandler = (index: number) => {
    if (onClick) {
      onClick(index)
    }
  }

  return (
    <Card className={className}>
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
      >
        {
          data.map((item, index) => {
            return (
              <Grid
                key={item.label}
                className={`${classes.item} ${onClick ? classes.clickableItem : ''}`}
                item
                container
                xs={xs}
                md={md}
                sm={sm}
                lg={lg}
                xl={xl}
                onClick={() => clickHandler(index)}
              >
                {
                  item.prefix &&
                  <Grid item xs={12}>
                    <Typography variant='body2' display='inline' className={classes.prefix}>
                      {item.prefix}
                    </Typography>
                  </Grid>
                }

                {
                  loading &&
                  <Grid item xs={12}>
                    <CircularProgress size={circularSize || DEFAULT_CIRCULAR_SIZE}/>
                  </Grid>
                }

                {
                  !loading &&
                  <Grid item xs={12}>
                    <Typography
                      variant={valueVariant || DEFAULT_VALUE_VARIANT}
                      display="inline"
                    >
                      {item.value}
                    </Typography>
                  </Grid>
                }

                {
                  item.suffix &&
                  <Grid item xs={12}>
                    <Typography variant='body2' display='inline' className={classes.suffix}>
                      {item.suffix}
                    </Typography>
                  </Grid>
                }

                <Grid item xs={12}>
                  <Typography
                    className={classes.label}
                    variant="overline"
                  >
                    {item.label}
                  </Typography>
                </Grid>
              </Grid>
            )
          })
        }
      </Grid>
    </Card>
  )
}
