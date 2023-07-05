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
        .catch(async err => {
            console.error(err);
            console.log("tentando novamente");
            return new Promise((resolve) => setTimeout(resolve, 200))
                .then(() => deleteData(id));
        });
};