import { baseUrl } from "../../../assets/js/baseUrl";

export const updateData = async (taskName, taskContent, id) => {
    fetch(`${baseUrl}/updateTask`, {
        method: "PATCH",
        body: JSON.stringify(
            {
                taskName: taskName,
                taskContent: taskContent,
                id: id
            }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.ok ? console.log("updated") : null)
        .catch(err => console.error(err));
};