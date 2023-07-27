const formElement = document.querySelector("form");
const inputElement = document.getElementsByClassName("search-input")[0];
const searchResult = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show_more");

// accesskey
const accesskey = "BKGQ_ZJC1X6WMn-Of6xKVbZp2MzgqT9IvPJFAxqsTp4";


let Page=1;
let inputData="";

async function searchImages() {
  try {
    inputData = document.querySelector(".search-input").value;
    const url = `https://api.unsplash.com/search/photos?page=${Page}&query=${inputData}&client_id=${accesskey}`;
    const response = await fetch(url); //Within the try block, you're using await to wait for the fetch request to complete,
                                       // and then checking if the response is ok using the ok property of the response object.
                                       // If the response is not ok, you're throwing an error with a message that includes the HTTP status code.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // process the data
    console.log(data);
    const results = data.results;
    if (Page === 1) {
      searchResult.innerHTML = "";
    }

    results.map((result) => {
      const imagewrapper = document.createElement("div");
      imagewrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imagewrapper.appendChild(image);
      imagewrapper.appendChild(imageLink);
      searchResult.appendChild(imagewrapper);
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
    // handle the error
  }


  
  // if(Page===1)
  // {
  //   searchResult.innerHTML="";
  // }

  // results.map((result)=>
  // {
  //   const imagewrapper=document.createElement('div');
  //   imagewrapper.classList.add("search-result");
  //   const image=document.createElement('img');
  //   image.src=result.url.small;
  //   image.alt=result.alt_description;
  //   const imageLink=document.createElement("a");
  //   imageLink.href=result.links.html;
  //   imageLink.target="_blank";
  //   imageLink.textContent=result.alt_description;

  //   imagewrapper.appendChild(image);
  //   imagewrapper.appendChild(imageLink);
  //   imagewrapper.appendChild(imagewrapper);
  // })

  Page++;
  if(Page>1)
  {
    showMoreBtn.style.display="block";
  }  
}


formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  Page = 1;
  searchImages();
});

show_more.addEventListener("click", () => {
  searchImages();
});