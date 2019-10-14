import React, { FC } from 'react'

import { Filters } from 'types'

type Props = {
  filters: Filters
}

const prettifyString = (stringToPrettify: string) => `"${stringToPrettify}"`

const formatArrayOfStringsToHumanReadableString = (array: string[]) => {
  if (!array.length) return 'All'

  return [
    array
      .slice(0, -1)
      .map(prettifyString)
      .join(', '),
    prettifyString(array[array.length - 1])
  ]
    .filter(Boolean)
    .join(' and ')
}

const formatFilterNameAndValues = (name: string, values: string[]) =>
  values.length ? `${name} ${formatArrayOfStringsToHumanReadableString(values)}` : `All ${name}`

const FiltersInfo: FC<Props> = ({ filters }) => {
  return (
    <h3>
      {formatFilterNameAndValues('Datasource', filters.dataSources)}
      {'; '}
      {formatFilterNameAndValues('Campaigns', filters.campaigns)}
    </h3>
  )
}

export default FiltersInfo
