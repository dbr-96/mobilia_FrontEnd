document.addEventListener("DOMContentLoaded", () => {
const button = document.getElementById("searchButton");
const responseContainer = document.getElementById("responseContainer");

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
            const formattedDataContainer = JSON.stringify(data, null, 2);
            responseContainer.textContent = JSON.stringify(data);
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
});
});