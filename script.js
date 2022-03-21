 const poke_container=document.getElementById('poke-container');
 
 //This will display the number of pokemon
 const pokemon_count=252;

 //Use the list array for the filter search function
 const list=[];

 //trying to  get the SearchBar
 let searchBar=document.getElementById('searchBar')

//Event listener for the search-bar
 searchBar.addEventListener('input', (e)=> filterData(e.target.value))

 //Card colors
 const colors={
   fire:'#F08030',
   grass: '#78C850',
   electric: '#F8D030',
   water: '#6890F0',
   ground: '#E0C068',
   rock: '#B8A038',
   fairy: '#EE99AC',
   poison: '#A040A0',
   bug: '#A8B820',
   dragon: '#7038F8',
   psychic: '#F85888',
   flying: '#A890F0',
   fighting: '#C03028',
   normal: '#A8A878',
   ice:'#C1D2D0',
   dark:'#705848',
   ghost:'#705898',
   steel:'#B8B8D0'
 }

 
  
//this will return an array of colors property names
const main_types=Object.keys(colors)

 const fetchPokemons=async()=>{
   for(let i=1; i< pokemon_count; i++){
      //use await on the getPokemon
      await getPokemon(i)
   }
 }


 //This function is to fetc data
 const getPokemon=async(id)=>{
   try{
   const url=`https://pokeapi.co/api/v2/pokemon/${id}`
   const res=await fetch(url)
   const data=await res.json()
 // calling createPokemonCard to display all cards on the screen
 createPokemonCard(data)

   }
   catch(error){
     console.error(error);
   }
  }

  //This will create the Pokemon cards
 const createPokemonCard=(pokemon) =>{
   //pokemon div we will append later
  const pokemonEl=document.createElement('div')
  //add the class pokemon to pokemonEl
  pokemonEl.classList.add('pokemon')
 
  //push values into list array
  list.push(pokemonEl)

  // (Object.values(pokemon.name)).join('')
   
   //use destructring to access types
   const {types}=pokemon;

  //we use a map to get the type names
   const mainType=types.map(type =>type.type.name)
 
   //use a ternary operator to get the second type and if it doesn't exist make it empty
   const secondaryType=mainType[1]? mainType[1] :'' ;

   //use find on main_types which contains colors propeties if any of the mainTypes match it
   const type=main_types.find(type => mainType[0].indexOf(type) > -1)
  
  //we will use this later for the background color of all the cards
   const color=colors[type]
   
   //If the secondary type is null make it display none and if it isn't the case, give the secondary type a background color
    const sec=document.querySelectorAll('span.second-type').forEach(function(el,index){
     if(el.childNodes.length ===0){
        el.style.display='none';
     }
      //  will give each secondary Type a background color
      el.style.backgroundColor=colors[el.textContent]
  });

 
    
  //This will give the cards the color based on primary type
   pokemonEl.style.backgroundColor=color
 
 //This will display the contents within the card
   const pokemonInnerHTML=`
  <div class="img-container">
    <img src="${pokemon.sprites.front_default}" alt="">
 </div>
 <div class="info">
   <span class="number">${pokemon.id.toString().padStart(3,'0')}</span>
   <h3 class="name">${pokemon.name}</h3>
   <small class="type">Type:<span class="primary-type">${mainType[0]}</span> <span class="second-type">${secondaryType }</span></small>
 </div>
  `
  
  //where add the text about into the pokemonEl element
  pokemonEl.innerHTML=pokemonInnerHTML;

  //We append the poke_container to pokemonEl
  poke_container.appendChild(pokemonEl)
 }


 

 //Filter search for a pokemon
 function filterData(searchTerm){
   list.forEach(item=>{
     if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())){
       item.classList.remove('hide')
     }else{
       item.classList.add('hide')
     }
    })
 } 

 
 
//  const v=list.forEach(item=>{
//   console.log(item[1])
//  })
//  console.log(v);

  
 fetchPokemons();