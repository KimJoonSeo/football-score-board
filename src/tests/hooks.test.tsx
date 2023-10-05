import { rest } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'
import {mockData, server} from './utils'
import { createWrapper } from './utils'
import { useScoreBoardData } from '../hooks'

describe('useScoreBoardData hook', () => {
    test('successful useScoreBoardData hook', async () => {
        const { result } = renderHook(() => useScoreBoardData('20230923', 'eng.1'), {
            wrapper: createWrapper()
        });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toStrictEqual(mockData);
    })

    test('failure useScoreBoardData hook', async () => {
        server.use(
            rest.get('*/scoreboard*', (req, res, ctx) => {
                return res(ctx.status(500))
            })
        )
        const { result } = renderHook(() => useScoreBoardData('20230923', 'kor.1'), {
            wrapper: createWrapper()
        })
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBeDefined()
    })
})