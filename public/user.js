// Classes

class PostCard {
  constructor(
    imageUrl,
    userName,
    postText,
    postDate,
    online,
    numOfUpVotes,
    numOfDownVotes,
    postId
  ) {
    let main = document.createElement("div");
    let contentsLeft = document.createElement("div");
    let contentsRight = document.createElement("div");
    let linkToGit = document.createElement("a");
    let imageEl = document.createElement("img");
    let userNameEl = document.createElement("h3");
    let postEl = document.createElement("p");
    let downVoteEl = document.createElement("button");
    let upVoteEl = document.createElement("button");
    let dateEl = document.createElement("kbd");
    main.className = "div-article-main";
    contentsLeft.className = "div-article-content-left";
    contentsRight.className = "div-article-content-right";
    downVoteEl.style =
      " width: 100px; background-color: whitesmoke; color:#333333;";
    upVoteEl.style =
      "width: 100px; background-color:whitesmoke; color: #333333;";
    dateEl.style = "margin-top: 20px; color: #333333;width: 100px; font-style: italic;";

    if (online) {
      userNameEl.innerText = `🌕 ${userName}`;
    } else {
      userNameEl.innerText = `🌑 ${userName}`;
    }
    postDate = new Date(postDate);
    postDate = postDate.toString().slice(0, 21);
    userNameEl.style =
      "margin-bottom: 12px; text-decoration: none; color: #66ff66;";
    postEl.innerText = `${postText}`;
    downVoteEl.innerText = `🔽 ${numOfDownVotes}`;
    upVoteEl.innerText = `🔼 ${numOfUpVotes}`;
    dateEl.innerText = `${postDate}`;

    downVoteEl.id = postId;
    upVoteEl.id = postId;
    linkToGit.setAttribute("href", `https://www.github.com/${userName}`);
    imageEl.setAttribute("src", imageUrl);

    downVoteEl.addEventListener("click", downVote);
    upVoteEl.addEventListener("click", upVote);

    linkToGit.appendChild(imageEl);
    contentsLeft.appendChild(linkToGit);
    contentsLeft.appendChild(userNameEl);
    contentsLeft.appendChild(upVoteEl);
    contentsLeft.appendChild(downVoteEl);

    contentsRight.appendChild(postEl);
    contentsRight.appendChild(dateEl)
    main.appendChild(contentsLeft);
    main.appendChild(contentsRight);
    

    return main;
  }
}

// Event listeners
document
  .getElementById("profile_button")
  .addEventListener("click", showPostBox);
document
  .getElementById("headline_button")
  .addEventListener("click", showHeadline);
document.getElementById("submit_post").addEventListener("click", createPost);
document.getElementById("logout_button").addEventListener("click", logout);
const username = document.getElementById("username_text").innerText;

