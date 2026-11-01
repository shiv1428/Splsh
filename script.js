/* ==========================================================
   SPLSH IMAGES  (edit this file to add your pictures)

   1. Put your picture files in the "images" folder next to index.html.
   2. Paste the file path between the quotes below.
      Example:  "Espresso": "images/espresso.jpg",
   3. Leave the quotes empty ("") to show the plain tile instead.

   You can use jpg, png, webp or svg. Use any file names you like.
   Square pictures work best for the drinks (they are shown at 72px,
   change the size in style.css under ".thumb").
   ========================================================== */

/* Logo shown at the top left of the site.
   Leave logo empty ("") to keep the text "Splsh". */
var SITE_IMAGES = {
  logo: "",          /* example: "images/logo.png" */
  logoHeight: 36     /* logo height in pixels */
};

/* One picture for each drink. The name on the left must match the
   drink name in script.js exactly. */
var IMAGES = {

  /* Coffee */
  "Espresso": "images/Espraso.jpeg",
  "Americano": "images/Americano.jpeg",
  "Cappuccino": "images/Cappechino.jpeg",
  "Flat white": "images/flatwhite.jpeg",
  "Filter coffee": "images/Filtercofee.jpeg",
  "Cold brew": "images/coldbrew.jpeg",
  "Iced latte": "images/icelatte.jpeg",

  /* Shakes */
  "Chocolate shake": "images/Choclateshake.jpeg",
  "Banana shake": "images/Bananashake.jpeg",
  "Mango shake": "images/MAngoshake.jpeg",
  "Cold coffee shake": "images/Coldcoffee.jpeg",

  /* Protein shakes */
  "Whey chocolate": "images/Wheychoclateshake.jpeg",
  "Plant protein berry": "images/Plant.jpeg",

  /* Energy drinks */
  "Energy drink can": "images/Ener.jpeg",
  "Electrolyte drink": "images/Electrolyte.jpeg",
  "Sugar free energy drink": "images/Sugarfree.jpeg",

  /* Soft drinks */
  "Cola": "images/Cola.jpeg",
  "Lemon soda": "images/LEmon.jpeg",
  "Ginger ale": "images/Ginger.jpeg",
  "Tonic water": "images/Tonic.jpeg",

  /* Juices */
  "Orange juice": "images/Orange.jpeg",
  "Watermelon juice": "images/Watermelon.jpeg",
  "Sugarcane juice": "images/Sugarcane.jpeg"
};

var DATA=[
["Coffee","Hot, iced and brewed fresh by cafes near you.",[["Espresso","A short, strong shot"],["Americano","Espresso with hot water"],["Cappuccino","Espresso, steamed milk and foam"],["Flat white","Espresso with smooth milk"],["Filter coffee","South Indian style, with milk"],["Cold brew","Steeped slowly, served over ice"],["Iced latte","Espresso and cold milk over ice"]]],
["Shakes","Thick and cold, made with milk and ice cream.",[["Chocolate shake","Milk, chocolate and ice cream"],["Banana shake","Ripe banana blended with milk"],["Mango shake","Seasonal mango and milk"],["Cold coffee shake","Coffee blended with ice cream"]]],
["Protein shakes","For after the gym or a quick meal.",[["Whey chocolate","Whey protein with milk"],["Plant protein berry","Dairy free, with mixed berries"]]],
["Energy drinks","Canned and bottled, served cold.",[["Energy drink can","Standard can, chilled"],["Electrolyte drink","Salts and water for hot days"],["Sugar free energy drink","No added sugar"]]],
["Soft drinks","Bottles and cans from supermarkets and stalls.",[["Cola","Chilled bottle"],["Lemon soda","Fresh lime with soda"],["Ginger ale","Dry and lightly spiced"],["Tonic water","Non alcoholic mixer, on its own"]]],
["Juices","Pressed or blended to order.",[["Orange juice","Fresh pressed"],["Watermelon juice","Cold and unsweetened"],["Sugarcane juice","Pressed with ginger and lime"]]]
];
var picked={},cart=document.getElementById("cart"),box=document.getElementById("groups"),q=document.getElementById("q"),none=document.getElementById("none");
function esc(s){return s.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var LIMIT=4,expanded={};
function render(){
 var t=q.value.trim().toLowerCase(),out="",shown=0;
 DATA.forEach(function(g){
  var rows=g[2].filter(function(i){return !t||(i[0]+" "+i[1]+" "+g[0]).toLowerCase().indexOf(t)>-1});
  if(!rows.length)return;shown++;
  var hasMore=!t&&rows.length>LIMIT;
  out+='<div class="group'+(expanded[g[0]]?' open':'')+'"><h3>'+esc(g[0])+'</h3><p class="sub">'+esc(g[1])+'</p><div class="items">'+rows.map(function(i,idx){
   var on=picked[i[0]];
   var src=IMAGES[i[0]];
   var pic=src?'<img src="'+esc(src)+'" alt="'+esc(i[0])+'" loading="lazy" onerror="this.remove()">':'';
   return '<div class="item'+(hasMore&&idx>=LIMIT?' extra':'')+'"><div class="thumb">'+pic+'</div><div><b>'+esc(i[0])+'</b><span>'+esc(i[1])+'</span></div><button type="button" class="btn add" data-n="'+esc(i[0])+'" aria-pressed="'+(!!on)+'">'+(on?"Added":"Add")+'</button></div>'}).join("")+'</div>'
   +(hasMore?'<button type="button" class="btn more" data-g="'+esc(g[0])+'" aria-expanded="'+(!!expanded[g[0]])+'">'+(expanded[g[0]]?"See less":"See more ("+(rows.length-LIMIT)+")")+'</button>':'')
   +'</div>';
 });
 box.innerHTML=out;none.style.display=shown?"none":"block";
}
box.addEventListener("click",function(e){
 var m=e.target.closest(".more");
 if(m){var k=m.getAttribute("data-g");expanded[k]=!expanded[k];render();return}
 var b=e.target.closest(".add");if(!b)return;
 var n=b.getAttribute("data-n");
 if(picked[n]){delete picked[n]}else{picked[n]=1}
 var on=!!picked[n];b.setAttribute("aria-pressed",on);b.textContent=on?"Added":"Add";
 cart.textContent="Cart ("+Object.keys(picked).length+")";
});
q.addEventListener("input",render);
document.getElementById("yr").textContent=new Date().getFullYear();
(function(){
 var l=SITE_IMAGES.logo,a=document.querySelector(".logo");
 if(!l||!a)return;
 var img=new Image();
 img.alt="Splsh";img.height=SITE_IMAGES.logoHeight||36;
 img.onload=function(){a.textContent="";a.appendChild(img)};
 img.src=l;
})();
render();
