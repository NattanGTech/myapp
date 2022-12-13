export const getAll = async () => {
    const response = await fetch(
        'http://localhost:4444/pokedex/pokemon/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        }
    )
    const pokemons = await response.json()
    return pokemons
}

export const getTypes = async () => {
    const response = await fetch(
        'http://localhost:4444/pokedex/types/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        }
    )
    const types = await response.json()
    return types
}

export const addPokedex = async (pokemon) => {
    await fetch(
        'http://localhost:4444/pokedex/insert', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(pokemon)
        }
    )
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}

export const getPokedex = async () => {
    const response = await fetch(
        'http://localhost:4444/pokedex/pokedex/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        }
    )
    const pokemons = await response.json()
    return pokemons
}

export const removePokedex = async (pokemon) => {
    await fetch(
        'http://localhost:4444/pokedex/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(pokemon)
        }
    )
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}

export const Supprimer = async (pokemon) => {
    await fetch(
        'http://localhost:4444/pokemon/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"name" : pokemon.name})
        }
    )
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}

export const Modifier = async (pokemon) => {
    await fetch(
        'http://localhost:4444/pokemon/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(pokemon)
        }
    )
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}

export const Ajouter = async (pokemon) => {
    await fetch(
        'http://localhost:4444/pokemon/insert', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(pokemon)
        }
    )
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}