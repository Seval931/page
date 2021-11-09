let price=0;

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

const callback = (entris)=>{
    let itemData=[];
    itemData = JSON.parse(entris);
    console.log(itemData[0])
    fillDataOnScreen(itemData);
}



httpGetAsync("https://frontend-interview-api-sepia.vercel.app/api/items", callback);


const fillDataOnScreen=(itemData)=>{

    
    showImages(itemData[0]['images']);

    setNameAndPrice(itemData[0]);

    createDetailsTabs(itemData[0]["details"])

}


function showImages(itemImages){
    if(itemImages.length>0){

        let productImages=itemImages;

        document.querySelector("#selected_image").innerHTML=`<img src="${productImages[Object.keys(productImages)[0]]['x1']}" alt="Selected image ${productImages[Object.keys(productImages)[0]]['id']}">`;

        //miniatures
        for(element in productImages) {
            let elementHolder = itemImages[element];
            let newMiniature= document.createElement("button");
            newMiniature.classList.add('my-col-3');
            newMiniature.innerHTML=`<img src="${elementHolder['x1']}" alt="Image ${elementHolder['id']}">`
            document.querySelector("#miniature_list").appendChild(newMiniature);
        };
        document.querySelector("#miniature_list button:nth-child(1)").classList.add("selected");
    }
}


function setNameAndPrice(itemData){
    price= itemData['price'];
    document.querySelector("#product_name h1").innerHTML= (itemData['title']===undefined || itemData['title']===null)? "Product":itemData['title'];
    if((itemData['description']===undefined || itemData['description']===null)){
        document.querySelector("#product_name h2").classList.add('hide-element');
    } else{
        document.querySelector("#product_name h2").innerHTML= itemData['description'];
    }
    document.querySelector("#product_base_price h1").innerHTML="$"+price;
}


function createDetailsTabs(details){
    if(details===undefined || details.length==0) return;

    let detailsTabsContainer=document.querySelector("#details");
    
    let tabButtonContainer= document.createElement('div');
    tabButtonContainer.classList.add("tab-button-container");
    for(element of details){
        let tabButton=document.createElement("button");
        tabButton.innerHTML=`<p>${element['name']}</p>`;
        tabButton.setAttribute("name",element['name'])

        tabButton.addEventListener("click",function (event){
            switchDetails(event.currentTarget.getAttribute("name"))
            event.currentTarget.classList.add("active");
        });
        tabButtonContainer.appendChild(tabButton)


        let tabBody= document.createElement("div");
        tabBody.classList.add("tab-body");
        tabBody.id=element['name'];
        tabBody.innerHTML=`<p> ${element['description']} </p>`;
        detailsTabsContainer.appendChild(tabBody);
    }

    detailsTabsContainer.prepend(tabButtonContainer);
}

function switchDetails(targetId){
    let tabs=document.getElementsByClassName("tab-body");
    document.querySelector(`#${targetId}`).classList.add("visible")
}