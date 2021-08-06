import React, { useState, useEffect } from 'react';
import { Tabs, message } from 'antd';
import axios from "axios";

import SearchBar from "./SearchBar";

import { SEARCH_KEY, BASE_URL, TOKEN_KEY} from "../constants";

const { TabPane } = Tabs;

function Home(props) {
    const [activeTab, setActiveTab] = useState("image")
    const [posts, setPost] = useState([]);
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ""
    })

    // how to get posts from the server
    // didMount + didUpdate
    useEffect( () => {
        // do search first time => didMount, searchOption
        // {type: all, value: ""}
        // after first time => didUpdate
        // search: {type: keyword/user, value: keyword}
        const { type, keyword } = searchOption;
        fetchPost(searchOption)
    }, [searchOption])

    const fetchPost = (option) => {
        // get search option
        // make a request to the server to fetch posts.
        const {type, keyword} = option;
        let url = "";
        // all
        // keyword
        // user
        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`;
        } else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        // config opt for axios request
        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        }

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    setPost(res.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            });

    }

    const renderPosts = type => {
        // case1: type === image
        // case2: type === video
        if(!posts || posts.length === 0) {
            return <div>No Data!</div>
        }

        if (type === "image") {
            return "images";
        }

        if (type === "video") {
            return "videos";
        }
    }

    return (
        <div className="home">
            <SearchBar />

            <div className="display">
                <Tabs
                    defaultActiveKey="image"
                    activeKey={activeTab}
                    onChange={() => setActiveTab()}
                >
                    <TabPane tab="Images" key="image">
                        { renderPosts("image") }
                    </TabPane>
                    <TabPane tab="Videos" key="video">
                        { renderPosts("video") }
                    </TabPane>
                </Tabs>
            </div>
        </div>

    );
}

export default Home;