import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_details';
//import "../style/style.css"

const API_KEY = "AIzaSyC1B-oVHoektfjZRJn26MTxi4KKRvNzxwM";


class App extends Component{
    constructor(props){
        super(props)

        this.state = { videos: []};

        YTSearch({key: API_KEY, term: 'fanfare trumpet victory tune sound effect hd'}, (videos) => {this.setState({videos});});
    // this.setState({videos:videos});
    }

    render(){
        return (
        <div className="video-player">
            <VideoDetail video = {this.state.videos[0]}/>
        </div>
    );
    }

}


ReactDOM.render(<App/>, document.querySelector(".container"));