import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';


import { default as NavBar } from './';

describe('<NavBar />', () => {
    const onClickMock = jest.fn();

    beforeEach(() => {
        render(
          <Router>
            <Provider store={store}>
              <NavBar handleClick={onClickMock} />
            </Provider>
          </Router>
        );
    });

    test('it displays 3 NavLinks', () => {
        const navLinks = screen.getAllByRole('link');

        expect(navLinks.length).toBe(3);
    });

})