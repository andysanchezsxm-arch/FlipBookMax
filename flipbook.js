<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Flipbook Max</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0e0e0e;
  color: #fff;
  text-align: center;
}

header {
  padding: 40px 20px;
  background: #111;
}

h1 {
  font-size: 3rem;
}

button {
  background: #ffcc00;
  color: #000;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
}

input {
  margin: 20px auto;
  display: block;
}

#creator {
  padding: 40px 20px;
}

#flipbook {
  width: 260px;
  height: 360px;
  margin: 40px auto;
  perspective: 1200px;
  position: relative;
}

.page {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  color: #000;
  border-radius: 6px;
  backface-visibility: hidden;
  transform-origin: left;
  transition: transform 0.8s;
}

.page img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page.flipped {
  transform: rotateY(-180deg);
}

footer {
  padding: 20px;
  font-size: 0.8rem;
  color: #777;
}
</style>
</head>

<body>

<header>
  <h1>Flipbook Max</h1>
  <p>Turn any idea into an old-fashioned animated flipbook.</p>
  <button onclick="scrollToCreator()">Create Flipbook</button>
</header>

<section id="creator">
  <h2>Upload Images</h2>
  <input type="file" id="imageInput" accept="image/*" multiple>
  <button onclick="createFlipbook()">Generate Flipbook</button>
</section>

<div id="flipbook"></div>

<footer>
  © 2026 Flipbook Max
</footer>

<script>
let pages = [];

function scrollToCreator() {
  document.getElementById("creator").scrollIntoView({ behavior: "smooth" });
}

function createFlipbook() {
  const input = document.getElementById("imageInput");
  const flipbook = document.getElementById("flipbook");
  flipbook.innerHTML = "";
  pages = [];

  if (!input.files.length) {
    alert("Upload images first");
    return;
  }

  Array.from(input.files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = e => {
      const page = document.createElement("div");
      page.className = "page";
      page.style.zIndex = input.files.length - index;

      const img = document.createElement("img");
      img.src = e.target.result;

      page.appendChild(img);
      flipbook.appendChild(page);
      pages.push(page);

      page.addEventListener("click", () => {
        page.classList.toggle("flipped");
      });
    };
    reader.readAsDataURL(file);
  });
}
</script>

</body>
</html>
