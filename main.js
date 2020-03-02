const el = document.querySelector('.item');
let isResizing = false;

el.addEventListener('mousedown', (e) => {
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    console.log(e)

    function mousemove(e) {
        if (!isResizing) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = el.getBoundingClientRect();
            console.log(rect)

            el.style.left = rect.left - newX + "px"
            el.style.top = rect.top - newY + "px"

            prevX = e.clientX;
            prevY = e.clientY;
        }
    }

    function mouseup(e) {
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseup)
    }
})

const resizers = document.querySelectorAll('.resizer');
let currentResizer;

for (const resizer of resizers) {
    resizer.addEventListener('mousedown', mousedown);

    function mousedown(e) {
        currentResizer = e.target;
        isResizing = true;

        let prevX = e.clientX;
        let prevY = e.clientY;

        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);

        function mousemove(e) {
            const rect = el.getBoundingClientRect();

            if (currentResizer.classList.contains('se')) {
                el.style.width = rect.width - (prevX - e.clientX) + "px";
                el.style.height = rect.height - (prevY - e.clientY) + "px";
            } else if (currentResizer.classList.contains('sw')) {
                el.style.width = rect.width + (prevX - e.clientX) + "px";
                el.style.height = rect.height - (prevY - e.clientY) + "px";
                el.style.left = rect.left - (prevX - e.clientX) + "px";
            }
            else if (currentResizer.classList.contains('ne')) {
                el.style.width = rect.width - (prevX - e.clientX) + "px";
                el.style.height = rect.height + (prevY - e.clientY) + "px";
                el.style.top = rect.top - (prevY - e.clientY) + "px";
            } else {
                el.style.width = rect.width + (prevX - e.clientX) + "px";
                el.style.height = rect.height + (prevY - e.clientY) + "px";
                el.style.top = rect.top - (prevY - e.clientY) + "px";
                el.style.left = rect.left - (prevX - e.clientX) + "px";
            }

            prevX = e.clientX;
            prevY = e.clientY;
            console.log(prevX)
        }

        function mouseup(e) {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);
            isResizing = false; 
        }
    }
}