import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import DrinkDetails from '../DrinkDetails';
import options from '../../../api-config';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ templatedSearch: 'name=cocktail1@0' })
}));

describe('unit/integration tests for component: SearchResults', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });
    
    test('since params is   name=cocktail1@0   fetch request should be made to endpoint based on name and given user input', async () => {

        fetch.mockResponseOnce(JSON.stringify(
            [
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 1", name: "cocktail1"},
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 2", name: "cocktail2"},
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 3", name: "cocktail3"}
            ]
        ));

        await act( async () => {
            render(<DrinkDetails />);
        });
        
        expect(fetch).toHaveBeenCalledWith('https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=cocktail1', options);
    })

    test('should render details of selected drink - drink selection given by params(name=cocktail1@0)', async () => {

        fetch.mockResponseOnce(JSON.stringify(
            [
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 1", name: "cocktail1"},
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 2", name: "cocktail2"},
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 3", name: "cocktail3"}
            ]
        ));

        await act( async () => {
            render(<DrinkDetails />);
        });
        
        let drinkDetails = '';

        drinkDetails = screen.getByText('cocktail1');
        expect(drinkDetails).toBeInTheDocument();

        drinkDetails = screen.getByText('test instructions 1');
        expect(drinkDetails).toBeInTheDocument();

        drinkDetails = screen.getByText('ingredient1, ingredient2,');
        expect(drinkDetails).toBeInTheDocument();
    })

})
