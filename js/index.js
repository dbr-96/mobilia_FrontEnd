document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("searchButton");
    const responseContainer = document.getElementById("responseContainer");
    const tableBody = document.getElementById('table-body');

    button.addEventListener("click", () => {
        tableBody.innerHTML = '';
        const paramInput = document.getElementById("paramInput");
        const paramValue = paramInput.value.trim(); 
        if (paramValue === "") {
            alert("Por favor, ingrese un valor en el cuadro de búsqueda.");
            return;
        }
        const serverURL = `http://localhost:8080/mobilia/ContractService?contractParam=${paramValue}&action=getContractByParam`;


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
                }else {
                    alert("No se encontraron resultados para la búsqueda.");
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
    });
});