// Xml Http Requests
const fetchGitWithToken = async () => {
  let cookies = document.cookie;
  let convert = cookies.split(" ");
  const accessToken = convert[convert.length - 1].replace("AccessToken=", "");
  const dataToGet = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${accessToken}`,
      "User-Agent": "https:www.github.com/DariusRain"
    }
  })
    .then(data => {
      return data.json();
    })
    .then(data => {
      const { bio, avatar_url, public_repos, url, repos_url, user } = data;
      //- console.log(bioText, avatarUrl, reposUrl, mainUrl)
      usernamez = user;
      document.getElementById("avatar").setAttribute("src", avatar_url);
      document.getElementById(
        "num_repos"
      ).innerText = `Repositories: ${public_repos}`;
      document.getElementById("bio_text").innerText = bio || null;
      return repos_url;
    })
    .then(reposUrl => {
      return fetch(reposUrl)
        .then(data => {
          return data.json();
        })
        .then(data => {
          let parent = document.getElementById("list_repos");
          let count = 0;
          const mappedResponse = data.map(element => {
            return { url: element.html_url, name: element.name };
          });
          console.log(mappedResponse);
          mappedResponse.forEach(element => {
            let div = document.createElement("div");
            let number = document.createElement("h5");
            let anchor = document.createElement("a");
            let breakSt = document.createElement("br");
            let horzBrkSt = document.createElement("hr");

            div.style =
              "margin: 0 auto; margin-bottom: 20px; text-decoration: none; width:50%; border-style: solid; padding: 12px; word-break: break-all; background-color:whitesmoke;";
            number.innerText = ++count;
            number.style = "color: #3333333;";

            anchor.setAttribute("href", element.url);
            anchor.innerText = element.name;
            anchor.style = " color: #3333333; text-decoration: none;";

            horzBrkSt.style = "color:#66ff66;";

            div.appendChild(number);
            div.appendChild(anchor);

            parent.appendChild(div);
            parent.appendChild(breakSt);
          });
        });
    })
    .catch(err => {
      console.log("Error:", err);
    });
  return dataToGet;
};
fetchGitWithToken();

function createPost() {
  let post_text = document.getElementById("post_text").value.trim();

  return (async () => {
    const send = await fetch(window.location.href, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        user: document.getElementById("username_text").innerText,
        avatar: document.getElementById("avatar").getAttribute("src"),
        post: post_text,
        postDate: new Date()
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        alert(response.message);
        window.location.reload();
      })
      .catch(err => {
        alert(err.message);
      });
  })();
}

const getFeed = async () => {
  try {
    const runFeed = await fetch(`http://localhost:5000/user/feed`);
    const json = await runFeed.json();
    let parent = document.getElementById("feed_div");

    const display = json.reverse().map(postObj => {
      console.log(postObj);
      parent.appendChild(
        new PostCard(
          postObj.avatar,
          postObj.user,
          postObj.post,
          postObj.postDate,
          postObj.online,
          postObj.thumbups.length,
          postObj.thumbdowns.length,
          postObj._id
        )
      );
    });
  } catch {
    console.log("Error Displaying feed.");
  }
};

getFeed();
async function logout() {
  try {
    const areYouSure = confirm("Continue logging out?");
    if (areYouSure) {
      const logoutAttempt = await fetch("http://localhost:5000/user/logout");
      location.assign("/");
    }
  } catch {
    console.log("No logging out going on here buddy!");
  }
}

async function upVote() {
  try {
    const attemptingVote = await sendVote("up-vote", this);
  } catch {
    console.log("Error caught in function: upVote()");
  }
}

async function downVote() {
  try {
    const attemptingVote = await sendVote("down-vote", this);
  } catch {
    console.log("Error caught in function: upVote()");
  }
}

async function sendVote(voteType, element) {
  console.log(element);
  let upVoteArray;
  let downVoteArray;
  let upVoteButtonString;
  let downVoteButtonString;
  // The element is has the value of the button being pressed.
  // The vote type only is used in the fetch function.
  try {
    const sendingVote = await fetch(`/user/vote/${voteType}/${element.id}`, {
      method: "PUT"
    });

    const parseResponse = await sendingVote.json();
    // location.reload(true)
    console.log(parseResponse);

    // Gettiung ready to structe the logic from the upvote & downvote arrays
    // Will be handy later to show who liked.
    upVoteArray = parseResponse.upVotes;
    downVoteArray = parseResponse.downVotes;
    upVoteButtonString = `🔼 ${upVoteArray.length}`;
    downVoteButtonString = `🔽 ${downVoteArray.length}`;
    // If the button has a previous sibling then that means it is the downvote button being pressed
    // Becuase the previous would be the upvote button. Then vice versa for the other else statement.
  } catch {
    console.log("Error sending vote: sendVote()");
  }
  console.log(1, element.nextSibling);

  if (element.innerText.includes('🔼')) {
    element.innerText = upVoteButtonString;
    element.nextSibling.innerText = downVoteButtonString;
  } else if (element.innerText.includes('🔽')) {
    element.previousSibling.innerText = upVoteButtonString;
    element.innerText = downVoteButtonString;
  }
  setTimeout(() => {
    element.style.backgroundColor = "orange";
  }, 0);

  setTimeout(() => {
    element.style.backgroundColor = "whitesmoke";
  }, 300);
}

// Event Handlers
function showHeadline() {
  let style = document.getElementById("headline").style;
  if (style.display === "block") {
    style.display = "none";
  } else {
    style.display = "block";
  }
}

function showPostBox() {
  let style = document.getElementById("post_form").style;
  if (style.display === "flex") {
    style.display = "none";
  } else {
    style.display = "flex";
  }
}
