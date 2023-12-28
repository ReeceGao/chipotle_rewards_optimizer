const rewardsURL =
    "https://services.chipotle.com/rewardstore/v2/rewardstore/web";

const rewardsHeader = new Headers({
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": "937624593c7048759a9657d6cb705a2b",
    Authorization:
        "Bearer eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.HW0YW-NjXJD0EjzMJ3ugJEUMLfwsl-nUv3uoqb7KPcBsMheEE3sKxg.K5fH3BVHn1P0Qj9DAGZT3A.KWS4d8eWa8QL2NHH7vGM2kvioWWQv2OFyoKIOBXkkH4sUG-RayyLsdr0P8IHHiheDKvplTMDTtk7SwIlm8CMxFw842Ef8k8pZtwwbUJd22kyyGwErZO3O1BEDTv9xIYPBO3YkmxC1UW7YGxeD5F0L3r1SMOcyK9fAPXb0RVS5Nz_RoBLXPH7BFZ2vMMfG9N9R1JrcTWRlGnttk25_Kak5Ty1aWqLSXgOB6mZpWWPwxusHmM5I_2Qlh9rumBpI3vmLvTOIkbe_2IXGtkpyTsRt6W6Vak0jl7NJgOuZbJWW9XaZjOrf8sCiwn1e6G3ZhSm6vsfNfeK1XcnvYufkBWIKyeKNaVyrtSgbCP5CwhlsYPfeDwasnK5ZZVjywHFK2xuPgo8K_cHWan6gH3FhxhISLgbCgy4wH7CkOapVdKyv0G9j1_VhPTG2MG2lt_YuCVcbG-tPplCnWfAYGU_7xneyxig0CrxdvDoRLPtFOFWdrmP9wy7QC1pwgA62U50cTkE.bB99W_ueCz5n0kixl24zfw",
});
const rewardsOptions = {
    method: "GET",
    headers: rewardsHeader,
};
fetch(rewardsURL, rewardsOptions)
    .then((text) => text.json())
    .then((res) => {
        console.log(res);
    });
