import React, { useState } from 'react'
import { Container, Grid, Header, Message } from 'semantic-ui-react'

import { CardFluidContainer, JsonFromCsvProvider } from 'components'
import { AppUsageInfo, FiltersPanel, Chart, FiltersInfo } from 'modules'
import { Filters } from 'types'
import { initialFiltersState } from 'values'

const App = () => {
  const [filters, setFilters] = useState<Filters>(initialFiltersState)

  return (
    <Container fluid className="content">
      <Header as="h1">Adverity Advertising Data ETL-V Challenge</Header>

      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <CardFluidContainer>
              <AppUsageInfo />
            </CardFluidContainer>
          </Grid.Column>
        </Grid.Row>

        <JsonFromCsvProvider url={process.env.REACT_APP_CSV_URL as string}>
          {({ error, data }) => {
            if (error) {
              return (
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Message negative>
                      <Message.Header>Error</Message.Header>

                      <p>{error}</p>
                    </Message>
                  </Grid.Column>
                </Grid.Row>
              )
            }

            return (
              <Grid.Row>
                <Grid.Column width={4}>
                  <CardFluidContainer>
                    <FiltersPanel data={data} onChange={setFilters} />
                  </CardFluidContainer>
                </Grid.Column>

                <Grid.Column width={12}>
                  <CardFluidContainer>
                    <FiltersInfo filters={filters} />

                    <Chart data={data} filters={filters} />
                  </CardFluidContainer>
                </Grid.Column>
              </Grid.Row>
            )
          }}
        </JsonFromCsvProvider>
      </Grid>
    </Container>
  )
}

export default App
