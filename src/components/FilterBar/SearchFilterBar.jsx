import { SELECT_FILTER } from "../../constants/constants";
import SelectFilter from "./SearchFilter";
import "./SelectFilterBar.css";

/*
 *   Component Generating the top Filter Bar with all Select filter
 */
function SearchFilterBar() {
    const generateSearchFilters = () => {
        return SELECT_FILTER.map((currentFilter) => {
            return (
                <SelectFilter
                    tag={currentFilter.tag}
                    names={currentFilter.values}
                    key={currentFilter.tag}
                />
            );
        });
    };

    return <div className="select-filter-bar">{generateSearchFilters()}</div>;
}

export default SearchFilterBar;
