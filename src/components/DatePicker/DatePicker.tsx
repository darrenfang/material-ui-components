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
import { format, parse } from 'date-fns'
import * as cnLocale from 'date-fns/locale/zh-CN/index'
import * as DateFnsUtils from '@date-io/date-fns/build/index'
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { PropTypes } from '@material-ui/core'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  placeholder?: string
  minDateMessage?: string
  maxDateMessage?: string
  disablePast?: boolean
  disableFuture?: boolean
  margin?: PropTypes.Margin
}

export const DatePicker: React.FunctionComponent<Props>
  = ({
       label,
       value,
       onChange,
       disabled,
       className,
       placeholder,
       minDateMessage,
       maxDateMessage,
       disablePast,
       disableFuture,
       margin
     }) => {

  const getDate = (_value: string): Date | null => {
    if (!_value) {
      return null
    }

    const _date = parse(_value, 'yyyy-MM-dd', new Date(0))
    return _date.getTime() === 0 ? null : _date
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={cnLocale}>
      <KeyboardDatePicker
        className={className}
        disabled={disabled}
        label={label}
        format="yyyy-MM-dd"
        fullWidth
        placeholder={placeholder}
        value={getDate(value)}
        okLabel="确定"
        cancelLabel="取消"
        onChange={(date) => {
          if (date instanceof Date) {
            if (!isNaN(date.getTime())) {
              onChange(format(date, 'yyyy-MM-dd'))
            }
          }
        }}
        minDateMessage={minDateMessage}
        maxDateMessage={maxDateMessage}
        disablePast={disablePast}
        disableFuture={disableFuture}
        invalidDateMessage="时间格式不正确"
        InputLabelProps={{
          shrink: true
        }}
        margin={margin}
      />
    </MuiPickersUtilsProvider>
  )
}
