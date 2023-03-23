import { Link } from "react-router-dom";
import './SearchResults.css';

const SearchResults = ({searchData, templatedSearch}) => {
    return (
        <div className="search-results">
            {searchData && searchData.map((result, index) => (
                <div className="search-preview" key={index}>
                    <Link to={templatedSearch + '@' + index.toString()} data-testid={templatedSearch + '@' + index.toString()}> 
                        <p>{result.name}</p>
                    </Link>                            
                </div>
            ))}
        </div>
     );
}
 
export default SearchResults;