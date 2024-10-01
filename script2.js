// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {

    // GSAP ScrollTrigger to animate containers when scrolling
    gsap.registerPlugin(ScrollTrigger);
  
    // Select all container elements
    const containers = document.querySelectorAll('.container');
  
    // Loop through each container and create a scroll-triggered animation
    containers.forEach((container, index) => {
      gsap.fromTo(container, {
        opacity: 0,
        y: 50 // Start position for the animation (50px down)
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container, // The element that triggers the animation
          start: "top 80%", // Trigger when the top of the element is 80% from the top of the viewport
          toggleActions: "play none none none", // Play the animation when it enters the viewport
        }
      });
    });
  
  });
  