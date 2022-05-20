import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';


import { default as ChallengeModalBox } from './';

describe('<ChallengeModalBox />', () => {
    const challengePendingMock = jest.fn();

    beforeEach(() => {
        render(
          <Router>
            <Provider store={store}>
              <ChallengeModalBox 
              show={challengePendingMock}
              heading='Awaiting challenge to be accepted' />
            </Provider>
          </Router>
        );
    });

    test('it displays a modal', () => {
        const modal = screen.getAllByRole('modal');

        expect(modal).toBeInTheDocument();
    });

    test('it displays a heading', () => {
        const result = screen.getByRole('heading');

        expect(result.textContent).toBe('Awaiting challenge to be accepted')
    });
    
});