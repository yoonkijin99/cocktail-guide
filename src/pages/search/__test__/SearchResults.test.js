import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResults from '../SearchResults';

describe('unit/integration tests for component: SearchResults', () => {

    const MockSearchResults = ({searchData, templatedSearch}) => {
        return (
            <BrowserRouter>
                <SearchResults searchData={searchData} templatedSearch={templatedSearch} />
            </BrowserRouter>
        )
    }

    test('names of all drinks in the given data should be rendered', () => {
        render(<MockSearchResults 
            searchData={[
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 1", name: "cocktail1"},
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 2", name: "cocktail2"}
            ]} 
            templatedSearch={'name=martini%20cocktail'}
            />);

        let drinkName = '';

        drinkName = screen.getByText('cocktail1');
        expect(drinkName).toBeInTheDocument();

        drinkName = screen.getByText('cocktail2');
        expect(drinkName).toBeInTheDocument();
    })

    test('link elements address to={} should be templated as following:     (templatedSearch) + @ + (index of searchData)', () => {
        render(<MockSearchResults 
            searchData={[
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 1", name: "cocktail1"},
                {ingredients: ['ingredient1, ingredient2'], instructions: "test instructions 2", name: "cocktail2"}
            ]} 
            templatedSearch={'name=martini%20cocktail'}
            />);

        let pageLinkTestUsingTestId = '';
        
        pageLinkTestUsingTestId = screen.getByTestId('name=martini%20cocktail@0');
        expect(pageLinkTestUsingTestId).toBeInTheDocument();

        pageLinkTestUsingTestId = screen.getByTestId('name=martini%20cocktail@1');
        expect(pageLinkTestUsingTestId).toBeInTheDocument();
    })
    
})
