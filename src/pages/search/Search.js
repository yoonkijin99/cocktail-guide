import { useState } from "react";
import './Search.css';
import SearchResults from "./SearchResults";
import options from "../../api-config";

let templatedSearch = '';

const Search = () => {

    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [searchType, setSearchType] = useState('Name');

    const templateSearch = () => {
        templatedSearch = search.trim().replaceAll(' ', '%20').replaceAll(',', '%2C');

        if (searchType === 'Name') {
            templatedSearch = 'name=' + templatedSearch;
        } else {
            templatedSearch = 'ingredients=' + templatedSearch;
        }
    }

    const switchSearchType = () => {
        if (searchType === 'Name') {
            setSearchType('Ingredients');
        } else {
            setSearchType('Name');
        }
    }

    const handleSearch = async (eventObj) => {
        try {
            eventObj.preventDefault();

            templateSearch(search);

            const response = await fetch('https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?' + templatedSearch, options);

            if (response.status !== 200) {
                throw new Error('cannot fetch data');
            }

            const data = await response.json();

            setSearchData(data);

        } catch (err) {
            console.log(err.message, ' Error has occurred please address');
        }
    }


    return (
        <div className="search">

            <p className="search-header">You are currently searching by:</p>
            <p className="search-type">{searchType}</p>
            <button className="type-button" onClick={switchSearchType}>Switch Search Type</button>

            <form className="search-form" onSubmit={handleSearch}>
                <input className="search-input" type="text" required value={search} onChange={(eventObj) => setSearch(eventObj.target.value)} />
                <button className="search-button">Search</button>
            </form>

            <div className="input-instructions">
                <p>Ideas:</p>
                <p>Drinks: martini cocktail, pink gin, brandy manhattan, long island iced tea, etc</p>      
                <p>Ingredients: vodka, lemon, whisky, cola, gin, rum, lime, etc</p>         
                <p>{'(separate ingredients by commas without spaces in the input above for best results)'}</p> 
            </div>

            <SearchResults searchData={searchData} templatedSearch={templatedSearch} />

        </div>
     );
}
 
export default Search;
