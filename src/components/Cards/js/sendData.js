import { baseUrl } from "../../../assets/js/baseUrl";

export const sendData = (taskName, taskContent, favorite) => {
    return fetch(`${baseUrl}/createTask`, {
        method: "POST",
        body: JSON.stringify(
            {
                taskName: taskName,
                taskContent: taskContent,
                favorite: favorite
            }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.ok ? response.json() : null)
        .catch(err => console.error(err));

};