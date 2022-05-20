import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { default as HighScoresRow } from './';

describe('<HighScoresRow />', () => {
    const onClickMock = jest.fn();

    beforeEach(() => {

        // --- RENDER NEEDS ALL THE SPECIFICS THAT PAGE SHOULD HAVE THEN CALLED LATER
        render(<HighScoresRow 
            username='khari'
            duels='4'
            currentScore='44'
        
            />)
    });

    test('it displays username', () => {
        const result = screen.getByLabelText("username-heading");

        expect(result).toBeInTheDocument();
    })

    test('it displays username Khari', () => {
        const result = screen.getByLabelText("username-heading");

        expect(result.textContent).toBe('khari');
    })

    test('it displays duels', () => {
        const result = screen.getByLabelText("duels-heading");

        expect(result).toBeInTheDocument();
    })

    test('it displays duels 4', () => {
        const result = screen.getByLabelText("duels-heading");

        expect(result.textContent).toBe('4');
    })

    test('it displays current score', () => {
        const result = screen.getByLabelText("current-score-heading");

        expect(result).toBeInTheDocument();
    })

    test('it displays current score', () => {
        const result = screen.getByLabelText("current-score-heading");

        expect(result.textContent).toBe('44');
    })

})