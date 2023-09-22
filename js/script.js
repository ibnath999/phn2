// complimentary variable
const searchField = document.getElementById('search-field');
const noResult = document.getElementById('no-result').style;
const containerDisplay = document.getElementById('card-container');
const details = document.getElementById('details-container');

searchField.addEventListener('keyup',(event)=>{
    if (event.key=='Enter') {
        loadData();
    }
})

// fetch data according to search
const loadData = () => {
    containerDisplay.textContent = '';
    const searchText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText!=''?searchText:null}`;
    fetch(url)
    .then(response => response.json())
    .then(dataSet => {
        if (dataSet.status) {
            noResult.display='none';
            createCard(dataSet);
        } else {
            noResult.display='block';
        }
    })
};

// create Cards and show
const createCard = (dataArray) => {
    const dataSet = dataArray.data;
    // console.log(dataSet);

    dataSet.slice(0,20).forEach(data => {
        // console.log(data.slug);
        const card = document.createElement('div');
        card.classList.add('col-12');
        card.classList.add('col-md-4');

        card.innerHTML = `
            <div class="card border-1 rounded-1 pb-3" style="height: 350px;">
                <div class="card-img-top p-2 text-center" style="height: 200px;">
                    <img src="${data.image}" alt="..." style="max-width: 80%; height: 100%;">
                </div>
                <div class="mt-auto px-4 pb-2">
                    <h6 class="card-title">${data.phone_name}</h6>
                    <p class="card-text">${data.brand}</p>
                    <button onclick="loadDetails('${data.slug}')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">details</button>
                </div>
            </div>
        `
        containerDisplay.appendChild(card);
    });
}

// fetch details data of clicked items
const loadDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    // console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(phone => showDetails(phone.data))
}

// show details data of clicked items
const showDetails = (data) => {
    details.textContent='';
    // console.log(data);
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    modalContent.innerHTML=`
        <div class="modal-header pb-0">
            <div>
            <h5 class="modal-title fs-3" id="exampleModalLabel">${data.name}</h5>
            <p class="fs-6 text-secondary">${data.releaseDate!=''?data.releaseDate:"No release date found"}</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body card border-0 pb-3">
            <div class="card-img-top p-2 text-center" style="height: 200px;">
                <img src="${data.image}" alt="..." style="max-width: 80%; height: 100%;">
            </div>
            <div id="features" class="mt-auto p-4">
                <h6 class="fs-5 mb-2">Main Features :</h6>
                <div class="ps-2 d-flex flex-wrap">
                    <p class="fs-6 fw-bold" style="flex-basis:30%">Chipset:</p><p class="fs-6" style="flex-basis:70%">${data.mainFeatures.chipset}</p>
                    <p class="fs-6 fw-bold" style="flex-basis:30%">Display size:</p><p class="fs-6" style="flex-basis:70%">${data.mainFeatures.displaySize}</p>
                    <p class="fs-6 fw-bold" style="flex-basis:30%">Memory:</p><p class="fs-6" style="flex-basis:70%">${data.mainFeatures.memory}</p>
                    <p class="fs-6 fw-bold" style="flex-basis:30%">Sensors:</p><p class="fs-6" style="flex-basis:70%">${data.mainFeatures.sensors.join('\n,')}</p>
                    <p class="fs-6 fw-bold" style="flex-basis:30%">Storage:</p><p class="fs-6" style="flex-basis:70%">${data.mainFeatures.storage}</p>
                </div>
            </div>
        </div>
    `;
    details.appendChild(modalContent);
    data.others!=undefined?showOthers(data.others):'';
}

// show others data while it is not empty 
const showOthers = (others) => {
    const features = document.getElementById('features');
    const othersDiv = document.createElement('div');
    othersDiv.innerHTML=`
        <h6 class="fs-5 mt-4 mb-2">Others :</h6>
        <div class="ps-2 d-flex flex-wrap">
            <p class="fs-6 fw-bold" style="flex-basis:30%">Bluetooth:</p><p class="fs-6" style="flex-basis:70%">${others.Bluetooth}</p>
            <p class="fs-6 fw-bold" style="flex-basis:30%">GPS:</p><p class="fs-6" style="flex-basis:70%">${others.GPS}</p>
            <p class="fs-6 fw-bold" style="flex-basis:30%">NFC:</p><p class="fs-6" style="flex-basis:70%">${others.NFC}</p>
            <p class="fs-6 fw-bold" style="flex-basis:30%">Radio:</p><p class="fs-6" style="flex-basis:70%">${others.Radio}</p>
            <p class="fs-6 fw-bold" style="flex-basis:30%">USB:</p><p class="fs-6" style="flex-basis:70%">${others.USB}</p>
            <p class="fs-6 fw-bold" style="flex-basis:30%">WLAN:</p><p class="fs-6" style="flex-basis:70%">${others.WLAN}</p>
        </div>
    `
    features.appendChild(othersDiv);
}
