self.addEventListener('push', event =>{
console.log('push event,', event);
const title = 'Pushed';
event.waitUntil(
    self.registration.showNotification(title,{
        body:'A message',
        icon:"../images/marviskid.jpg",
        tag:"my-tag"

    }));

});