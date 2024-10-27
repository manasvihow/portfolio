
function locoGSAP(){
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    
    
    gsap.registerPlugin(ScrollTrigger);
    
    
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? 
                locoScroll.scrollTo(value, 0, 0) : 
                locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector("#main").style.transform ? 
            "transform" : "fixed"
    });
    
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
}
locoGSAP();

function revealToSpan(){
    document.querySelectorAll(".reveal").forEach(function(elem){
        let parent = document.createElement("span");
        let child = document.createElement("span");
        
        parent.classList.add("parent");
        child.classList.add("child");
        
        child.innerHTML = elem.innerHTML;
        parent.appendChild(child);
        
        elem.innerHTML = "";
        elem.appendChild(parent);
    });
}
revealToSpan();

const cursor = document.querySelector("#cursor");
function cursorAnimation(){
    window.addEventListener("mousemove", function(e) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: 'sine.out'
        });
    });
const overlay = document.querySelector(".overlay");
const heading = document.querySelector("#home-heading");

heading.addEventListener("mouseenter", function() {
    gsap.to(cursor, {
        opacity: 0,
        duration: 0.3,
        ease: 'sine.out'
    });
    gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'sine.out'
    });
});

heading.addEventListener("mousemove", (e) => {
    const rect = heading.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    gsap.to(overlay, {
        opacity: 1,
        '--x': `${x}%`,
        '--y': `${y}%`,
        duration: 0.3,
        ease: 'sine.out'
    });
});

heading.addEventListener("mouseleave", function(){
    gsap.to(cursor, {
        opacity: 1,
        duration: 0.3,
        ease: 'sine.out'
    });
    gsap.to(overlay, {
        
        opacity: 0,
        duration: 0.3,
        ease: 'sine.out'
    });
});
}
cursorAnimation();




function loaderAnimation(){
    const tl = gsap.timeline();

tl.from(".child span", {
    x: 100,
    duration: 1.4,
    stagger: 0.2,
    ease: Power3.easeInOut
})
.to(".parent .child", {
    y: "-100%",
    duration: 1,
    ease: Circ.easeInOut
})
.to("#loader", {
    height: 0,
    duration: 1,
    ease: Circ.easeInOut
})
.to("#green", {
    height: "100%",
    top: 0,
    duration: 1,
    delay: -1.5,
    ease: Circ.easeInOut
})
.to("#green", {
    height: 0,
    top: 0,
    duration: 1,
    delay: -0.9,
    ease: Circ.easeInOut
})
.to("#home", {  
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
})
.to("#nav", {  
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
})
.to(cursor, {  
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
})
}
loaderAnimation();



function aboutAnimation(){
    gsap.from("#about", {
        x: -40,
        duration: 1,
        opacity: 0,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 40%",
            toggleActions: "play none none reverse"
        }
    })
    gsap.from("#about-content", {
        y: 100,
        duration: 1,
        opacity: 0,
        stagger: true,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 40%",
            toggleActions: "play none none reverse",
        }
    })
}
aboutAnimation();


function cardAnimation(){
    var cards= document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("mouseenter", function(){
    
        gsap.to(cursor, {
            scale: 5,
            duration: 0.3,
            ease: 'sine.out'
        })
        cursor.innerHTML = `<div><p>visit</p></div>`
        cursor.style.fontSize = "1vw";
        cursor.style.display = "flex";
        cursor.style.justifyContent = "center";
        cursor.style.alignItems = "center";
    })
    card.addEventListener("mouseleave", function(){
        cursor.innerHTML = "";
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: 'sine.out'
        })
    });
    
})
}
cardAnimation();


function initInfiniteScroll() {
    const scroller = document.querySelector('#scroller');
    if (!scroller) return;


    const scrollerContent = scroller.innerHTML;
    scroller.innerHTML = scrollerContent + scrollerContent;

    let scrollTween = gsap.timeline({
        repeat: -1,
        defaults: {
            ease: "none",
            duration: 20
        }
    });

    scrollTween.to(scroller, {
        x: "-50%"
    });

    let isScrolling = false;
    let scrollTimeout;
    let currentSpeed = 1;
    const maxSpeed = 3;
    const scrollSensitivity = 0.005;

    window.addEventListener('wheel', (e) => {
        clearTimeout(scrollTimeout);
        isScrolling = true;

        let direction = e.deltaY > 0 ? 1 : -1;
        
        currentSpeed = gsap.utils.clamp(-maxSpeed, maxSpeed, currentSpeed + (direction * scrollSensitivity));
        scrollTween.timeScale(currentSpeed);

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            gsap.to(scrollTween, {
                timeScale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            currentSpeed = 1;
        }, 150);
    });

    window.addEventListener('resize', () => {
        const currentX = gsap.getProperty(scroller, "x");
        scrollTween.kill();
        
        scrollTween = gsap.timeline({
            repeat: -1,
            defaults: {
                ease: "none",
                duration: 20
            }
        }).to(scroller, {
            x: "-50%"
        });
    });

    return scrollTween;
}

window.addEventListener('load', initInfiniteScroll);


ScrollTrigger.refresh();