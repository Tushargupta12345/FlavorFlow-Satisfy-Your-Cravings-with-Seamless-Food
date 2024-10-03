import React from "react";
import Shimmer from "./Shimmer";

export default class DeveloperClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "",
        location: "",
        avatar_url: "",
      },
    };
  }
  // 
//https://github.com/saurabh77008?action=show&controller=profiles&tab=contributions&user_id=saurabh77008

  async componentDidMount() {
    try {
      const data = await fetch("https://api.github.com/users/saurabh77008");
      const json = await data.json();

      this.setState({
        userInfo: json,
      });
    } catch (err) {
      console.log("error in fetching user data");
    }
  }

  componentDidUpdate() {
    console.log("state variables updated with data from github!");
  }

  componentWillUnmount() {
    // just before this component getting removed or just before switching to another component, this will get called
  }

  render() {
    const { name, location, avatar_url, followers, bio } = this.state.userInfo;
    {
      console.log(followers, bio);
    }
    return !name && !location && !avatar_url ? (
      <Shimmer />
    ) : (
      <div className="github-div">
        <img className="github-div-left" src={avatar_url} />
        <div className="github-div-right">
          <div className="github-name">{name}</div>
          <div className="github-elements">
            <img
              className="github-icons"
              src="https://img.icons8.com/?size=100&id=7880&format=png&color=FC8120"
            />
            {location}
          </div>
          <div className="github-elements">
            <img
              className="github-icons"
              src="https://img.icons8.com/?size=100&id=93143&format=png&color=FC8120"
            />
            {bio}
          </div>
          <div className="github-elements">
            <img
              className="github-icons"
              src="https://img.icons8.com/?size=100&id=59789&format=png&color=FC8120"
            />
            {followers} followers
          </div>
          <a
            className="github-elements"
            href="https://github.com/saurabh77008/FlavorFlow-Satisfy-Your-Cravings-with-Seamless-Food"
            target="_blank"
          >
            <img
              className="github-icons"
              src="https://img.icons8.com/?size=100&id=62856&format=png&color=FC8120"
            />
            Github Repository
          </a>
        </div>
      </div>
    );
  }
}