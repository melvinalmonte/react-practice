import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            repos: []
        };
    }

    handleSearch = (user) =>{
        let url = 'https://api.github.com/users/'+user+'/repos';
        fetch(url)
            .then(response => response.json()).then((repos) => {
            console.log(repos);
            console.log(repos.length);
            this.setState({
                repos: repos
            });
        }).catch(() => {
            console.log("User not found");
        });
    };

    returnsPost(){
        const options = {
            method: 'POST',
            data: {
                title:'foo',
                body: 'bar',
                userId:1
            },
            credentials: 'include',
            headers: {}
        };
        fetch('https://jsonplaceholder.typicode.com/posts', options)
            .then((response) => {
                return response.json();
            })
            .then((jsonObject) => {
                console.log(jsonObject)
                console.log(`ID ${jsonObject.id} was created. POST SUCCEEDED`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    returnFlaskPost(){
        const options = {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'user1': "abc",
                'user2': 'electric-bugaloo'
            })
        };
        return fetch("http://localhost:5000/api/v1", options)
            .then((response) => {
                return(response.text())
            })
            .then((text) => {
                console.log(text)
            })
    }

    render(){
        return (
            <div className="app-container">
                <h3>C'mon, stalk on someone's repo</h3>
                <SearchBar handleSubmit={this.handleSearch} />
                <RepoList repos={this.state.repos}/>
                <div>{this.returnsPost()}</div>
                <div>{console.log(this.returnFlaskPost())}</div>
            </div>
        )
    }
}

class SearchBar extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const text = event.target.text.value;
        this.props.handleSubmit(text);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    name="text"
                    className="form-control"
                    type="text"
                    placeholder="Type github user and press ENTER"
                />
            </form>
        );
    }
}

class RepoList extends Component {

    render(){
        let rows = [];
        this.props.repos.map((repo,index) => rows.push(<RepoItem key={index} repo={repo} />))
        return (
            <div className="list-group">
                {rows}
            </div>
        )
    }
}

RepoList.defaultProps = {
    repos: []
};

class RepoItem extends Component {
    render(){
        return (
            <a href="/" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.repo.name}</h5>
                    <small>{new Date(Date.parse(this.props.repo.created_at)).toLocaleDateString()}</small>
                </div>
                <p className="mb-1">{this.props.repo.description}</p>
                <small>{this.props.repo.html_url}</small>
            </a>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector(".container"));