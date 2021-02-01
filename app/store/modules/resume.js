import { Resume } from '../data/resume';
import { ResumeApiInstance } from '../../api/resume_api';

const state = {
    resume: {}
}

const getters = {
    RESUME: state => {
        return state.resume;
    }
}

const mutations = {
    SET_RESUME: (state, payload) => {
        state.resume = new Resume(payload.value);
    },
    SET_EMPTY_RESUME: (state, payload) => {
        state.resume = {};
    },
    SET_FIRST_NAME: (state, payload) => {
        state.resume.firstName = payload.value;
    },
    SET_LAST_NAME: (state, payload) => {
        state.resume.lastName = payload.value;
    },
    SET_PATRONYMIC: (state, payload) => {
        state.resume.patronymic = payload.value;
    },
    SET_GENDER: (state, payload) => {
        state.resume.gender = payload.value;
    },
    SET_BIRTHDAY: (state, payload) => {
        state.resume.birthday = payload.value;
    },
    SET_COUNTRY: (state, payload) => {
        state.resume.country = payload.value;
    },
    SET_CITY: (state, payload) => {
        state.resume.city = payload.value;
    },
    SET_PHOTO: (state, payload) => {
        state.resume.photo = payload.value;
    },
    SET_EXPERIENCE_LEVEL: (state, payload) => {
        state.resume.experienceLevel = payload.value;
    },
    ADD_WORKPLACE: (state, payload) => {
        payload.value.id = Symbol();
        state.resume.workplaces.push(payload.value);
    },
    SET_WORKPLACES: (state, payload) => {
        payload.value.forEach(el => {
            el.id = Symbol();
        });
        state.resume.workplaces = payload.value;
    },
    REMOVE_WORKPLACE: (state, payload) => {
        let index = state.resume.workplaces.findIndex(el => el.id === payload.value);
        state.resume.workplaces.splice(index, 1);
    },
    SET_EDUCATION_LEVEL: (state, payload) => {
        state.resume.educationLevel = payload.value;
    },
    ADD_EDUCATION: (state, payload) => {
        payload.value.id = Symbol();
        state.resume.educations.push(payload.value);
    },
    SET_EDUCATIONS: (state, payload) => {
        payload.value.forEach(el => {
            el.id = Symbol();
        })
        state.resume.educations = payload.value;
    },
    REMOVE_EDUCATION: (state, payload) => {
        let index = state.resume.educations.findIndex(el => el.id === payload.value);
        state.resume.educations.splice(index, 1);
    },
    SET_PHONE_NUMBER: (state, payload) => {
        state.resume.phoneNumber = payload.value;
    },
    SET_EMAIL: (state, payload) => {
        state.resume.email = payload.value;
    }, 
    SET_SPHERE: (state, payload) => {
        state.resume.sphere = payload.value;
    },
    SET_POST: (state, payload) => {
        state.resume.desiredPost = payload.value;
    },
    SET_SALARY_MIN: (state, payload) => {
        state.resume.salaryMin = payload.value;
    },
    SET_SALARY_MAX: (state, payload) => {
        state.resume.salaryMax = payload.value;
    },
    SET_SKILLS: (state, payload) => {
        state.resume.skills = payload.value;
    }, 
    SET_PERSONAL_QUALITIES: (state, payload) => {
        state.resume.personalQualities = payload.value;
    },
    SET_ABOUT: (state, payload) => {
        state.resume.aboutMyself = payload.value;
    },
    SET_RESUME_STATUS: (state, payload) => {
        state.resume.status = payload.value;
    }
}

const actions = {
    LOAD_RESUME: (context, {id}) => {
        ResumeApiInstance.getResume(id, (response) => {
            if (response.status === 200) {
                let resumeData = JSON.parse(response.data);
                if (resumeData.status === 'success') {
                    context.commit('SET_RESUME', {
                        value: resumeData.data
                    });
                }
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}