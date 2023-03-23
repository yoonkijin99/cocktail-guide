import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DrinkDetails.css';
import options from '../../api-config';

const DrinkDetails = () => {

    const params = useParams();

    let index = '';

    const [searchData, setSearchData] = useState(null); 

    const getDrinkDetails = async (params) => {

        let { templatedSearch } = params;
    
        const specification = templatedSearch.substring(0, templatedSearch.indexOf("@"));
        index = templatedSearch.substring(templatedSearch.indexOf("@") + 1);
    
        const response = await fetch('https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?' + specification, options);
    
        if (response.status !== 200) {
            throw new Error('cannot fetch data');
        }
    
        const data = await response.json();
    
        return data;
    }

    useEffect(() => {
        getDrinkDetails(params)
        .then(data => setSearchData(data[parseInt(index)]))
        .catch(err => console.log(err.message));
    }, [])


    return ( 
        <div className="drink-details">
            {searchData && <div>
                <h2 className="drink-name">{searchData.name}</h2>
                <p className="ingredients">Ingredients</p>
                <p>{searchData.ingredients.map((ingredientDetail) => (ingredientDetail + ', '))}</p>
                <p className="instructions">Instructions</p>
                <p>{searchData.instructions}</p>    
            </div>}
        </div>
     );
}
 
export default DrinkDetails;