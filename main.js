// Descrizione**
// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
// **Milestone 1** - Creiamo il nostro array di oggetti che rappresentano ciascun post (come da esempio).
// Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// - id del post, numero progressivo da 1 a n
// - nome autore,
// - foto autore,
// - data in formato americano (mm-gg-yyyy: es 05-03-2022),
// - testo del post,
// - immagine (non tutti i post devono avere una immagine),
// - numero di likes.
// *Non è necessario creare date casuali*
// *Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*
// **Milestone 2** - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// **Milestone 3** - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
// ****BONUS**

//  1. Formattare le date in formato italiano (gg/mm/aaaa)
//  2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Olga Demina > OD).
//  3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=172",
        "author": {
            "name": "Tizio Rosso",
            "image": "https://unsplash.it/300/300?image=16"
        },
        "likes": 50,
        "created": "2021-06-30"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=173",
        "author": {
            "name": "Tizio Caio",
            "image": "https://unsplash.it/300/300?image=17"
        },
        "likes": 46,
        "created": "2021-06-01"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=174",
        "author": {
            "name": "Sempronio Rossi",
            "image": "https://unsplash.it/300/300?image=18"
        },
        "likes": 14,
        "created": "2021-06-20"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=175",
        "author": {
            "name": "Caio Rossi",
            "image": "https://unsplash.it/300/300?image=19"
        },
        "likes": 40,
        "created": "2021-06-22"
    },
    {
        "id": 6,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=176",
        "author": {
            "name": "Tizio Sempronio",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 120,
        "created": "2021-06-21"
    },
];

// post di esempio/template, da togliere/commentare e generare da JS
// <div class="post">
//     <div class="post__header">
//         <div class="post-meta">                    
//             <div class="post-meta__icon">
//                 <img class="profile-pic" src="https://unsplash.it/300/300?image=15" alt="Phil Mangione">                    
//             </div>
//             <div class="post-meta__data">
//                 <div class="post-meta__author">Phil Mangione</div>
//                 <div class="post-meta__time">4 mesi fa</div>
//             </div>                    
//         </div>
//     </div>
//     <div class="post__text">Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.</div>
//     <div class="post__image">
//         <img src="https://unsplash.it/600/300?image=171" alt="">
//     </div>
//     <div class="post__footer">
//         <div class="likes js-likes">
//             <div class="likes__cta">
//                 <a class="like-button  js-like-button" href="#" data-postid="1">
//                     <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
//                     <span class="like-button__label">Mi Piace</span>
//                 </a>
//             </div>
//             <div class="likes__counter">
//                 Piace a <b id="like-counter-1" class="js-likes-counter">80</b> persone
//             </div>
//         </div> 
//     </div>            
// </div>


const postContainer = document.getElementById(`container`);

posts.forEach((element) => {
    postContainer.append(buildPost(element));
});

// FUNCTIONS

function buildPost(element) {

    const post = document.createElement("div");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${element.author.name}</div>
                    <div class="post-meta__time">${element.created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${element.content}</div>
        <div class="post__image">
            <img src="${element.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${element.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-1" class="js-likes-counter">${element.likes}</b> persone
                </div>
            </div> 
        </div>`;
        

    return post;

}