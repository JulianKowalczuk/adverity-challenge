import React from 'react'
import { List } from 'semantic-ui-react'

const AppUsageInfo = () => (
  <>
    <List>
      <List.Item value="-">
        - Select zero to N <i>Datasources</i>
      </List.Item>

      <List.Item value="-">
        - Select zero to N <i>Campaigns</i>
      </List.Item>
    </List>

    <p>(where zero means "All")</p>

    <p>
      Hitting "Apply" filters the chart to show a timeseries for both <i>Clicks</i> and{' '}
      <i>Impressions</i> for given <i>Datasources</i> and <i>Campaigns</i> - logical AND
    </p>
  </>
)

export default AppUsageInfo
