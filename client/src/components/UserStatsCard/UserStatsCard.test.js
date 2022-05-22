import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from'../../store' 

import { default as UserStatsCard } from './';

describe('<UserStatsCard/>', () => {
    const onClickMock = jest.fn();

    beforeEach(() => {
    
        render(
            <Provider store={store}>
        <UserStatsCard
           username ='NFT' 
           handleSelectedUser={onClickMock}
           />
               </Provider>
           
           
           );

});
test('It displays the username',()=>{
    const results = screen.getByRole("header");//give the index.js a role
    expect (results).toBeInTheDocument();//expect it to be shown in the document 

})
test ('it displays username NFT',() => {
    const results = screen.getByRole("header");
    expect(results.textContent).toBe("NFT");

})

test('it calls the function onClick', async () => {
    const cards = screen.getByRole("cards");

    await userEvent.click(cards);
    expect(onClickMock).toHaveBeenCalled();

      })

})