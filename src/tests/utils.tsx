import { render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ScoreBoard} from "../types";

const mockData: ScoreBoard = {
    events: [
        {
            status: {
                displayClock: "90'+9'",
                type : {
                    completed: true,
                    description: "Full Time",
                    detail: "FT",
                    name: "STATUS_FULL_TIME",
                    state: "post"
                }
            },
            competitions: [
                {
                    competitors: [
                        {
                            score: "3",
                            records: [{
                                summary: "5-0-2",
                            }],
                            team: {
                                abbreviation: "AVL",
                                color: "7A003C",
                                alternateColor: "eeef52",
                                isActive: true,
                                logo: "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
                            }
                        },
                        {
                            score: "0",
                            records: [{
                                summary: "1-5-1",
                            }],
                            team: {
                                abbreviation: "BHA",
                                color: "0000ff",
                                alternateColor: "0dbf5d",
                                isActive: true,
                                logo: "https://a.espncdn.com/i/teamlogos/soccer/500/331.png",
                            }
                        }
                    ],
                    startDate: "2023-09-30T11:30Z",

                }
            ],
        }
    ]
};
const handlers = [
    rest.get(
        '*/scoreboard*',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(mockData),
            )
        }
    )
]
export const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
    }
})

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient();
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    }
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient();
    return ({ children }: {children: React.ReactNode}) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    )
}