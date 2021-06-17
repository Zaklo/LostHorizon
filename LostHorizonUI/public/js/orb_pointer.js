var windowWidth= $(window).width();
if  (windowWidth > 768) {
    const pointer = document.createElement("div")
    pointer.id = "pointer-dot"
    const ring = document.createElement("div")
    ring.id = "pointer-ring"
    document.body.insertBefore(pointer, document.body.children[0])
    document.body.insertBefore(ring, document.body.children[0])

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let isHover = false
    let mouseDown = false
    const init_pointer = (options) => {

        window.onmousemove = (mouse) => {
            mouseX = mouse.clientX
            mouseY = mouse.clientY
        }

        window.onmousedown = (mouse) => {
            mouseDown = true
        }

        window.onmouseup = (mouse) => {
            mouseDown = false
        }

        const trace = (a, b, n) => {
            return (1 - n) * a + n * b;
        }
        window["trace"] = trace

        const getOption = (option) => {
            let defaultObj = {
                pointerColor: "white",
                ringSize: 8,
                ringClickSize: (options["ringSize"] || 8) - 1,
            }
            if (options[option] == undefined) {
                return defaultObj[option]
            } else {
                return options[option]
            }
        }

        const render = () => {
            ringX = trace(ringX, mouseX, 0.2)
            ringY = trace(ringY, mouseY, 0.2)

            if (document.querySelector(".p-action-click:hover")) {
                pointer.style.borderColor = getOption("pointerColor")
                isHover = true
            } else {
                pointer.style.borderColor = "lightgrey"
                isHover = false
            }
            ring.style.borderColor = getOption("pointerColor")
            if (mouseDown) {
                ring.style.transition = "all 0.2"
                ring.style.padding = getOption("ringClickSize") + "px"
            } else {
                ring.style.padding = getOption("ringSize") + "px"
            }

            pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`
            ring.style.transform = `translate(${ringX - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px, ${ringY - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px)`

            requestAnimationFrame(render)
        }
        requestAnimationFrame(render)
    }

    init_pointer({});
    document.addEventListener("mouseenter", () => {

            init_pointer({});

    });

    let maps = document.getElementById('maps');

    if(maps) {
        maps.addEventListener('mouseenter', () => {
            pointer.style.display = 'none';
            ring.style.display = 'none';
        })

        maps.addEventListener('mouseleave', () => {
            pointer.style.display = 'block';
            ring.style.display = 'block';
        })
    }
}

function update(e){
    var x = e.clientX || e.touches[0].clientX
    var y = e.clientY || e.touches[0].clientY
  
    document.documentElement.style.setProperty('--cursorX', x + 'px')
    document.documentElement.style.setProperty('--cursorY', y + 'px')
  }
  
  document.addEventListener('mousemove',update)
  document.addEventListener('touchmove',update)