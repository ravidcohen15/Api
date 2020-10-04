let output = new Array
let teamBlock = document.getElementById('teamRender')
let gameBlock = document.getElementById('gameRender')
let input = document.getElementById('src')
let click = document.getElementById('click')

click.addEventListener('click', (event) => {
    const searchName = input.value.trim();
    if (searchName.length > 0) {
        return searchTeam(searchName)
    }
})

async function getData() {
    const response = await fetch("https://www.balldontlie.io/api/v1/teams")
    const data = await response.json();

    console.log(data);

    return data;
}

getData()
    .then((teams) => {
        (teams.data).forEach(({
            id,
            full_name
        }) => {
            // console.log(data)
            output.push({
                id: id,
                name: full_name
            })
        })
    }).then(data => renderTeam())


function getGame(id) {
    fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2020&seasons[]=2019&per_page=100&team_ids[]=${id}`).then(response => response.json()).then(game => {
        gameBlock.innerHTML = ' '
        game.data.forEach((game) => {
            gameBlock.
            innerHTML += `<ul><li>Date: ${game.date} </li><li>  ${game.home_team.full_name}  </li><li> ${game.home_team_score}  :  ${game.visitor_team_score} </li><li> ${game.visitor_team.full_name} </li> <br>`
        })
    })
}


function searchTeam(searchName) {

    const relevantTeam = output.filter(({
        name,
    }) => {
        return name.toLowerCase().includes(searchName.toLowerCase())

    })
    relevantTeam.forEach(data => getGame(data.id))

}

function renderTeam() {
    output.forEach(data =>
        teamBlock.innerHTML += `<div>${data.name}</div>`
    )
}