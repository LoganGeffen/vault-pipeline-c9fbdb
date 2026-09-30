const releaseVideo = document.getElementById("module-release-video");
fetch("module-release-chapters.json").then(response => response.json()).then(chapters => {
  const list = document.getElementById("module-video-chapters");
  for (const chapter of chapters) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    const minutes = Math.floor(chapter.start / 60);
    const seconds = Math.floor(chapter.start % 60).toString().padStart(2, "0");
    button.textContent = `${minutes}:${seconds} · ${chapter.title}`;
    button.addEventListener("click", () => {
      releaseVideo.currentTime = chapter.start;
      releaseVideo.play().catch(() => {});
    });
    item.append(button);
    list.append(item);
  }
});
