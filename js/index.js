document.addEventListener("DOMContentLoaded", () => {
const button = document.getElementById("searchButton");

button.addEventListener("click", () => {
    const serverURL = "http://localhost:8080/mobilia/ContractService?contractParam=CONTRATO001&action=getContractByParam";

    fetch(serverURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo completar la solicitud.");
            }
            return response.json(); 
        })
        .then(data => {
            console.log("Respuesta del servidor:", data);
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
});
});