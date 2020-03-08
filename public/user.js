
let history = {}
const fetchGitWithToken = (async () => {
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
            history.username = user
            history.avtarUrl = avatar_url
            document.getElementById("avatar").setAttribute("src", avatar_url);
            document.getElementById("num_repos").innerText = `Repositories: ${public_repos}`;
            document.getElementById("bio_text").innerText = bio || null;
        return repos_url
    })
    .then(reposUrl => {
      return fetch(reposUrl)
    .then(data => {
      return data.json();
    })
    .then(data => {
        let parent = document.getElementById("list_repos")
        let count = 0;
            const mappedResponse = data.map(element => {
                return {url: element.html_url, name: element.name}
            })
            console.log(mappedResponse)            
            mappedResponse.forEach(element => {
                let div = document.createElement("div");
                let number = document.createElement("h4");
                let anchor = document.createElement("a");
                let breakSt = document.createElement("br");
                let horzBrkSt = document.createElement("hr");          
        
                div.style = "margin: 0 auto; border-radius:10px; margin-bottom: 20px; text-decoration: none; width:50%; border-style: solid; padding: 12px; background-color:#333333;";
                number.innerText = ++count;
                number.style = "font-size: 20px; color: #a5d4d3;";

                anchor.setAttribute("href", element.url);
                anchor.innerText = element.name
                anchor.style = "font-size: 25px; color: white; text-decoration: none;";

                horzBrkSt.style = "color:#a5d4d3;";

                div.appendChild(number);
                div.appendChild(anchor);

                parent.appendChild(div);
                parent.appendChild(breakSt);           
                    
                })
            })
    })
    .catch(err => {
      console.log("Error:", err);
    });
    return dataToGet;
})();

document.getElementById("profile_button").addEventListener('click', showProfile)
document.getElementById("headline_button").addEventListener('click', showHeadline)
document.getElementById("submit_post").addEventListener('click', createPost)
document.getElementById("logout_button").addEventListener('click', logout)
// const username = document.getElementById("username_text").innerText
// document.getElementById("uNameAnchor").setAttribute("href", `https://github.com/${username}`)
// const data = "#{user.profile}"

function showHeadline(){
let style = document.getElementById("headline").style
  if (style.display === 'block') {
    style.display = 'none'
  }else {
    style.display = 'block'
  }
}

function showProfile() {
  let style = document.getElementById("profile_box").style
    if (style.display === 'flex') {
      style.display = 'none'
    }else {
      style.display = 'flex'
    }
}

function createPost() {
  const post_text = document.getElementById('post_text').value.trim();
  const post_val = document.getElementById('post_text').value

  return (async () => {
     const send = await fetch(
        window.location.href,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            user: document.getElementById("username_text").innerText,
            avatar: document.getElementById("avatar").getAttribute("src"),
            post: post_text
          })
        }).then(response => {
          return response.json()
        })
        .then(response => {
          alert(response.message)
          window.location.reload()
        })
        .catch(err => {
          alert(err.message)
        })

    })()

}



const get_feed = (async () => {
const run_feed = await fetch(`http://localhost:5000/user/feed`)
  .then(response => {
    return response.json()
    })
  .then(response => {
    let parent = document.getElementById("feed_div")
    console.log(1, response)
    response.reverse().forEach(object => {
      let div = document.createElement("div"),
        div2 = document.createElement("div"),
        img = document.createElement("img"),
        a = document.createElement("a"),
        h3 = document.createElement("h3"),
        plinebr = document.createElement("p"),
        pre = document.createElement("p"),
        breakSt = document.createElement("br"),
        horzBreak = document.createElement("hr"),
        thumbUp = document.createElement("a"),  
        thumbDown = document.createElement("a"),
        section1 = document.createElement("div"),
        section2 = document.createElement("div");
        nameBox = document.createElement("div")
        div.className = 'div-article-main'
        div2.className = 'div-article-content'
        
        pre.className = 'article-message';
        thumbUp.className = 'article-vote'
        thumbDown.className = 'article-vote'
        a.className = 'article-link'
        img.className = 'article-avatar';
        h3.className = 'article-username'
        horzBreak.className = 'article-horz-break'
        img.setAttribute('src', object.avatar);
        a.setAttribute('href', `https://www.github.com/${object.user}`);
        thumbDown.setAttribute('href', `http://localhost:5000/user/dislike/${object.user}/${object._id}`)
        thumbUp.setAttribute('href', `http://localhost:5000/user/like/${object.user}/${object._id}`)
        // thumbUp.setAttribute('onclick', `window.open('_blank').close()`)
        // thumbDown.setAttribute('onclick', `window.open('_blank').close()`)

        a.appendChild(img);
        thumbUp.innerText = `🔼 ${object.thumbups.length}`;
        thumbDown.innerText = `🔽 ${object.thumbdowns.length}`;
        plinebr.innerText = '\n'
        pre.innerText = `${object.post}`;
        h3.innerText = object.user
        section1.style = 'display: flex; flesx-direction: column; flex-wrap: wrap; width: 20%;'
        section2.style = 'display: flex; flesx-direction: column; flex-wrap: wrap; padding: 30px; width: 70%;'

        nameBox.appendChild(a)
        nameBox.appendChild(h3)
        section1.appendChild(nameBox)


        section1.appendChild(thumbUp)
        section1.appendChild(thumbDown)

        section2.appendChild(pre);

        div2.appendChild(section1);
        div2.appendChild(section2)
        div.appendChild(div2)
        
        parent.appendChild(div);
    })
  
  })    
  .catch(err => {
    return err.message;
  })

})()


async function logout() {
  try {
    const areYouSure = confirm("Continue logging out?")
    if(areYouSure) {
    const logoutAttempt = await fetch('http://localhost:5000/user/logout');
      location.assign('/')
  } 
  }
  catch {
    console.log('No logging out going on here buddy!')
  }
}