import axios from 'axios'
import csvtojson from 'csvtojson'
import React, { FC, useEffect, useState, ReactNode, useCallback } from 'react'

import { CsvDataColumn } from 'types'

type Props = {
  url: string
  children: (state: State) => ReactNode
}

type State = {
  error?: string
  data: CsvDataColumn[]
}

const initialState: State = { data: [] }

const JsonFromCsvProvider: FC<Props> = ({ children, url }) => {
  const [state, setState] = useState<State>(initialState)

  const setStateError = useCallback((error: string) => setState({ ...initialState, error }), [
    setState
  ])

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) return setStateError('Response status is not 200')

        csvtojson()
          .fromString(response.data)
          .then(data => setState({ data }), () => setStateError('Parsing CSV failed'))
      })
      .catch(() => setStateError('Making request failed'))
  }, [url, setStateError])

  return <>{children(state)}</>
}

export default JsonFromCsvProvider
