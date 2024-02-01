import { mockData } from './utils'
import { ScoreCard } from '../components'
import { render, screen } from '@testing-library/react'

describe('ScoreCard', () => {
  test('renders a record of team', () => {
      render(
          <ScoreCard
              status={mockData.events[0].status}
              competitions={mockData.events[0].competitions}
          />,
      )
      if(mockData.events[0].competitions[0].competitors[0].records) {
        const recordElement = screen.getByText(
            '(' +
            mockData.events[0].competitions[0].competitors[0].records[0].summary +
            ')',
        )
        // eslint-disable-next-line jest/no-conditional-expect
        expect(recordElement).toBeInTheDocument()
      }
  })
})
