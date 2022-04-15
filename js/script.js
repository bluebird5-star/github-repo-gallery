//profile information

const backtoRepoButton = document.querySelector (".view-repos");
const filterInput =document.querySelector (".filter-repos")
const allRepos = document.querySelector (".repos");
const repoData = document.querySelector (".repo-data");
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
  const fetchRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepo.json();

displayRepo(repoData);
};


const displayRepo = function (allRepos) {
  filterInput.classList.remove("hide");
  for (const repo of allRepos) {
    const item =document.createElement("li");
    item.classList.add("repo");
    item.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(item);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3"));

const repoName = e.target.innerText;
getRepoInfo(repoName);

});

const getRepoInfo = async function (repoName) {
  const getInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();

    console.log(repoInfo);

    const fetchLanguages = await fetch (repoInfo.languages_url);
      const languageData = await fetchLanguages.json();

      const languages = [];
      for (const language in languageData) {
        languages.push(language);
      }

showRepoInfo(repoInfo, languages);
}

const showRepoInfo = function (repoInfo,languages){

backtoRepoButton.classList.remove("hide");
repoData.innerHTML = "";
repoData.classList.remove("hide");
allRepos.classList.add("hide");
const div = document.createElement("div");
backtoRepoButton.classList.remove("hide");
div.innerHTML =
`
<h3>Name: ${repoInfo.name}</h3>
<p>Description: ${repoInfo.description}</p>
<p>Default Branch: ${repoInfo.default_branch}</p>
<p>Languages: ${languages.join (",")}</p>
<a class ="visit" href="${repoInfo.html_url}" target = "_blank" rel="noreferrer noopener">View in Repo on GitHub!</a>
 `;
 repoData.append(div);

};

backtoRepoButton.addEventListener("click", function (){
  allRepos.classList.remove ("hide");
  repoData.classList.add ("hide");
  backtoRepoButton.classList.add("hide");

filterInput.addEventListener ("input", function (e){
  const search = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerText = search.toLowerCase();

  for (const repo of repos){
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes (lowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
});
