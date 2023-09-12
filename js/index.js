document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("searchButton");
    const responseContainer = document.getElementById("responseContainer");

    button.addEventListener("click", () => {
        const serverURL = "http://localhost:8080/mobilia/ContractService?contractParam=001&action=getContractByParam";

        fetch(serverURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo completar la solicitud.");
                }
                return response.json();
            })
            .then(data => {
                if (data.success && data["contracts"]?.length > 0) {
                    const contracts = data["contracts"];
                    const tableBody = document.getElementById('table-body');

                    contracts.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${item.contractCode}</td>
                        <td>${item.state}</td>
                        <td>${item.address}</td>
                        <td>${item.type}</td>
                        <td>${item.proprietor.join(', ')}</td>
                        <td>${item.lessee.join(', ')}</td>
                        <td>${item.solidaryDebtor.join(', ')}</td>
                    `;
                        tableBody.appendChild(row);
                    });
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
    });
});