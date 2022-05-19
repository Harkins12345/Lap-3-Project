import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { default as UserOnlineCard } from './';

describe('<UserOnlineCard />', () => {
    const onClickMock = jest.fn();

    beforeEach(() => {

        // --- RENDER NEEDS ALL THE SPECIFICS THAT PAGE SHOULD HAVE THEN CALLED LATER
        render(<UserOnlineCard 
            username='khari'
            handleSelectedUser={onClickMock}
            />)
    });

    test('it displays username', () => {
        const result = screen.getByRole("heading");

        expect(result).toBeInTheDocument();
    })

    test('it displays username Khari', () => {
        const result = screen.getByRole("heading");

        expect(result.textContent).toBe('khari');
    })

    test('it calls the function onClick', async () => {
        const card = screen.getByRole("card");

        await userEvent.click(card);

        expect(onClickMock).toHaveBeenCalled();
    })


})