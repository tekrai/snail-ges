import {defineStore} from "pinia";
import axios from "axios";
import {computed, ref} from "vue";

export const usePeriodsStore = defineStore('periods', () => {



    const periods = ref({
        loading: true,
        data: [],
    });

    function fetchData() {
        axios.request({
            method: 'get',
            url: `https://api.kordis.fr/me/studentPeriods`,
            headers: {
                'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
            },
            responseType: "json"
        })
        .then((response) => {
            periods.value.data = response.data.result;
            periods.value.loading = false;
        });
    }

    const years = computed(() => {
        const uniqueYearIds = new Set();

        periods.value.data.forEach(item => {
            uniqueYearIds.add(item.year_id);
        });

        return [...uniqueYearIds];
    });

    const options = computed(() => {
        return periods.value.data.map((period, index) => {
           return {
               key: index,
               year: period.year_id,
               trimester: period.trimester_id,
               label: `${period.year} - ${period.school} - ${period.promotion} - ${period.trimester}`
           }
        });
    })



    return {
        periods,
        years,
        options,
        fetchData
    };

});
