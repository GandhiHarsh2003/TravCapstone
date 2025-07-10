import "../App.css";
import Pagination from "@mui/material/Pagination";

function SearchResults(props) {
    return (
        <div>
            <Pagination count={10} showFirstButton showLastButton />
        </div>
    );
}

export default SearchResults;