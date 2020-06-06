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

import { toPairs } from 'lodash'
import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { MenuItem, PropTypes, TextField } from '@material-ui/core'
import { ISelectData } from './ISelectData'
import { ISelectItem } from './ISelectItem'

interface Props {
  disabled?: boolean
  className?: string
  loading: boolean
  label: string
  placeholder?: string
  helperText?: string
  data: ISelectData
  displayEmpty?: boolean
  name: string
  value?: string
  margin?: PropTypes.Margin
  onChange: (value: string) => void
}

export const Select: React.FunctionComponent<Props> =
  ({
     disabled,
     className,
     loading,
     label,
     placeholder,
     helperText,
     data,
     displayEmpty,
     name,
     value,
     margin,
     onChange
   }) => {

    const [input, setInput] = useState('')
    const [selects, setSelects] = useState([] as ISelectItem[])
    const cannotSelect = loading || selects.length === 0 || disabled
    const noItems = !loading && selects.length === 0

    useEffect(() => {
      if (loading) {
        return
      }

      const _data = toPairs(data).map(array => {
        return {
          value: array[0],
          text: array[1]
        }
      })
      if (_data && _data.length > 0) {
        if (displayEmpty) {
          _data.unshift({
            text: '不限',
            value: ''
          })
        }
        setSelects(_data)
      }
    }, [loading, data])

    useEffect(() => {
      if (loading) {
        return
      }

      if (selects && selects.length > 0) {
        setInput(value || '')
      }
    }, [loading, selects, value])

    const changeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setInput(e.target.value)
      onChange(e.target.value)
    }

    return (
      <TextField
        className={className}
        select
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        name={name}
        value={input}
        fullWidth
        onChange={changeHandler}
        SelectProps={{
          displayEmpty
        }}
        margin={margin}
        InputLabelProps={{
          shrink: true
        }}
        disabled={cannotSelect}
      >
        {
          loading &&
          <MenuItem value=''>
            数据加载中，请稍后...
          </MenuItem>
        }
        {
          noItems &&
          <MenuItem value=''>
            没有可选项
          </MenuItem>
        }
        {
          selects.map(
            ({ text, value }) => (
              <MenuItem value={value} key={value}>
                {text}
              </MenuItem>
            )
          )
        }
      </TextField>
    )
  }
