import { screen } from "@testing-library/react";
import {DashBoard} from "../components";
import {renderWithClient, server} from "./utils";
import {rest} from "msw";

describe('DashBoard', () => {
    test('shows a loading bar while rendering DashBoard component', () => {
        renderWithClient(<DashBoard date={'20231021'} league={'eng.1'}/>)
        const loadingElement = screen.getByText(/Loading/)
        expect(loadingElement).toBeInTheDocument()
    })
    test('renders an error message', async () => {
        server.use(
            rest.get('*/scoreboard*', (req, res, ctx) => {
                return res(ctx.status(500))
            }),
        )
        renderWithClient(<DashBoard date={'20231021'} league={'eng.1'}/>)
        const errorElement = await screen.findByText(/An error has occurred while fetching data./)
        expect(errorElement).toBeInTheDocument()
    })
})