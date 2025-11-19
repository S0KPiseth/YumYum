const playLoading = () => {
  const loadingImage = document.getElementById("loadingImage");
  let i = 1;
  const intervalID = setInterval(() => {
    if (i > 4) {
      i = 1;
    }
    loadingImage.setAttribute("src", `assets/images/loading/falafel${i}.webp`);
    i++;
  }, 500);
  return intervalID;
};
// playLoading();
