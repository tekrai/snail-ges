import {computed, ref} from "vue";
import {defineStore} from "pinia";
import axios from "axios";

export const useProfileStore = defineStore('profile', () => {

    const profile = ref({
        loading: true,
        data: {
            "emergency_contact": {
                "emergency_id": null,
                "type": null,
                "type_details": null,
                "firstname": null,
                "name": null,
                "telephone": null,
                "mobile": null,
                "work_phone": null
            },
        }
    });

    function fetchData() {

        axios.request({
            method: 'get',
            url: `https://api.kordis.fr/me/profile`,
            headers: {
                'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
            },
            responseType: "json"
        })
        .then((response) => {
            profile.value.data = response.data.result;
            profile.value.loading = false
        });
    }

    const fullName = computed(() => {
        return `${profile.value.data.firstname} ${profile.value.data.name}`;
    });

    const avatarUrl = computed(() => {
        return profile.value.data._links.photo.href;
    });

    return {
        profile,
        fullName,
        avatarUrl,
        fetchData,
    }

});

