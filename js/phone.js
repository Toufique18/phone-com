const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    //console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 6 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 6)
    }

    phones.forEach(phone => {
        //console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl border-2 border-gray-400`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10"><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <div class="text-center text-neutral-700 text-[25px] font-bold font-['Poppins']">$999</div>
          <div class="card-actions justify-end">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
      </div>`;
        phoneContainer.appendChild(phoneCard);
    })
    toggleloadingSpinner(false);
}


const handleShowDetails = async (id) => {
    //console.log('hi am here', id)

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showAllDetails(phone);
}

const showAllDetails = (phone) => {
    show_detail_modal.showModal()

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <p><span class="font-bold text-sm">Storage :</span><span class="text-sm">${phone?.mainFeatures?.storage}</span></p>
    <p><span class="font-bold text-sm">Display Size :</span ><span class="text-sm">${phone?.mainFeatures?.displaySize}</span></p>
    <p><span class="font-bold text-sm">Chipset :</span><span class="text-sm">${phone?.
            mainFeatures?.chipSet}</span></p>
    <p><span class="font-bold text-sm">Memory :</span><span class="text-sm">${phone?.
        mainFeatures?.memory}</span></p>
    <p><span class="font-bold text-sm">Slug :</span><span class="text-sm">${phone?.slug}</span></p>
    <p><span class="font-bold text-sm">Release data :</span><span class="text-sm">${phone?.releaseDate}</span></p>
    <p><span class="font-bold text-sm">Brand :</span><span class="text-sm">${phone?.brand}</span></p>
    <p><span class="font-bold text-sm">Gps :</span><span class="text-sm">${phone?.others?.GPS}</span></p>
        
    `

    //console.log(phone);
}


const handleSearch = (isShowAll) => {
    toggleloadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleloadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();
