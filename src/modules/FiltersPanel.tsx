import React, { FC, useMemo, useCallback, useState } from 'react'
import { Header, Dropdown, DropdownItemProps, Button, Grid } from 'semantic-ui-react'

import { Filters, CsvDataColumn } from 'types'
import { initialFiltersState } from 'values'

type Props = {
  data: CsvDataColumn[]
  onChange: (filters: Filters) => void
}

const FiltersPanel: FC<Props> = ({ data, onChange }) => {
  const [filters, setFilters] = useState<Filters>(initialFiltersState)

  const options = useMemo(() => {
    const campaignsSet = new Set<string>()
    const dataSourcesSet = new Set<string>()

    return data.reduce<{ campaigns: DropdownItemProps[]; dataSources: DropdownItemProps[] }>(
      (result, { Campaign, Datasource }) => {
        if (!campaignsSet.has(Campaign)) {
          campaignsSet.add(Campaign)
          result.campaigns.push({ key: Campaign, text: Campaign, value: Campaign })
        }

        if (!dataSourcesSet.has(Datasource)) {
          dataSourcesSet.add(Datasource)
          result.dataSources.push({ key: Datasource, text: Datasource, value: Datasource })
        }

        return result
      },
      { campaigns: [], dataSources: [] }
    )
  }, [data])

  const handleCampaignsChange = useCallback(
    (_, data) => setFilters(prevFilters => ({ ...prevFilters, campaigns: data.value })),
    [setFilters]
  )

  const handleDataSourcesChange = useCallback(
    (_, data) => setFilters(prevFilters => ({ ...prevFilters, dataSources: data.value })),
    [setFilters]
  )

  const handleApplyClick = useCallback(() => onChange(filters), [filters, onChange])

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h3">Filter dimension values</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <label>
            <b>Datasource</b>
          </label>
          <Dropdown
            placeholder="All"
            fluid
            multiple
            selection
            onChange={handleDataSourcesChange}
            options={options.dataSources}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <label>
            <b>Campaigns</b>
          </label>
          <Dropdown
            placeholder="All"
            fluid
            multiple
            selection
            onChange={handleCampaignsChange}
            options={options.campaigns}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Button onClick={handleApplyClick}>Apply</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default FiltersPanel
