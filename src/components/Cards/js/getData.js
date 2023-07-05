import { baseUrl } from "../../../assets/js/baseUrl";

export const getData = async () => {
    try{
        const response = await fetch(`${baseUrl}/getAllTasks`, {
            method: "GET"
        });

        if(response.ok){
            const data = await response.json();
            return data;
        }
    } catch(err){
        console.error(err);
        console.log("tentando novamente");
        return new Promise((resolve) => setTimeout(resolve, 200))
            .then(() => getData());
    }
};