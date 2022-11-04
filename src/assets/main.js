const content = null || document.getElementById('content');

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC-cnbLlplnXA4oc7rR21qzg&part=snippet%2Cid&order=date&maxResults=10'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '909c990944mshb6b757d22c1b970p111f9bjsn2440d4fb5118',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
// función por defecto la reemplazaremos por async y await
// fetch('', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// la reemplazamos por aync y await

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}


// crearemos una función anónima

(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
        <a href="https://youtube.com/watch?v=${video.id.videoId}"target="_blank">
        <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700" style="color:white;">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        </a>
            
        `).slice(0, 4).join('')}
        `;
        content.innerHTML = view;
    } catch (error){
        console.log(error) // lo ideal no es dejar un cosole.log como error
        
     
    }
})();