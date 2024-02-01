import App from '../App'
import { mockData, renderWithClient, server } from './utils'
import { screen } from '@testing-library/react'
import { rest } from 'msw'

describe('App component', () => {
  test('should render App successfully', async () => {
    renderWithClient(<App />)
    if(mockData.events[0].competitions[0].competitors[0].records) {
      const summary =
          mockData.events[0].competitions[0].competitors[0].records[0].summary
      // eslint-disable-next-line jest/no-conditional-expect
      expect(await screen.findByText('(' + summary + ')')).toBeInTheDocument()
    }
  })

  test('should render App successfully when data is empty', async () => {
    server.use(
      rest.get('*/scoreboard*', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ events: [] }))
      }),
    )
    renderWithClient(<App />)
    expect(await screen.findByText('No game today!')).toBeInTheDocument()
  })

  test('should render App successfully when data fetch is failed', async () => {
    server.use(
      rest.get('*/scoreboard*', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
    renderWithClient(<App />)
    expect(
      await screen.findByText('An error has occurred while fetching data.'),
    ).toBeInTheDocument()
  })
})
