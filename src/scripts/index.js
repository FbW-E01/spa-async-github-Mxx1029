
class GitHubWidget {
    constructor(container) {
        this.container = container;
    }

    init() {
        const title = document.createElement("h2");
        title.innerText = "GitHub Username Widget";
        this.container.appendChild(title);

        const divInputWrapper = document.createElement("div");
        divInputWrapper.classList.add("form-group", "col-auto");
        this.container.appendChild(divInputWrapper);

        const input = document.createElement("input");
        input.classList.add("form-control", "username");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Github username");
        divInputWrapper.appendChild(input);

        const divButtonWrapper = document.createElement("div");
        divButtonWrapper.classList.add("form-group", "col-auto");
        this.container.appendChild(divButtonWrapper);

        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "mb-3");
        button.setAttribute("type", "submit");
        button.innerText = "Submit";
        button.addEventListener("click", e => this.fetchUserRepos(e));
        divButtonWrapper.appendChild(button);

    }

    fetchUserRepos(e) {
        const usernameInput = document.querySelector(".username");
        console.log(usernameInput.value);

        fetch(`https://api.github.com/users/${usernameInput.value}/repos`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("Response was not ok");
                }
            })
            .then(result => {
                this.displayRepos(result)
            })
            .catch(error => console.warn(error))
        
    }

    displayRepos(repositories) {
        repositories.forEach(repo => {
            const repoDetails = document.createElement("div");
            repoDetails.style.border = "1px solid grey";
            repoDetails.style.padding = "1rem";
            repoDetails.style.margin = "2px";
            repoDetails.classList.add("repoDetails", "rounded");
            repoDetails.innerHTML = `<a href="${repo.html_url}">${repo.name}</a>`;
            this.container.appendChild(repoDetails);

            const wrapperDiv = document.createElement("div");
            wrapperDiv.classList.add("d-flex", "justify-content-between");
            repoDetails.appendChild(wrapperDiv);

            const repoDescription = document.createElement("p");
            repoDescription.style.width = "70%";
            repoDescription.innerText = repo.description ? `${repo.description}` : "" ;
            wrapperDiv.appendChild(repoDescription);

            const repoDate = document.createElement("p");
            repoDate.style.width = "20%";
            repoDate.classList.add("text-end")
            repoDate.innerText = moment(repo.created_at).fromNow();
            wrapperDiv.appendChild(repoDate);
            
        })
    }

}

const mainContainer = document.querySelector(".mainContainer");
mainContainer.classList.add("row", "g-1");

const widget = new GitHubWidget(mainContainer);

widget.init();

// in the second widget it's not working, I don't understand why and would love to know why

const secondContainer = document.createElement("div");
document.body.appendChild(secondContainer);
secondContainer.classList.add("row", "g-1");


const widget2 = new GitHubWidget(secondContainer);

widget2.init();
