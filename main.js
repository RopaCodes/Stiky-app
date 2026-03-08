const toggle_btn = document.getElementById('toggle_btn')
const toggle_bar = document.getElementById('toggle_bar')

// Add a click event listener to the icon
toggle_btn.addEventListener('click', () => {
    // Toggle the 'show' class on the div
    toggle_bar.classList.toggle('hidden');
});
