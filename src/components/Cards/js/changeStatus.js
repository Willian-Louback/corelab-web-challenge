import { baseUrl } from "../../../assets/js/baseUrl";

export const changeStatus = async (favorite, color, id) => {

    fetch(`${baseUrl}/changeTaskStatus`, {
        method: "PATCH",
        body: JSON.stringify({ favorite: favorite, color: color, id: id }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.ok ? console.log("updated") : null)
        .catch(async err => {
            console.error(err);
            console.log("tentando novamente");
            return new Promise((resolve) => setTimeout(resolve, 200))
                .then(() => changeStatus(favorite, color, id));
        });
};