//  Mobile responsive
if ( $(window).width() < 800) {
  $(".slider-container").show();
  $(".leftside").hide();
  
} else {
  $(".slider-container").hide();
  $(".leftside").show();
}

$(window).resize(function () {
  if ($(window).width() < 800) {
    $(".slider-container").show();
    $(".leftside").hide();         
  } else {
    $(".slider-container").hide();
    $(".leftside").show();
  }
});

// Drag and Drop funcion
const sorting = function() {
  
  const columns = document.querySelectorAll(".column");
  const base_body = document.querySelector('div.base_body') ;
  
  columns.forEach((column) => {
    new Sortable(column, {
      ghostClass: "ghost",      
      group: {
        // name: "shared",         
        put: function( to, from ) {
          const to_className = to.el.className ;
          
          
          if ( to_className.indexOf('inner-slider') > -1 || 
               to_className.indexOf('leftside') > -1 ) 
          {
            return true ;
          }          
          return ( !(to.el.children.length == 2 ) )           
        }
      },
      sort: false,      
      animation: 100,
      handle: '.leftCorner-handle',
      
      onEnd: function(e) {
        const target = e.to ;

        console.log( target.className.indexOf('inner-slider') ) ;
        
        if (  $(window).width() < 800 && 
              target.className.indexOf('inner-slider') > -1 ) 
        {
          let numCards = $('div.inner-slider')[0].children.length ;
          if ( numCards > 1) {
            $('div.inner-slider').width( 'auto' ) ;    
          }                              
        }
      }
      
    });
  });
  
}

sorting();

//  mouse event for drag and drop
let sliderContainer = document.querySelector('.slider-container');
let innerSlider = document.querySelector('.inner-slider');

let pressed = false;
let startX;
let x;
let offsetX ;


$('div.slider-container')
  .mouseenter( function() {
    sliderContainer.style.cursor = "grab";
    // $('div.inner-slider').removeClass('column') ;
    // sorting() ;
    
    if( $('div.inner-slider').children().length > 1 ) {
      $('div.inner-slider').width( 'auto' ) ;
    } else {
      $('div.inner-slider').width( '200px' ) ;
    }
  })
  .mouseleave( function() {    
    pressed = false ;
    sliderContainer.style.cursor = "grab";
    // $('div.inner-slider').addClass('column') ;
    // sorting() ;
  }) ;


sliderContainer.addEventListener("mousedown", (e) => {
  pressed = true;
  offsetX = e.clientX - ($('body').width() - $('div.slider-container').width()) / 2 ;
  startX = offsetX - innerSlider.offsetLeft;
  sliderContainer.style.cursor = "grabbing";
});

sliderContainer.addEventListener("mouseup", () => {
  sliderContainer.style.cursor = "grab";
  pressed = false;      
});

sliderContainer.addEventListener("mousemove", (e) => {
  if (!pressed) return;
  
  e.preventDefault();
  offsetX = e.clientX - ($('body').width() - $('div.slider-container').width()) / 2 ;
  innerSlider.style.left = `${ offsetX - startX}px`;
  checkBoundary();  
});


const checkBoundary = () => {
  let outer = sliderContainer.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();

  // let beforeGap = parseInt( getComputedStyle( innerSlider ).gap );

    
  if (parseInt(innerSlider.style.left) > 0 || 
      parseInt( $('div.inner-slider').width() ) < parseInt( $('div.slider-container').width() )  ) 
  {          
    innerSlider.style.left = "0px";
  }

  // setGap( innerSlider, beforeGap ) ;      
  
  if (inner.right < outer.right) {
      innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
};


// const setGap = ( innerSlider, beforeGap ) => {
  
//   if ( parseInt( $('div.inner-slider').width() ) < parseInt( $('div.slider-container').width() ) ) {
//     let numCard = $('div.card').length 
//     let buffer_newGap = ( parseInt( $('div.slider-container').width() ) - parseInt( $('div.inner-slider').width() ) ) / (numCard - 1);
    
//     innerSlider.style.gap = `${ buffer_newGap + beforeGap }px`;    
//   }
// }


setInterval(() => {
  checkBoundary();
  // console.log( $('div.card-position .card') ,'card') ;
  
}, 10);





// Mobile actions 
sliderContainer.addEventListener("touchstart", (e) => {
  pressed = true;
  offsetX = e.touches[0].clientX - ( $('body').width() - $('div.slider-container').width() ) / 2 ;
  startX = offsetX - innerSlider.offsetLeft;
  $('div.inner-slider').addClass('column') ;
  sorting() ;
  
  let numCards = $('div.inner-slider')[0].children.length ;
  if ( numCards > 1) {
    $('div.inner-slider').width( 'auto' ) ;    
  } else {
    $('div.inner-slider').width( '200px' ) ;
  }
  
});

sliderContainer.addEventListener("touchend", () => {
  sliderContainer.style.cursor = "grab";
  pressed = false;    

});

sliderContainer.addEventListener("touchmove", (e) => {
  if (!pressed) return;
  
  e.preventDefault();
  offsetX = e.touches[0].clientX - ($('body').width() - $('div.slider-container').width()) / 2 ;
  innerSlider.style.left = `${ offsetX - startX}px`;
  checkBoundary();  
});

