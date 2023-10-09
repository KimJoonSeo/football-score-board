import App from "../App";
import {mockData, renderWithClient, server} from "./utils";
import {screen} from "@testing-library/react";
import {rest} from "msw";

describe('App component', () => {
    test('successful query component', async () => {
        renderWithClient(<App />)
        const summary = mockData.events[0].competitions[0].competitors[0].records[0].summary;
        expect(await screen.findByText('(' + summary + ')'))
            .toBeInTheDocument();
    });

    test('successful query component but data is empty', async () => {
        server.use(
            rest.get(
                '*/scoreboard*',
                (req, res, ctx) => {
                    return res(
                        ctx.status(200),
                        ctx.json({events: []}),
                    )
                }
            )
        )
        renderWithClient(<App />)
        expect(await screen.findByText('No game today!')).toBeInTheDocument();
    });

    test('failure query component', async () => {
        server.use(
            rest.get('*/scoreboard*', (req, res, ctx) => {
                return res(ctx.status(500))
            })
        );
        renderWithClient(<App />)
        expect(await screen.findByText('An error has occurred while fetching data.')).toBeInTheDocument();
    });
})