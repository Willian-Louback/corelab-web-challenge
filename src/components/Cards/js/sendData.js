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
        .catch(err => {
            console.error(err);
            alert("Houve um erro no servidor tente novamente!"); // Preciso fazer um loop para fazer uma new Promise
        });

};