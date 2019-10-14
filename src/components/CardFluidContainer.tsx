import React, { FC } from 'react'
import { Card } from 'semantic-ui-react'

const CardFluidContainer: FC = ({ children }) => (
  <Card fluid>
    <Card.Content>{children}</Card.Content>
  </Card>
)

export default CardFluidContainer
