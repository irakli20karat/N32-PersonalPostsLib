const searchSpecific = document.getElementById("searchSpecific");
const searchAll = document.getElementById("searchAll");
const idInput = document.getElementById("idInput");
const resultsContainer = document.getElementsByClassName("body-container")[0];
const url = `https://jsonplaceholder.typicode.com/posts/`;

const resultCard = (data) => `
    <div class="post-card">
        <p class="post-title">(${data.id}) ${data.title}</p>
        <p class="post-body">${data.body}</p>
    </div>
`;

const display = (data) => {
    resultsContainer.innerHTML = "";
    data.forEach(e => {
        resultsContainer.innerHTML += resultCard(e);
    });
}

const getData = async (id) => {
    resultsContainer.innerHTML = "<p class='body-plain-text'>Loading...</p>";
    const result = await fetch(`${url}${id}`);
    if (result.status != 200) {
        resultsContainer.innerHTML = "<p class='body-plain-text'>Couldn't load!</p>";
        return;
    }
    const data = await result.json();
    return data;
}

searchSpecific.addEventListener("click", async () => {
    const id = idInput.value;
    if (id) {
        let data = await getData(id);
        data ? display([data]) : 0;
    }
});

searchAll.addEventListener("click", async () => {
    let data = await getData("");
    data ? display(data) : 0;
});