import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Search from '../Search';
import options from '../../../api-config';

describe('unit/integration tests for component: Search', () => {

    describe('tests for user interaction: text input and search type button', () => {

        test('input element value should be what user enters', () => {
            render(<Search />);

            const userInput = screen.getByRole('textbox');
            fireEvent.change(userInput, { target: { value: 'randomDrinkOrIngredients' } });

            expect(userInput.value).toBe('randomDrinkOrIngredients');
        })

        test('switchSearchTypeButton should change searching for Name/Ingredients and render it on screen', () => {
            render(<Search />);

            let searchTypeText = screen.getByText('Name');
            expect(searchTypeText).toBeInTheDocument();

            const switchSearchTypeButton = screen.getByRole('button', { name: 'Switch Search Type' });
            fireEvent.click(switchSearchTypeButton);

            searchTypeText = screen.getByText('Ingredients');
            expect(searchTypeText).toBeInTheDocument();
        })
    
    })

    describe('tests regarding fetch API (mock requests)', () => {

        const MockSearch = () => {
            return (
                <BrowserRouter>
                    <Search />
                </BrowserRouter>
            )
        }

        beforeEach(() => {
            fetch.resetMocks();
        });

        test('basic fetch API usage - names of all drinks should be recieved and rendered', async () => {
            fetch.mockResponseOnce(JSON.stringify(
                [
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 1", name: "cocktail1"},
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 2", name: "cocktail2"},
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 3", name: "cocktail3"}
                ]
            ));

            render(<MockSearch />);

            const searchButton = screen.getByRole('button', { name: 'Search' });
            expect(searchButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(searchButton);
            });

            const linksArray = await screen.findAllByRole('link');
            expect(linksArray.length).toBe(3);

            let drinkNameText = '';
            drinkNameText = await screen.findByText('cocktail1');
            expect(drinkNameText).toBeInTheDocument();
            drinkNameText = await screen.findByText('cocktail2');
            expect(drinkNameText).toBeInTheDocument();
            drinkNameText = await screen.findByText('cocktail3');
            expect(drinkNameText).toBeInTheDocument();

            expect(fetch).toBeCalledTimes(1);
        })

        test('searching by Name: fetch request should be made to endpoint based on name and given user input', async () => {
            fetch.mockResponseOnce(JSON.stringify(
                [
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 1", name: "cocktail1"},
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 2", name: "cocktail2"},
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 3", name: "cocktail3"}
                ]
            ));

            render(<MockSearch />);

            const searchTypeText = screen.getByText('Name');
            expect(searchTypeText).toBeInTheDocument();

            const userInput = screen.getByRole('textbox');
            fireEvent.change(userInput, { target: { value: 'cocktail1' } });
            expect(userInput.value).toBe('cocktail1');

            const searchButton = screen.getByRole('button', { name: 'Search' });
            expect(searchButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(searchButton);
            });

            expect(fetch).toHaveBeenCalledWith('https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=cocktail1', options);
            expect(fetch).toBeCalledTimes(1);
        })

        test('searching by Ingredients: fetch request should be made to endpoint based on ingredients and given user input', async () => {
            fetch.mockResponseOnce(JSON.stringify(
                [
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 1", name: "cocktail1"},
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 2", name: "cocktail2"},
                    {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 3", name: "cocktail3"}
                ]
            ));

            render(<MockSearch />);

            const switchSearchTypeButton = screen.getByRole('button', { name: 'Switch Search Type' });
            fireEvent.click(switchSearchTypeButton);

            const searchTypeText = screen.getByText('Ingredients');
            expect(searchTypeText).toBeInTheDocument();

            const userInput = screen.getByRole('textbox');
            fireEvent.change(userInput, { target: { value: 'ingredient1' } });
            expect(userInput.value).toBe('ingredient1');

            const searchButton = screen.getByRole('button', { name: 'Search' });
            expect(searchButton).toBeInTheDocument();
            await act( async () => {
                fireEvent.click(searchButton);
            });

            expect(fetch).toHaveBeenCalledWith('https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?ingredients=ingredient1', options);
            expect(fetch).toBeCalledTimes(1);
        })
        
    })

})
