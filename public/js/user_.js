document.getElementById("copy_shortenURL").addEventListener("click", () => {
  document.getElementById("longUrl").select();
  document.execCommand("copy");
});
