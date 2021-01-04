import * as axios from 'axios'

// -- State
const state = {
    data: ['']
}

const getters = {
    // -- Getter que devolve o array data do state
    getGeneros: state => {
        return state.data
    }
}

const actions = {
    // -- Action que faz um ajax de consulta à API que devolve uma lista de livros
    get({ commit }) {
        console.log("1");
        axios.get('http://localhost:5000/generos').then(res => {
            console.log("1");
            if (res.data.status == true) {
                console.log("2");
                // -- Invoca a mutation setData para atribuir a resposta ao state
                commit('setData', res.data.genero)
            }
        })
    } /* ,

// -- Action que faz um ajax à API enviando um formData com os dados para inserir o livro
insert({ dispatch }, params) {

    // -- Criar o formData
    let body = new FormData();
    body.set('titulo', params.titulo)
    body.set('categoria', params.categoria)

    // -- Devolve o pedido como uma promise
    return axios.post('http://localhost/SIR1920/API/addBook.php', body).then(res => {

        // -- Se não receber erros invoca a action GET para voltar a pedir uma lista atualizada dos livros
        if (!res.data.errors) dispatch('get')

        return !res.data.errors
    })
} */
}

const mutations = {
    // -- Mutation setData que recebe dados por parametro e os atribui ao state
    setData(state, data) {
        state.data = data
    }
}

export default {
    getters,
    mutations,
    actions,
    state
}
