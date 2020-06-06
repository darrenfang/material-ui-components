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
import { KeyboardEvent, useEffect, useState } from 'react'
import { Box, Divider, IconButton, InputBase, Paper, Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    },
    button: {
      margin: theme.spacing(1)
    }
  })
)

interface Props {
  className?: string
  loading: boolean
  placeholder?: string
  value: string
  onQuery: (value: string) => void
}

export const SearchBox: React.FunctionComponent<Props>
  = ({
       className,
       loading,
       placeholder,
       value,
       onQuery
     }) => {

  const classes = useStyles()

  const [input, setInput] = useState('')

  const showClearButton = !loading && input

  useEffect(() => {
    setInput(value)
  }, [value])

  const queryHandler = () => {
    onQuery(input)
  }

  const resetHandler = () => {
    setInput('')
    onQuery('')
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      queryHandler()
    }
  }

  return (
    <Box className={className}>
      <Paper className={classes.container}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <TextFieldsIcon/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={placeholder}
          inputProps={{ 'aria-label': placeholder }}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDownHandler}
          value={input}
        />
        {
          showClearButton &&
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={resetHandler}
            disabled={loading}
          >
            <ClearIcon/>
          </IconButton>
        }
        <Divider className={classes.divider} orientation="vertical"/>
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={queryHandler}
          disabled={loading}
        >
          <SearchIcon/>
        </IconButton>
      </Paper>
    </Box>
  )
}
