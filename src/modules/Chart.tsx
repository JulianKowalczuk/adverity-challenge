import { format, parse } from 'date-fns'
import React, { FC, useMemo } from 'react'
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer,
  YAxisProps
} from 'recharts'

import { Filters, CsvDataColumn } from 'types'

type Props = {
  data: CsvDataColumn[]
  filters: Filters
}

const xAxisTickFormatter = (tick: string) =>
  format(parse(tick, 'dd.MM.yyyy', new Date()), 'dd. MMM.')

const clicksYAxisProps: Partial<YAxisProps> = {
  ticks: [0, 200, 400, 600, 800, 1000],
  label: { value: 'Clicks', angle: -90, position: 'insideLeft' }
}

const impressionsYAxisProps: Partial<YAxisProps> = {
  ticks: [0, 60000, 120000, 180000, 240000, 300000],
  tickFormatter: (tick: number) => {
    const oneOfThousendOfTtick = tick / 1000

    return oneOfThousendOfTtick ? `${oneOfThousendOfTtick}k` : tick
  },
  label: { value: 'Impressions', angle: 90, position: 'insideRight' },
  orientation: 'right'
}

const Chart: FC<Props> = ({ data, filters }) => {
  const filteredData = useMemo(() => {
    const isCampaignInFilters = filters.campaigns.length
      ? (campaign: string) => filters.campaigns.includes(campaign)
      : () => true

    const isDataSourceInFilters = filters.dataSources.length
      ? (dataSource: string) => filters.dataSources.includes(dataSource)
      : () => true

    return data.filter(
      ({ Campaign, Datasource }) =>
        isCampaignInFilters(Campaign) && isDataSourceInFilters(Datasource)
    )
  }, [data, filters])

  return (
    <ResponsiveContainer height={500}>
      <LineChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="Date" tickFormatter={xAxisTickFormatter} />
        <YAxis yAxisId="clicks" {...clicksYAxisProps} />
        <YAxis yAxisId="impressions" {...impressionsYAxisProps} />

        <Legend />

        <Line yAxisId="clicks" dataKey="Clicks" stroke="#8884d8" dot={false} />
        <Line yAxisId="impressions" dataKey="Impressions" stroke="#82ca9d" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
