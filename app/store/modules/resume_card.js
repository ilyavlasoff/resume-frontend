import {ResumeApiInstance} from '../../api/resume_api';

const state = {
    resume_card: []
}

const getters = {
    RESUME_CARD: state => {
        return state.resume_card;
    },
    RESUME_CARD_FILTER: state => status => {
        return state.resume_card.filter(item => item.status === status);
    }
}

const mutations = {
    SET_STATUS: (state, {id, status}) => {
        let item = state.resume_card.find(item => item.id === id);
        item.status = status;
    },
    SET_RESUME_CARD_LIST: (state, payload) => {
        state.resume_card = payload;
    },
    CLEAR_CARD_LIST: (state, payload) => {
        state.resume_card = [];
    }
}

const actions = {
    UPDATE_STATUS: (context, {id, status}) => {
    },
    LOAD_LIST: (context) => {
        ResumeApiInstance.getResumeList(
            (response) => {
                const data = JSON.parse(response.data);
                if (data.status === 'success') {
                    context.commit('SET_RESUME_CARD_LIST', data.data);
                } else {
                    console.log('Error');
                }
            }, (error) => {
                console.log(error);
            }
        )
    },
    LOAD_FILTER_LIST: () => {
        
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}