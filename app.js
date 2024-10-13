const url = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json';
const stationsList = document.querySelector('.siteList');
const searchKeyword = document.querySelector('#searchKeyword');
const searchBtn = document.querySelector('.btn')
// 宣告空陣列，之後把取得的資料放進去，可重複使用不用再去 url 取得
const stationsData = []

// 取得資料
fetch(url)
    .then((resp) => resp.json())
    .then((stations) => {
        // 展開取得的 array 放進剛剛宣告的空陣列
        stationsData.push(...stations);
        // 調用排序的 finction
        sortAscAvailable(stationsData);
        // 調用新增元素的 function
        addList(stationsData);
    })


// 建立排序 function，將'可租借數量'升冪排序
function sortAscAvailable(el) {
    el.sort((source, target) => target.available_rent_bikes - source.available_rent_bikes)
}

// 建立新增元素 function，新增元素進 HTML
function addList(el) {
    el.forEach(({ sna, available_rent_bikes: available, ar: address }) => {
        const stationName = sna.replace('YouBike2.0_', '');

        const listItem = `
        <li class="list-group-item fs-5">
        <i class="fas fa-bicycle"></i>
        ${stationName} (${available})<br>
        <small class="text-muted">${address}</small>
        </li>
        `
        // 把新元素放到列表最開頭，所以剛剛篩選的升冪會變成降冪
        stationsList.insertAdjacentHTML('beforeend', listItem)
    });
}

// 添加事件監聽器
searchBtn.addEventListener('click', () => {
    // 取得 input 的 value
    const keyWord = searchKeyword.value;

    // 移除 list
    // 方法一
    // while (stationsList.firstChild) {
    //     stationsList.removeChild(stationsList.firstChild)
    // }
    stationsList.innerHTML = ""

    // 宣告常數為篩選後的資料
    const stations = stationsData.filter((sourceAddress) => sourceAddress.ar.includes(keyWord));
    // 調用排序的 finction
    sortAscAvailable(stations);
    // 調用新增元素的 function
    addList(stations);
})
