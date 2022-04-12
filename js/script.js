//profile information

const repoList = document.querySelector (".repo-list")
const overview = document.querySelector (".overview");
const username = "bluebird5-star";

const getInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);

const data = await userInfo.json();
displayInfo(data);
};

getInfo();




const displayInfo = function (data){
const div = document.createElement("user-info");
div.classList.add("user-info");

div.innerHTML =`
<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
overview.append(div);
getRepo();

};

const getRepo = async function (){
  const repoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoInfo.json();

displayRepo(repoData);
};


const displayRepo = function (repos) {
  for (const repo of repos) {
    const item =document.createElement("li");
    item.classList.add("repo");
    item.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(item);
  }
};
