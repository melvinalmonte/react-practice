import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';
import VideoListItems from "./components/video_list_item";

const API_KEY = "AIzaSyC1B-oVHoektfjZRJn26MTxi4KKRvNzxwM";


class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            videos: []
        };

        YTSearch(
            {key: API_KEY, term: 'goku vs. jiren'},
            (videos) => {
                this.setState({videos});
            });
    // this.setState({videos:videos});
    }

    render(){
        return (
        <div>
            <SearchBar/>
            <VideoDetail video = {this.state.videos[0]}/>
            <VideoList videos = {this.state.videos}/>
        </div>
        );
    }

}



ReactDOM.render(<App/>, document.querySelector(".container"));