import {mockData, renderWithClient} from "./utils";
import {DashBoard, ScoreCard} from "../components";
import {render, screen} from "@testing-library/react";

describe('ScoreCard', () => {
    test('renders a record of team', () => {
        // renderWithClient(<DashBoard date={'20231021'} league={'eng.1'} />)
        // const loadingElement = screen.getByText(/Loading/)
        // expect(loadingElement).toBeInTheDocument()
        render(<ScoreCard status={mockData.events[0].status} competitions={mockData.events[0].competitions} />)
        const recordElement = screen.getByText('('+mockData.events[0].competitions[0].competitors[0].records[0].summary+')')
        expect(recordElement).toBeInTheDocument()
    })
})