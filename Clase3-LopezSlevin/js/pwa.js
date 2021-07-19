self.addEventListener('install', function(event){
    event.respondWith(
        //Try the cache
        caches.match(event.request).then(function(responde){
            //return it if there is a responde, or else fetch again
            return responde || fetch(event.request);
        })
    )
})