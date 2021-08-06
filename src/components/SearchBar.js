import React, { useState } from 'react';
import { Input, Radio } from 'antd';

import { SEARCH_KEY } from "../constants";

// rsf: react stateless function

const { Search } = Input;
function SearchBar(props) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState("");

    const handleSearch = value => {
        // case 1: display error message
        // - searchTYpe !== all && value === ""
        // case 2: clear error
        if (searchType !== SEARCH_KEY.all && value === "") {
            setError("Please input your search keyword!");
            return;
        }
        setError("")
    }

    const changeSearchType = e => {
        const searchType = e.target.value;
        setSearchType(searchType);
        setError("")
    }

    return (
        <div className="search-bar">
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                disabled={searchType === SEARCH_KEY.all}
            />

            <p className="error-msg">{error}</p>

            <Radio.Group value={searchType}
                         onChange={changeSearchType}
            >
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;