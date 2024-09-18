// ! ==== Normal Code ====

let toggleButton = document.getElementById("toggleButton");
// console.log(toggleButton);

let hide_items = document.getElementsByClassName("hide_items");

// console.log(hide_items);

toggleButton.addEventListener("click", () => {
    // console.log("clicking...");

    for (const val of hide_items) {
        // console.log(val);
        val.classList.toggle("hidden_content");
    }
});

/*
    * 1. add()
    * 2. remove()
    * 3. replace()
    * 4. toggle()
    * 5. contains()
*/

// ! ==== API Integration ====

/**
 * ! Google Cloud:
 *    ~ a. Search Google Cloud
 *    ~ b. click on first link
 *    ~ c. click on console
 *    ~ d. click on I agree
 *    ~ e. Agree and continue
 *    ~ e. click on select a project
 *    ~ f. create on new project
 *    ~ g. Project Name "QSpider-Javascript"
 *    ~ h. select same project
 *    ~ i. click on navigation menu
 *    ~ j. hover on API 
 *    ~ k. click on library
 *    ~ . YouTube Data API v3
 *    ~ l. click on enable
 *    ~ m. create credentials
 *    ~ n. choose public data
 *    ~ o. click on next
 *    ~ p. copy the API key
 *    ~ q. paste in the variable in the form of String.
 *    ~ r. click on done
 * */

// ! YouTube Data API:

/**
 *  ~ YouTube Data API 
 *  ~ click on references
 *  ~ 
**/

let api_key = "AIzaSyABvs1H8i4zGS5zFJRxpYV6Xu7QvVRlqIU";

let search_http = "https://www.googleapis.com/youtube/v3/search?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

let callYoutubeDataAPI = async query => {
    console.log(query); // user_input
    let searchParams = new URLSearchParams({
        key: api_key,
        part: "snippet",
        q: query,
        maxResults: 5,
        type: "video",
        regionCode: "IN"
    });

    let res = await fetch(search_http + searchParams);
    // console.log(res);
    let data = await res.json(); // convert the response into JSON format Readable Stream.
    // console.log(data);

    data.items.map(item => {
        console.log(item); // videoLink, channelId, channelTitle, description, title, thumbnailLink.
        getChannelIcon(item); // call function to get channel icon.
    });
};

// ? to get channel icon based on channel ID
let getChannelIcon = async video_data => {
    // console.log(video_data);

    let channelParams = new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId
    });

    let res = await fetch(channel_http + channelParams);
    let data = await res.json();
    // console.log(data);

    video_data.channelIconImage = data.items[0].snippet.thumbnails.default.url;

    appendVideoInToContainer(video_data);
};

let main_content = document.getElementById("main_content");
main_content.innerHTML = "";

// ! To display the video
let appendVideoInToContainer = video_data => {
    console.log(video_data);

    let { snippet, channelIconImage, id: { videoId } } = video_data;
    console.log(snippet);
    console.log(channelIconImage);
    console.log(videoId);

    main_content.innerHTML += `
    <a href="https://www.youtube.com/watch?v=${videoId}";
        <main class="video_container">
        
            <article class="imageBox">
                <img src="${snippet.thumbnails.medium.url}" alt="imageBox">
            </article>
            
            <article class="infoBox">
                <div>
                    <img src="${channelIconImage}" alt="channelProfile">
                </div>

                <div>
                    <p>${snippet.title}</p>
                    <p class="channelName">${snippet.channelTitle}</p>
                </div>
            </article>

        </main>
    </a>
    `;
};

let search_button = document.getElementById("search_button");

search_button.addEventListener("click", () => {
    let user_input = document.getElementById("user_input").value;
    // console.log(user_input);
    callYoutubeDataAPI(user_input);
});