import { baseUrl } from "../../../assets/js/baseUrl";

export const deleteData = async (id) => {
    fetch(`${baseUrl}/deleteTask`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.ok ? console.log("deleted") : null)
        .catch(err => console.error(err));
};